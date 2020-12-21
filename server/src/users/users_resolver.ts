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
import { ChildInput, UpdatedChildInput } from './inputs/child_input';
import { ChildProps, Child } from './domain/models/child_model';
import { LoggedUser } from './params/current_user_param';
import { GetNotificationsByUserQuery } from '../notifications/domain/queries/impl/get_notifications_by_user_query';
import { NotificationDTO } from '../notifications/dto/notification_dto';
import { ChildDTO } from './dto/children_dto';
import { GetChildrenQuery } from './domain/queries/impl/get_children_query';
import { ResultInput } from './inputs/result_input';
import { AgreementDTO } from '../agreements/dto/agreement_dto';
import { GetValidAgreementsQuery } from '../agreements/domain/queries/impl/get_valid_agreements_query';
import { ChangeUserAgreementCommand } from './domain/commands/impl/change_user_agreement_command';
import { AgreementProps } from '../agreements/schemas/agreement_schema';
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
import { ChildWithKindergarten } from './domain/queries/handlers/get_all_children_handler';
import { EditChildCommand } from './domain/commands/impl/edit_child_command';
import { ChildMapper } from './domain/mappers/child_mapper';
import { KindergartenDTO } from '../kindergartens/dto/kindergarten_dto';
import { GetKindergartenQuery } from '../kindergartens/domain/queries/impl/get_kindergarten_query';

@UseInterceptors(SentryInterceptor)
@Resolver(() => UserDTO)
export class UsersResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

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
      new GetChildrenQuery(
        (user.children as mongoose.Schema.Types.ObjectId[]).map(c =>
          c.toString(),
        ),
      ),
    );
  }

  @ResolveField()
  async agreements(@Parent() user: UserProps): Promise<AgreementDTO[]> {
    return await this.queryBus.execute(
      new GetValidAgreementsQuery(
        (
          (user.agreements as mongoose.Schema.Types.ObjectId[]) || []
        ).map(agreement => agreement.toString()),
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
  async signAgreement(
    @CurrentUser() user: LoggedUser,
    @Args('agreementId') agreementId: string,
  ): Promise<{ status: boolean }> {
    const created: AgreementProps = await this.commandBus.execute(
      new ChangeUserAgreementCommand(user.userId, agreementId),
    );

    return { status: !!created };
  }
}
