import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseInterceptors } from '@nestjs/common';

import { GetUserQuery } from './domain/queries/impl/get_user_query';
import { SentryInterceptor } from '../shared/sentry_interceptor';
import { UserProps } from './domain/models/user_model';
import { UserDTO } from './dto/user_dto';
import { UserRepository } from './domain/repositories/user_repository';
import { UserInput } from './inputs/user_input';
import { CreateUserCommand } from './domain/commands/impl/create_user_command';
import { ReturnedStatusDTO } from '../shared/returned_status';

@UseInterceptors(SentryInterceptor)
@Resolver()
export class UserResolver {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    public readonly userRepository: UserRepository,
  ) {}

  @Query(() => UserDTO)
  async user(@Args('id') id: string): Promise<UserProps> {
    const user: UserProps = await this.queryBus.execute(new GetUserQuery(id));

    return user;
  }

  @Mutation(() => ReturnedStatusDTO)
  async createUser(
    @Args('user') user: UserInput,
  ): Promise<{ status: boolean }> {
    const created: UserProps = await this.commandBus.execute(
      new CreateUserCommand(user.mail, user.password),
    );

    return { status: !!created };
  }
}
