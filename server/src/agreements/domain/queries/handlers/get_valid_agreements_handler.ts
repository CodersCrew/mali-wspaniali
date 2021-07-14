import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AgreementRepository } from '../../repositories/agreement_repository';
import { GetValidAgreementsQuery } from '../impl/get_valid_agreements_query';
import { Agreement } from '../../models/agreement';

@QueryHandler(GetValidAgreementsQuery)
export class GetValidAgreementsHandler
  implements IQueryHandler<GetValidAgreementsQuery> {
  constructor(private repository: AgreementRepository) {}

  async execute({ signed }: { signed: string[] }): Promise<Agreement[]> {
    const agreements = await this.repository.getAll();

    const validAgreements = agreements
      .filter(agreement => !agreement.isOutdated())
      .map(agreement => {
        const isSigned = signed.includes(agreement.id);

        if (isSigned) {
          agreement.setIsSigned(isSigned);
        }

        return agreement;
      });

    return validAgreements;
  }
}
