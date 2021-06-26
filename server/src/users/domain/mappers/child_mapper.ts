import { Child } from '../models';
import { transformAndValidateSync } from 'class-transformer-validator';
import { ChildCore } from '../models/child_model';
import { classToPlain } from 'class-transformer';

export class ChildMapper {
  static toDomain(
    props: Partial<ChildCore>,
    options: { isNew: boolean } = { isNew: false },
  ): Child {
    const createChild = options.isNew ? Child.create : Child.recreate;

    return createChild(
      transformAndValidateSync(ChildCore, props, {
        transformer: { excludeExtraneousValues: true },
        validator: { validationError: { target: false, value: false } },
      }),
    );
  }

  static toPlain(child: Child): ChildCore {
    const props = child.getProps();

    return classToPlain(props, { excludeExtraneousValues: true }) as ChildCore;
  }
}
