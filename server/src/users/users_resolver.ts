import {
  Resolver,
  Mutation,
  Query,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseInterceptors, UseGuards } from '@nestjs/common';
import * as mongoose from 'mongoose';

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
import { ChildInput } from './inputs/child_input';
import { AddChildCommand } from './domain/commands/impl/add_child_command';
import { ChildProps } from './domain/models/child_model';
import { LoggedUser } from './params/current_user_param';
import { GetNotificationsByUserQuery } from '../notifications/domain/queries/impl/get_notifications_by_user_query';
import { NotificationDTO } from '../notifications/dto/notification.dto';
import { ChildDTO } from './dto/children_dto';
import { GetChildrenQuery } from './domain/queries/impl/get_children_query';
import { ResultInput } from './inputs/result_input';
import { AddChildResultCommand } from './domain/commands/impl/add_child_result_command';

@UseInterceptors(SentryInterceptor)
@Resolver(() => UserDTO)
export class UserResolver {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    public readonly userRepository: UserRepository,
  ) {}

  @Query(() => UserDTO)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: LoggedUser): Promise<UserProps> {
    return await this.queryBus.execute(new GetUserQuery(user.userId));
  }

  @ResolveField()
  async notifications(@Parent() user: UserDTO): Promise<NotificationDTO[]> {
    return await this.queryBus.execute(
      new GetNotificationsByUserQuery(user._id),
    );
  }

  @ResolveField()
  async children(@Parent() user: UserProps): Promise<ChildDTO[]> {
    return await this.queryBus.execute(
      new GetChildrenQuery(user.children as mongoose.Schema.Types.ObjectId[]),
    );
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
  @UseGuards(GqlAuthGuard)
  async addChild(
    @CurrentUser() user: LoggedUser,
    @Args('child') child: ChildInput,
  ): Promise<{ status: boolean }> {
    const created: ChildProps = await this.commandBus.execute(
      new AddChildCommand(child, user.userId),
    );

    return { status: !!created };
  }

  @Mutation(() => ReturnedStatusDTO)
  async addResult(
    @Args('childId') childId: string,
    @Args('result') result: ResultInput,
  ): Promise<{ status: boolean }> {
    const created: ChildProps = await this.commandBus.execute(
      new AddChildResultCommand(result, childId),
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
