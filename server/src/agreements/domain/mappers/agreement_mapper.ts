import { transformAndValidateSync } from 'class-transformer-validator';

import { Agreement, AgreementCore } from '../models/agreement';
import { getCoreValidationConfig } from '../../../shared/utils/core_validation';

export class AgreementMapper {
  static toDomain(value: Partial<AgreementCore>): Agreement {
    const agreement = Agreement.create(
      transformAndValidateSync(AgreementCore, value, getCoreValidationConfig()),
    );

    return agreement;
  }

  static toRaw(agreement: Agreement): AgreementCore {
    return agreement.getProps();
  }
}
