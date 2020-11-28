import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as mongoose from 'mongoose';

import { GetChildrenQuery } from '../impl/get_children_query';
import { ChildRepository } from '../../repositories/child_repository';
import { Child, ChildProps } from '../../models/child_model';
import { ChildResultRepository } from '../../repositories/child_result_repository';
import { KindergartenRepository } from '../../../../kindergartens/domain/repositories/kindergarten_repository';
import { ChildMapper } from '../../mappers/child_mapper';
import { ChildWithKindergartenProps } from '../../../../users/domain/models/child_model';
import { KindergartenMapper } from '../../../../kindergartens/domain/mappers/kindergarten_mapper';

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
    ids: mongoose.Schema.Types.ObjectId[];
  }): Promise<ChildWithKindergartenProps[]> {
    const children = await this.childRepository.get(ids);

    return await Promise.all(children.map(this.mapChildWithKindergarten));
  }

  async mapChildWithKindergarten(child: Child) {
    const results = await this.childrResultRepository.get(child.id.value);
    const kindergarten = await this.kindergartenRepository.get(
      child.kindergarten.toString(),
    );

    return {
      ...ChildMapper.toPersistence(child),
      results,
      kindergarten: KindergartenMapper.toRaw(kindergarten),
    };
  }
}
