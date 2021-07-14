import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AgreementRepository } from '../../repositories/agreement_repository';
import { GetAllAgreementsQuery } from '../impl/get_all_agreements_query';
import { Agreement } from '../../models/agreement';

@QueryHandler(GetAllAgreementsQuery)
export class GetAllAgreementsHandler
  implements IQueryHandler<GetAllAgreementsQuery> {
  constructor(private repository: AgreementRepository) {}

  async execute(): Promise<Agreement[]> {
    return this.repository.getAll();
  }
}
