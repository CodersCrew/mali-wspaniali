import {
  CommandHandler,
  EventPublisher,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';

import { ConfirmUserCommand } from '../impl';
import { JwtService } from '@nestjs/jwt';
import { UserChangePasswordRepository } from '../../repositories/user_change_password_jwt_repository';
import { User } from '@users/domain/models';
import { GetUserQuery } from '../../queries/impl';

@CommandHandler(ConfirmUserCommand)
export class ConfirmUserHandler implements ICommandHandler<ConfirmUserCommand> {
  constructor(
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
