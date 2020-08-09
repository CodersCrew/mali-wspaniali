import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllChildrenQuery } from '../impl/get_all_children_query';
import { ChildRepository } from '../../repositories/child_repository';
import { ChildProps } from '../../models/child_model';
import { KindergartenRepository } from '../../../../kindergartens/domain/repositories/kindergarten_repository';
import { ChildResultRepository } from '../../repositories/child_result_repository';

@QueryHandler(GetAllChildrenQuery)
export class GetAllChildrenHandler
  implements IQueryHandler<GetAllChildrenQuery> {
  constructor(
    private readonly childRepository: ChildRepository,
    private readonly kindergartenRepository: KindergartenRepository,
    private readonly childrResultRepository: ChildResultRepository,
  ) {}

  async execute(): Promise<ChildProps[]> {
    const children = await this.childRepository.getAll();

    const kindergartensIds = children.map(child =>
      child.kindergarten.toString(),
    );

    const childrenIds = children.map(child => child._id.toString());

    const kindergartenList = await this.kindergartenRepository.getMany(
      kindergartensIds,
    );

    const results = await this.childrResultRepository.getMany(childrenIds);

    const childrenWithKindergartens = children.map(child => {
      const foundKindergarten = kindergartenList.find(
        kindergarten =>
          kindergarten._id.toString() === child.kindergarten.toString(),
      );

      const foundChildrenResults = results.filter(
        result => result.childId.toString() === child._id.toString(),
      );

      return {
        ...child,
        kindergarten: foundKindergarten,
        results: foundChildrenResults,
      };
    });

    return childrenWithKindergartens;
  }
}
