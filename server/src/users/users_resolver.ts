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
import { UserProps, User } from './domain/models/user_model';
import { UserDTO } from './dto/user_dto';
import { UserInput } from './inputs/user_input';
import { ReturnedStatusDTO } from '../shared/returned_status';
import { ReturnedTokenDTO } from '../shared/returned_token';
import { LoginInput } from './inputs/login_input';
import { GqlAuthGuard } from './guards/jwt_guard';
import { CurrentUser } from './params/current_user_param';
import { LoggedUser } from './params/current_user_param';
import { GetNotificationsByUserQuery } from '../notifications/domain/queries/impl/get_notifications_by_user_query';
import { NotificationDTO } from '../notifications/dto/notification_dto';
import { ChildDTO } from './dto/children_dto';
import { GetChildrenQuery } from './domain/queries/impl/get_children_query';
import { AgreementDTO } from '../agreements/dto/agreement_dto';
import { GetValidAgreementsQuery } from '../agreements/domain/queries/impl/get_valid_agreements_query';
import { ChangeUserAgreementCommand } from './domain/commands/impl/change_user_agreement_command';
import { AgreementProps } from '../agreements/schemas/agreement_schema';
import { GetAllUsersQuery } from './domain/queries/impl/get_all_users_query';
import {
  ChangePasswordCommand,
  LoginUserCommand,
  CreateUserCommand,
  ResetPasswordCommand,
} from './domain/commands/impl';
import { ReadNotificationCommand } from '../notifications/domain/commands/impl/read_notifiaction_command';
import { NotificationProps } from '../notifications/domain/models/notification_model';
import { AnonymizeUserCommand } from './domain/commands/impl/anonymize_user_command';

@UseInterceptors(SentryInterceptor)
@Resolver(() => UserDTO)
export class UsersResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Query(() => UserDTO)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: LoggedUser): Promise<UserProps> {
    const currentUser: User = await this.queryBus.execute(
      new GetUserQuery(user.userId),
    );

    return currentUser.getProps() as UserProps;
  }

  @ResolveField()
  async notifications(@Parent() user: UserDTO): Promise<NotificationDTO[]> {
    return await this.queryBus.execute(
      new GetNotificationsByUserQuery(user._id),
    );
  }

  @ResolveField()
  async children(@Parent() user: UserProps): Promise<ChildDTO[]> {
    return await this.queryBus.execute(new GetChildrenQuery(user.children));
  }

  @ResolveField()
  async agreements(@Parent() user: UserProps): Promise<AgreementDTO[]> {
    return await this.queryBus.execute(
      new GetValidAgreementsQuery(user.agreements),
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
  ): Promise<UserProps[]> {
    const users: User[] = await this.queryBus.execute(
      new GetAllUsersQuery(role),
    );

    return users.map((user) => user.getProps()) as UserProps[];
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
  async readNotification(@Args('id') id: string): Promise<NotificationProps> {
    const notification: NotificationProps = await this.commandBus.execute(
      new ReadNotificationCommand(id),
    );

    return notification;
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
  ): Promise<AgreementProps> {
    const created: AgreementProps = await this.commandBus.execute(
      new ChangeUserAgreementCommand(user.userId, agreementId),
    );

    return created;
  }
}
