import {
  CommandHandler,
  ICommandHandler,
  EventPublisher,
  QueryBus,
} from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';

import { CreateUserCommand } from '../impl/create_user_command';
import { User } from '../../models/user_model';
import { UserRepository } from '../../repositories/user_repository';
import { KeyCodeRepository } from '../../../../key_codes/domain/repositories/key_codes_repository';
import { GetAllAgreementsQuery } from '../../../../agreements/domain/queries/impl/get_all_agreements_query';
import { Agreement } from '../../../../agreements/domain/models/agreement';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private userRepository: UserRepository,
    private keyCodeRepository: KeyCodeRepository,
    private publisher: EventPublisher,
    private queryBus: QueryBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { userInput } = command;

    if (
      userInput.agreements &&
      !(await this.validateAgreements(userInput.agreements))
    ) {
      throw new Error('Wrong agreements');
    }

    const existedKeyCode = await this.keyCodeRepository.getOne({
      keyCode: userInput.keyCode,
    });
    const existedMail = await this.userRepository.getByMail(userInput.mail);

    if (!!existedKeyCode && !existedMail) {
      const generatedSalt = await bcrypt.genSalt(10);
      const hashPasword = await bcrypt.hash(userInput.password, generatedSalt);

      const user = this.publisher.mergeObjectContext(
        await this.userRepository.create(
          {
            mail: userInput.mail,
            password: hashPasword,
            agreements: userInput.agreements,
          },
          existedKeyCode,
        ),
      );

      return user;
    }

    throw new Error('Wrong KeyCode or email already exists.');
  }

  private async validateAgreements(possibleAgreements: string[]) {
    const allAgreements: Agreement[] = await this.queryBus.execute(
      new GetAllAgreementsQuery(),
    );

    return possibleAgreements.every(possibleAgreement =>
      allAgreements.find(agreement => {
        return agreement.id === possibleAgreement;
      }),
    );
  }
}
