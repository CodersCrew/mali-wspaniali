import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AgreementRepository } from '../../repositories/agreement_repository';
import { AgreementProps } from '../../../schemas/agreement_schema';
import { GetValidAgreementsQuery } from '../impl/get_valid_agreements_query';

@QueryHandler(GetValidAgreementsQuery)
export class GetValidAgreementsHandler
  implements IQueryHandler<GetValidAgreementsQuery> {
  constructor(private readonly repository: AgreementRepository) {}

  async execute({ signed }: { signed: string[] }): Promise<AgreementProps[]> {
    const agreements = await this.repository.getAll();

    const validAgreements = agreements
      .filter(agreement => !agreement.isOutdated)
      .map(agreement => {
        const isSigned = signed.includes(agreement._id.toString());

        return {
          ...agreement,
          isSigned,
        };
      });

    return validAgreements;
  }
}
