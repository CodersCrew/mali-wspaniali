import { classToPlain } from 'class-transformer';
import { transformAndValidateSync } from 'class-transformer-validator';

import { User, UserCore } from '../models/user_model';
import { getCoreValidationConfig } from '../../../shared/utils/core_validation';

export class UserMapper {
  static toDomain(
    props: Partial<UserCore>,
    options: { keyCode?: string } = {},
  ): User {
    const createUser = options.keyCode ? User.create : User.recreate;

    return createUser(
      transformAndValidateSync(UserCore, props, getCoreValidationConfig()),
      options.keyCode,
    );
  }

  static toPlain(child: User): UserCore {
    const props = child.getProps();

    return classToPlain(props, { excludeExtraneousValues: true }) as UserCore;
  }
}
