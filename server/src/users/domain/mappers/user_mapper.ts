import { classToPlain } from 'class-transformer';
import { transformAndValidateSync } from 'class-transformer-validator';
import { User, UserCore } from '../models/user_model';

export class UserMapper {
  static toDomain(
    props: Partial<UserCore>,
    options: { keyCode?: string } = {},
  ): User {
    const createUser = options.keyCode ? User.create : User.recreate;

    return createUser(
      transformAndValidateSync(UserCore, props, {
        transformer: { excludeExtraneousValues: true },
        validator: { validationError: { target: false, value: false } },
      }),
      options.keyCode,
    );
  }

  static toPlain(child: User): UserCore {
    const props = child.getProps();

    return classToPlain(props, { excludeExtraneousValues: true }) as UserCore;
  }
}
