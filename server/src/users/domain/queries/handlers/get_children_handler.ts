import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as mongoose from 'mongoose';

import { GetChildrenQuery } from '../impl/get_children_query';
import { ChildRepository } from '../../repositories/child_repository';
import { ChildProps } from '../../models/child_model';

@QueryHandler(GetChildrenQuery)
export class GetChildrenHandler implements IQueryHandler<GetChildrenQuery> {
  constructor(private readonly childRepository: ChildRepository) {}

  async execute({
    ids,
  }: {
    ids: mongoose.Schema.Types.ObjectId[];
  }): Promise<ChildProps[]> {
    return await this.childRepository.get(ids);
  }
}
