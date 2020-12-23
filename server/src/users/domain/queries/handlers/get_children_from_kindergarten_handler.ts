import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetChildrenFromKindergartenQuery } from '../impl';
import { ChildRepository } from '../../repositories/child_repository';
import { ChildProps } from '../../models/child_model';

@QueryHandler(GetChildrenFromKindergartenQuery)
export class GetChildrenFromKindergartenHandler
  implements IQueryHandler<GetChildrenFromKindergartenQuery> {
  constructor(private readonly childRepository: ChildRepository) {}

  execute({ id }: GetChildrenFromKindergartenQuery): Promise<ChildProps[]> {
    return this.childRepository.getByKindergarten(id);
  }
}
