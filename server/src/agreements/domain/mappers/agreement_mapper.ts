import { transformAndValidateSync } from 'class-transformer-validator';

import { Agreement, AgreementCore } from '../models/agreement';

export class AgreementMapper {
  static toDomain(value: Partial<AgreementCore>): Agreement {
    const agreement = Agreement.create(
      transformAndValidateSync(AgreementCore, value, {
        transformer: { excludeExtraneousValues: true },
        validator: { validationError: { target: false, value: false } },
      }),
    );

    return agreement;
  }

  static toRaw(agreement: Agreement): AgreementCore {
    return agreement.getProps();
  }
}
