import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AgreementRepository } from '../../repositories/agreement_repository';
import { GetAllAgreementsQuery } from '../impl/get_all_agreements_query';
import { AgreementProps } from '../../../../agreements/schemas/agreement_schema';

@QueryHandler(GetAllAgreementsQuery)
export class GetAllAgreementsHandler
  implements IQueryHandler<GetAllAgreementsQuery> {
  constructor(private readonly repository: AgreementRepository) {}

  async execute(): Promise<AgreementProps[]> {
    return this.repository.getAll();
  }
}
