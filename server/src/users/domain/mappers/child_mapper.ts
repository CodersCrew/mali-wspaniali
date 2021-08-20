import { classToPlain } from 'class-transformer';
import { transformAndValidateSync } from 'class-transformer-validator';

import { Child } from '../models';
import { ChildCore } from '../models/child_model';
import { getCoreValidationConfig } from '../../../shared/utils/core_validation';

export class ChildMapper {
  static toDomain(
    props: Partial<ChildCore>,
    options: { isNew: boolean } = { isNew: false },
  ): Child {
    const createChild = options.isNew ? Child.create : Child.recreate;

    return createChild(
      transformAndValidateSync(ChildCore, props, getCoreValidationConfig()),
    );
  }

  static toDomainMany(children: Partial<ChildCore>[]) {
    return children.map(child => ChildMapper.toDomain(child));
  }

  static toPlain(child: Child): ChildCore {
    const props = child.getProps();

    return classToPlain(props, { excludeExtraneousValues: true }) as ChildCore;
  }

  static toPlainMany(children: Child[]): ChildCore[] {
    return children.map(ChildMapper.toPlain);
  }
}
