import {
  CommandHandler,
  EventPublisher,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';

import { ConfirmUserCommand } from '../impl';
import { UserRepository } from '../../repositories/user_repository';
import { JwtService } from '@nestjs/jwt';
import { UserChangePasswordRepository } from '../../repositories/user_change_password_jwt_repository';
import { GetUserQuery } from '@users/domain/queries/impl';
import { KeyCodeRepository } from '@keyCodes/domain/repositories/key_codes_repository';
import { User } from '@users/domain/models';

@CommandHandler(ConfirmUserCommand)
export class ConfirmUserHandler implements ICommandHandler<ConfirmUserCommand> {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private userChangePasswordRepository: UserChangePasswordRepository,
    private queryBus: QueryBus,
    private publisher: EventPublisher,
  ) {}

  async execute(command: ConfirmUserCommand): Promise<void> {
    const { jwt } = command;

    const parsed = this.jwtService.decode(jwt);

    if (!parsed) {
      throw new Error('confirmation-failed');
    }

    if (parsed && parsed.sub) {
      const jwtExists = await this.userChangePasswordRepository.get(
        parsed.sub,
        jwt,
      );

      try {
        if (jwtExists) {
          const user: User = await this.queryBus.execute(
            new GetUserQuery(parsed.sub),
          );

          console.log(user);
          const eventAwareUser = this.publisher.mergeObjectContext(user);

          eventAwareUser.confirm();

          eventAwareUser.commit();

          await this.userChangePasswordRepository.remove(parsed.sub, jwt);
        }
      } catch (error) {
        throw new Error(`Authorization failed. ${error.message}`);
      }
    }
  }
}
