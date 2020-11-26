import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllChildrenQuery } from '../impl/get_all_children_query';
import { ChildRepository } from '../../repositories/child_repository';
import { ChildProps } from '../../models/child_model';
import { KindergartenRepository } from '../../../../kindergartens/domain/repositories/kindergarten_repository';
import { ChildResultRepository } from '../../repositories/child_result_repository';
import { ChildMapper } from '../../mappers/child_mapper';
import { KindergartenProps } from '../../../../kindergartens/domain/models/kindergarten_model';
import { ChildResultProps } from '../../models/child_result_model';

export interface ChildWithKindergarten {
  child: ChildProps;
  kindergarten: KindergartenProps;
  results: ChildResultProps[];
}

@QueryHandler(GetAllChildrenQuery)
export class GetAllChildrenHandler
  implements IQueryHandler<GetAllChildrenQuery> {
  constructor(
    private readonly childRepository: ChildRepository,
    private readonly kindergartenRepository: KindergartenRepository,
    private readonly childrResultRepository: ChildResultRepository,
  ) {}

  async execute(): Promise<ChildWithKindergarten[]> {
    const children = await this.childRepository.getAll();

    const kindergartensIds = children.map(child =>
      child.kindergarten.value.toString(),
    );

    const childrenIds = children.map(child => child.id.value.toString());

    const kindergartenList = await this.kindergartenRepository.getMany(
      kindergartensIds,
    );

    const results = await this.childrResultRepository.getMany(childrenIds);

    const childrenWithKindergartens = children.map(child => {
      const foundKindergarten = kindergartenList.find(
        kindergarten =>
          kindergarten._id.toString() === child.kindergarten.value.toString(),
      );

      const foundChildrenResults = results.filter(
        result => result.childId.toString() === child.id.value.toString(),
      );

      return {
        child: ChildMapper.toPersistence(child) as ChildProps,
        kindergarten: foundKindergarten,
        results: foundChildrenResults,
      };
    });

    return childrenWithKindergartens;
  }
}
