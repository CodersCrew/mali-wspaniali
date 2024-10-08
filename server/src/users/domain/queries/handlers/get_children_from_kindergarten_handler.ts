import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetChildrenFromKindergartenQuery } from '../impl';
import { ChildRepository } from '../../repositories/child_repository';
import { Child } from '../../models/child_model';

@QueryHandler(GetChildrenFromKindergartenQuery)
export class GetChildrenFromKindergartenHandler
  implements IQueryHandler<GetChildrenFromKindergartenQuery> {
  constructor(private childRepository: ChildRepository) {}

  execute({ id }: GetChildrenFromKindergartenQuery): Promise<Child[]> {
    return this.childRepository.getByKindergarten(id);
  }
}
