import { classToPlain } from 'class-transformer';
import { transformAndValidateSync } from 'class-transformer-validator';

import { Kindergarten, KindergartenCore } from '../models/kindergarten_model';
import { KindergartenInput } from '@kindergartens/inputs/kindergarten_input';

export class KindergartenMapper {
  static toDomainFrom(
    props: KindergartenInput | KindergartenCore,
    options: { isNew: boolean } = { isNew: false },
  ): Kindergarten {
    const createKindergarten = options.isNew
      ? Kindergarten.create
      : Kindergarten.recreate;

    const kindergarten = transformAndValidateSync(KindergartenCore, props, {
      transformer: { excludeExtraneousValues: true },
      validator: { validationError: { target: false, value: false } },
    });

    return createKindergarten(kindergarten);
  }

  static toPersistant(kindergarten: Kindergarten): KindergartenCore {
    return classToPlain(kindergarten.getProps(), {
      excludeExtraneousValues: true,
    }) as KindergartenCore;
  }

  static toRaw(kindergarten: Kindergarten): KindergartenCore {
    return this.toPersistant(kindergarten);
  }
}
