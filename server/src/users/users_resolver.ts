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
import { ReturnedStatusDTO } from '../shared/returned_status';
import { ReturnedTokenDTO } from '../shared/returned_token';
import { LoginInput } from './inputs/login_input';
import { GqlAuthGuard } from './guards/jwt_guard';
import { CurrentUser } from './params/current_user_param';
import { ChildInput } from './inputs/child_input';
import { ChildProps } from './domain/models/child_model';
import { LoggedUser } from './params/current_user_param';
import { GetNotificationsByUserQuery } from '../notifications/domain/queries/impl/get_notifications_by_user_query';
import { NotificationDTO } from '../notifications/dto/notification_dto';
import { ChildDTO } from './dto/children_dto';
import { GetChildrenQuery } from './domain/queries/impl/get_children_query';
import { ResultInput } from './inputs/result_input';
import { AggrementDTO } from '../agreements/dto/agreement_dto';
import { GetValidAggrementsQuery } from '../agreements/domain/queries/impl/get_valid_aggrements_query';
import { AddAggrementToUserCommand } from './domain/commands/impl/add_aggrement_to_user_command';
import { AggrementProps } from '../agreements/schemas/aggrement_schema';
import { GetAllUsersQuery } from './domain/queries/impl/get_all_users_query';
import { GetAllChildrenQuery } from './domain/queries/impl/get_all_children_query';
import {
  ChangePasswordCommand,
  AddChildCommand,
  AddChildResultCommand,
  LoginUserCommand,
  CreateUserCommand,
  ResetPasswordCommand,
} from './domain/commands/impl';

@UseInterceptors(SentryInterceptor)
@Resolver(() => UserDTO)
export class UsersResolver {
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

  @ResolveField()
  async aggrements(@Parent() user: UserProps): Promise<AggrementDTO[]> {
    return await this.queryBus.execute(
      new GetValidAggrementsQuery(
        (user.aggrements as mongoose.Schema.Types.ObjectId[]).map(aggrement =>
          aggrement.toString(),
        ),
      ),
    );
  }

  @Query(() => UserDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async user(@Args('id') id: string): Promise<UserProps> {
    return await this.queryBus.execute(new GetUserQuery(id));
  }

  @Query(() => [UserDTO])
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async users(
    @Args('role', { nullable: true }) role: string,
  ): Promise<UserProps> {
    return await this.queryBus.execute(new GetAllUsersQuery(role));
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

  @Query(() => [ChildDTO])
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async allChildren(): Promise<UserProps> {
    return await this.queryBus.execute(new GetAllChildrenQuery());
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
    @Args('rootResultId', { nullable: true }) rootResultId?: string | undefined,
  ): Promise<{ status: boolean }> {
    const created: ChildProps = await this.commandBus.execute(
      new AddChildResultCommand(result, childId, rootResultId),
    );

    return { status: !!created };
  }

  @Mutation(() => ReturnedTokenDTO)
  async login(
    @Context() context,
    @Args('user') user: LoginInput,
  ): Promise<{ token: string }> {
    const payload = await this.commandBus.execute(
      new LoginUserCommand(user.mail, user.password),
    );

    if (new RegExp(process.env.SERVER_HOST).test(context.req.headers.origin)) {
      context.res.header(
        'Access-Control-Allow-Origin',
        context.req.headers.origin,
      );
    }

    return { token: payload };
  }

  @Mutation(() => ReturnedStatusDTO)
  async resetPassword(
    @Args('mail') mail: string,
  ): Promise<{ status: boolean }> {
    await this.commandBus.execute(new ResetPasswordCommand(mail));

    return { status: true };
  }

  @Mutation(() => ReturnedStatusDTO)
  async changePassword(
    @Args('jwt') jwt: string,
    @Args('password') password: string,
  ): Promise<{ status: boolean }> {
    await this.commandBus.execute(new ChangePasswordCommand(jwt, password));

    return { status: true };
  }

  @Mutation(() => ReturnedStatusDTO)
  @UseGuards(GqlAuthGuard)
  async signAggrement(
    @CurrentUser() user: LoggedUser,
    @Args('aggrementId') aggrementId: string,
  ): Promise<{ status: boolean }> {
    const created: AggrementProps = await this.commandBus.execute(
      new AddAggrementToUserCommand(user.userId, aggrementId),
    );

    return { status: !!created };
  }
}
