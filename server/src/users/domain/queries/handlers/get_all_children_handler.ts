import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as mongoose from 'mongoose';

import { GetAllChildrenQuery } from '../impl/get_all__children_query';
import { ChildRepository } from '../../repositories/child_repository';
import { ChildProps } from '../../models/child_model';

@QueryHandler(GetAllChildrenQuery)
export class GetAllChildrenHandler
  implements IQueryHandler<GetAllChildrenQuery> {
  constructor(private readonly childRepository: ChildRepository) {}

  async execute(): Promise<ChildProps[]> {
    return await this.childRepository.getAll();
  }
}
