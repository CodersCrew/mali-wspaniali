import { Resolver, Mutation, Query, Args, Int } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseInterceptors, UseGuards } from '@nestjs/common';

import { KeyCodeRepository } from './domain/repositories/key_codes_repository';
import { KeyCodeProps } from './domain/models/key_code_model';
import {
  CreateBulkKeyCodeCommand,
  CreateKeyCodeCommand,
} from './domain/commands/impl';
import { CreateKeyCodeDTO } from './dto/create_key_code.dto';
import {
  GetAllKeyCodesQuery,
  GetAllKeyCodeSeriesQuery,
} from './domain/queries/impl';
import { SentryInterceptor } from '../shared/sentry_interceptor';
import { GqlAuthGuard } from '../users/guards/jwt_guard';
import { CurrentUser, LoggedUser } from '../users/params/current_user_param';
import { KeyCodeSeriesProps } from '../key_codes/domain/models/key_code_model';
import { KeyCodeSeriesDTO } from './dto/key_code_series.dto';

@UseInterceptors(SentryInterceptor)
@Resolver()
export class KeyCodesResolver {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    public readonly keyCodeRepository: KeyCodeRepository,
  ) {}

  @Query(() => [CreateKeyCodeDTO])
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async keyCodes(@Args('series') series: string): Promise<KeyCodeProps[]> {
    const keyCodes: KeyCodeProps[] = await this.queryBus.execute(
      new GetAllKeyCodesQuery(series),
    );

    return keyCodes;
  }

  @Query(() => [KeyCodeSeriesDTO])
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async keyCodeSeries(): Promise<KeyCodeSeriesProps[]> {
    const keyCodes: KeyCodeSeriesProps[] = await this.queryBus.execute(
      new GetAllKeyCodeSeriesQuery(),
    );

    return keyCodes;
  }

  @Mutation(() => CreateKeyCodeDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createKeyCode(
    @CurrentUser() user: LoggedUser,
    @Args('target') target: string,
  ): Promise<KeyCodeProps> {
    const createdBy = user.userId;

    const created: KeyCodeProps = await this.commandBus.execute(
      new CreateKeyCodeCommand(createdBy, target),
    );

    return created;
  }

  @Mutation(() => [CreateKeyCodeDTO])
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createKeyCodeBulk(
    @CurrentUser() user: LoggedUser,
    @Args('target') target: string,
    @Args('amount', { type: () => Int }) amount: number,
  ): Promise<KeyCodeProps> {
    const createdBy = user.userId;

    const created: KeyCodeProps = await this.commandBus.execute(
      new CreateBulkKeyCodeCommand(createdBy, amount, target),
    );

    return created;
  }
}
