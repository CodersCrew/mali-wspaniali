import {
  Resolver,
  Mutation,
  Query,
  Args,
  Context,
  GqlExecutionContext,
} from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  UseInterceptors,
  ExecutionContext,
  UseGuards,
  Injectable,
} from '@nestjs/common';

import { GetUserQuery } from './domain/queries/impl/get_user_query';
import { SentryInterceptor } from '../shared/sentry_interceptor';
import { UserProps } from './domain/models/user_model';
import { UserDTO } from './dto/user_dto';
import { UserRepository } from './domain/repositories/user_repository';
import { UserInput } from './inputs/user_input';
import { CreateUserCommand } from './domain/commands/impl/create_user_command';
import { ReturnedStatusDTO } from '../shared/returned_status';
import { LoginInput } from './inputs/login_input';
import { LoginUserCommand } from './domain/commands/impl/login_user_command';
import { GqlAuthGuard } from './guards/jwt_guard';
import { CurrentUser } from './params/current_user_param';

@UseInterceptors(SentryInterceptor)
@Resolver()
export class UserResolver {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    public readonly userRepository: UserRepository,
  ) {}

  @Query(() => UserDTO)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user): Promise<UserProps> {
    return await this.queryBus.execute(new GetUserQuery(user.userId));
  }

  @Mutation(() => ReturnedStatusDTO)
  async createUser(
    @Args('user') user: UserInput,
  ): Promise<{ status: boolean }> {
    const created: UserProps = await this.commandBus.execute(
      new CreateUserCommand(user.mail, user.password, user.keyCode),
    );

    return { status: !!created };
  }

  @Mutation(() => ReturnedStatusDTO)
  async login(
    @Context() context,
    @Args('user') user: LoginInput,
  ): Promise<{ status: boolean }> {
    const payload = await this.commandBus.execute(
      new LoginUserCommand(user.mail, user.password),
    );

    context.res.cookie('Authorization', payload);

    return { status: !!payload };
  }
}
