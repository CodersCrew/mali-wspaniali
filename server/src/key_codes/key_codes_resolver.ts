import { Resolver, Mutation, Query, Args, Int } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseInterceptors, UseGuards } from '@nestjs/common';

import { KeyCodeRepository } from './domain/repositories/key_codes_repository';
import {
  CreateBulkKeyCodeCommand,
  CreateKeyCodeCommand,
} from './domain/commands/impl';
import { CreateKeyCodeDTO, KeyCodeSeriesDTO } from './dto/create_key_code.dto';
import {
  GetAllKeyCodesQuery,
  GetAllKeyCodeSeriesQuery,
} from './domain/queries/impl';
import { SentryInterceptor } from '../shared/sentry_interceptor';
import { GqlAuthGuard } from '../users/guards/jwt_guard';
import { CurrentUser, LoggedUser } from '../users/params/current_user_param';
import { KeyCode, KeyCodeCore } from './domain/models/key_code_model';
import { KeyCodeMapper } from './domain/mappers/keycode_mapper';

@UseInterceptors(SentryInterceptor)
@Resolver()
export class KeyCodesResolver {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    public keyCodeRepository: KeyCodeRepository,
  ) {}

  @Query(() => [CreateKeyCodeDTO])
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async keyCodes(@Args('series') series: string): Promise<KeyCodeCore[]> {
    const keyCodes: KeyCode[] = await this.queryBus.execute(
      new GetAllKeyCodesQuery(series),
    );

    return KeyCodeMapper.toPlainMany(keyCodes);
  }

  @Query(() => [KeyCodeSeriesDTO])
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async keyCodeSeries(): Promise<Array<KeyCodeCore & { count: number }>> {
    const keyCodes: Array<{
      keyCodeSeries: KeyCode;
      count: number;
    }> = await this.queryBus.execute(new GetAllKeyCodeSeriesQuery());

    return keyCodes.map(keyCode => ({
      ...KeyCodeMapper.toPlain(keyCode.keyCodeSeries),
      count: keyCode.count,
    }));
  }

  @Mutation(() => CreateKeyCodeDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createKeyCode(
    @CurrentUser() user: LoggedUser,
    @Args('target') target: string,
  ): Promise<KeyCodeCore> {
    const createdBy = user.userId;

    const created: KeyCode = await this.commandBus.execute(
      new CreateKeyCodeCommand(createdBy, target),
    );

    return KeyCodeMapper.toPlain(created);
  }

  @Mutation(() => [CreateKeyCodeDTO])
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createKeyCodeBulk(
    @CurrentUser() user: LoggedUser,
    @Args('target') target: string,
    @Args('amount', { type: () => Int }) amount: number,
  ): Promise<KeyCodeCore[]> {
    const createdBy = user.userId;

    const keyCodes: KeyCode[] = await this.commandBus.execute(
      new CreateBulkKeyCodeCommand(createdBy, amount, target),
    );

    return KeyCodeMapper.toPlainMany(keyCodes);
  }
}
