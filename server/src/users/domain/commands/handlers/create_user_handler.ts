import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as uuid from 'uuid';

import { CreateUserCommand } from '../impl/create_user_command';
import { UserProps } from '../../models/user_model';
import { UserRepository } from '../../repositories/user_repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly repository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<UserProps> {
    const { mail, password } = command;

    const created = await this.repository.create({ mail, password });

    return created;
  }
}
