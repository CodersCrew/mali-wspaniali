import { classToPlain } from 'class-transformer';
import { transformAndValidateSync } from 'class-transformer-validator';

import { Kindergarten, KindergartenCore } from '../models/kindergarten_model';
import { getCoreValidationConfig } from '../../../shared/utils/core_validation';
import { KindergartenInput } from '../../inputs/kindergarten_input';

export class KindergartenMapper {
  static toDomainFrom(
    props: KindergartenInput | KindergartenCore,
    options: { isNew: boolean } = { isNew: false },
  ): Kindergarten {
    const createKindergarten = options.isNew
      ? Kindergarten.create
      : Kindergarten.recreate;

    const kindergarten = transformAndValidateSync(
      KindergartenCore,
      props,
      getCoreValidationConfig(),
    );

    return createKindergarten(kindergarten);
  }

  static toPlain(kindergarten: Kindergarten): KindergartenCore {
    return classToPlain(kindergarten.getProps(), {
      excludeExtraneousValues: true,
    }) as KindergartenCore;
  }

  static toPlainMany(values: Kindergarten[]): KindergartenCore[] {
    return values.map(KindergartenMapper.toPlain);
  }
}
