import { Types } from 'mongoose';

import { AgreementProps, Agreement } from '../models/agreement';

type PersistedAgreement = Omit<AgreementProps, '_id'> & { _id: Types.ObjectId };

export class AgreementMapper {
  static toDomain(value: PersistedAgreement): Agreement {
    const _id = value._id.toString();

    return Agreement.create({ ...value, _id });
  }

  static toRaw(agreement: Agreement): AgreementProps {
    return agreement.toObject();
  }
}
