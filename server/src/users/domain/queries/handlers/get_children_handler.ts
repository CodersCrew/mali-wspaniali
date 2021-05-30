import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ChildRepository } from '../../repositories/child_repository';
import { ChildResultRepository } from '../../repositories/child_result_repository';
import { KindergartenMapper } from '../../../../kindergartens/domain/mappers/kindergarten_mapper';
import { Child, ChildWithKindergartenProps } from '../../models/child_model';
import { ChildProps } from '@users/domain/models/child_model';
import { GetChildrenQuery } from '../impl/get_children_query';
import { KindergartenRepository } from '../../../../kindergartens/domain/repositories/kindergarten_repository';
import { ChildMapper } from '../../mappers/child_mapper';

@QueryHandler(GetChildrenQuery)
export class GetChildrenHandler implements IQueryHandler<GetChildrenQuery> {
  constructor(
    private readonly childRepository: ChildRepository,
    private readonly childrResultRepository: ChildResultRepository,
    private readonly kindergartenRepository: KindergartenRepository,
  ) {
    this.mapChildWithKindergarten = this.mapChildWithKindergarten.bind(this);
  }

  async execute({
    ids,
  }: {
    ids: string[];
  }): Promise<ChildWithKindergartenProps[]> {
    const children = await this.childRepository.get(ids);

    const childWithKindergarten: ChildWithKindergartenProps[] = await Promise.all(
      children.map(this.mapChildWithKindergarten),
    );

    return childWithKindergarten.filter(this.removeDeletedChildren);
  }

  async mapChildWithKindergarten(child: Child) {
    const results = await this.childrResultRepository.get(child.id.value);
    const kindergarten = await this.kindergartenRepository.get(
      child.kindergarten.toString(),
    );

    return {
      ...(ChildMapper.toPersistence(child) as ChildProps),
      results,
      kindergarten: KindergartenMapper.toRaw(kindergarten),
    };
  }

  removeDeletedChildren(child: ChildWithKindergartenProps) {
    return !child.isDeleted;
  }
}
