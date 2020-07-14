import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as mongoose from 'mongoose';

import { GetChildrenQuery } from '../impl/get_children_query';
import { ChildRepository } from '../../repositories/child_repository';
import { ChildProps } from '../../models/child_model';
import { ChildResultRepository } from '../../repositories/child_result_repository';

@QueryHandler(GetChildrenQuery)
export class GetChildrenHandler implements IQueryHandler<GetChildrenQuery> {
  constructor(
    private readonly childRepository: ChildRepository,
    private readonly childrResultRepository: ChildResultRepository,
  ) {}

  async execute({
    ids,
  }: {
    ids: mongoose.Schema.Types.ObjectId[];
  }): Promise<ChildProps[]> {
    const children = await this.childRepository.get(ids);

    return await Promise.all(
      children.map(async child => {
        const results = await this.childrResultRepository.get(child._id);

        return { ...child, results };
      }),
    );
  }
}
