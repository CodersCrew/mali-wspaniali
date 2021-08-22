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

import { GetUserQuery } from './domain/queries/impl/get_user_query';
import { SentryInterceptor } from '../shared/sentry_interceptor';
import { User, UserCore } from './domain/models/user_model';
import { UserDTO } from './dto/user_dto';
import { UpdatedUserInput, UserInput } from './inputs/user_input';
import { ReturnedStatusDTO } from '../shared/returned_status';
import { ReturnedTokenDTO } from '../shared/returned_token';
import { LoginInput } from './inputs/login_input';
import { GqlAuthGuard } from './guards/jwt_guard';
import { CurrentUser } from './params/current_user_param';
import { LoggedUser } from './params/current_user_param';
import { GetNotificationsByUserQuery } from '../notifications/domain/queries/impl/get_notifications_by_user_query';
import { NotificationDTO } from '../notifications/dto/notification_dto';
import { ChildDTO } from './dto/child_dto';
import { GetChildrenQuery } from './domain/queries/impl/get_children_query';
import { AgreementDTO } from '../agreements/dto/agreement_dto';
import { GetValidAgreementsQuery } from '../agreements/domain/queries/impl/get_valid_agreements_query';
import { ChangeUserAgreementCommand } from './domain/commands/impl/change_user_agreement_command';
import { GetAllUsersQuery } from './domain/queries/impl/get_all_users_query';
import {
  ChangePasswordCommand,
  LoginUserCommand,
  CreateUserCommand,
  ResetPasswordCommand,
  UpdateUserCommand,
  ConfirmUserCommand,
} from './domain/commands/impl';
import { ReadNotificationCommand } from '../notifications/domain/commands/impl/read_notifiaction_command';
import { AnonymizeUserCommand } from './domain/commands/impl/anonymize_user_command';
import { AgreementMapper } from '../agreements/domain/mappers/agreement_mapper';
import { NotificationCore } from '../notifications/domain/models/notification_model';
import { UserMapper } from './domain/mappers/user_mapper';
import { UserPagination } from './params/user_pagination';
import { NotificationMapper } from '../notifications/domain/mappers/notification_mapper';
import {
  Agreement,
  AgreementCore,
} from '@app/agreements/domain/models/agreement';
import { Notification } from '../notifications/domain/models/notification_model';

@UseInterceptors(SentryInterceptor)
@Resolver(() => UserDTO)
export class UsersResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Query(() => UserDTO)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: LoggedUser): Promise<UserCore> {
    const currentUser: User = await this.queryBus.execute(
      new GetUserQuery(user.userId),
    );

    return currentUser.getProps();
  }

  @ResolveField(() => [NotificationDTO])
  async notifications(@Parent() user: UserDTO): Promise<NotificationDTO[]> {
    const notifications = await this.queryBus.execute(
      new GetNotificationsByUserQuery(user._id),
    );

    return notifications.map(NotificationMapper.toPlain);
  }

  @ResolveField()
  async children(@Parent() user: UserCore): Promise<ChildDTO[]> {
    return await this.queryBus.execute(new GetChildrenQuery(user.children));
  }

  @ResolveField()
  async agreements(@Parent() user: UserCore): Promise<AgreementDTO[]> {
    const agreements = await this.queryBus.execute(
      new GetValidAgreementsQuery(user.agreements),
    );

    return agreements.map(a => AgreementMapper.toRaw(a));
  }

  @Query(() => UserDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async user(@Args('id') id: string): Promise<UserCore> {
    return await this.queryBus.execute(new GetUserQuery(id));
  }

  @Query(() => [UserDTO])
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async users(
    @Args('options', { nullable: true }) options: UserPagination,
  ): Promise<UserCore[]> {
    const users: User[] = await this.queryBus.execute(
      new GetAllUsersQuery(options),
    );

    return users.map(user => user.getProps()) as UserCore[];
  }

  @Mutation(() => ReturnedStatusDTO)
  @UseGuards(GqlAuthGuard)
  async anonymizeUser(@Args('id') id: string) {
    const user: User = await this.commandBus.execute(
      new AnonymizeUserCommand(id),
    );

    return { status: true };
  }

  @Mutation(() => NotificationDTO)
  @UseGuards(GqlAuthGuard)
  async readNotification(@Args('id') id: string): Promise<NotificationCore> {
    const notification: Notification = await this.commandBus.execute(
      new ReadNotificationCommand(id),
    );

    return NotificationMapper.toPlain(notification);
  }

  @Mutation(() => ReturnedStatusDTO)
  async createUser(
    @Args('user') user: UserInput,
  ): Promise<{ status: boolean }> {
    const createdUser: User = await this.commandBus.execute(
      new CreateUserCommand(user),
    );

    createdUser.commit();

    return { status: !!createdUser };
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

  @Mutation(() => AgreementDTO)
  @UseGuards(GqlAuthGuard)
  async signAgreement(
    @CurrentUser() user: LoggedUser,
    @Args('agreementId') agreementId: string,
  ): Promise<AgreementCore> {
    const agreement: Agreement = await this.commandBus.execute(
      new ChangeUserAgreementCommand(user.userId, agreementId),
    );

    return agreement.getProps();
  }

  @Mutation(() => UserDTO)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @CurrentUser() user: LoggedUser,
    @Args('updatedUser') updatedUser: UpdatedUserInput,
  ) {
    const userResult: User = await this.commandBus.execute(
      new UpdateUserCommand(user.userId, updatedUser),
    );

    return UserMapper.toPlain(userResult);
  }

  @Mutation(() => ReturnedStatusDTO)
  async confirmUser(@Args('jwt') jwt: string): Promise<ReturnedStatusDTO> {
    await this.commandBus.execute(new ConfirmUserCommand(jwt));

    return { status: true };
  }
}
