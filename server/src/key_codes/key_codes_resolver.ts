import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseInterceptors, UseGuards } from '@nestjs/common';

import { KeyCodeRepository } from './domain/repositories/key_codes_repository';
import { KeyCodeProps } from './domain/models/key_code_model';
import {
  CreateBulkKeyCodeCommand,
  CreateKeyCodeCommand,
} from './domain/commands/impl';
import { CreateKeyCodeDTO } from './dto/create_key_code.dto';
import { GetAllKeyCodesQuery } from './domain/queries/impl';
import { SentryInterceptor } from '../shared/sentry_interceptor';
import { GqlAuthGuard } from '../users/guards/jwt_guard';

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
  async keyCodes(): Promise<KeyCodeProps[]> {
    const keyCodes: KeyCodeProps[] = await this.queryBus.execute(
      new GetAllKeyCodesQuery(),
    );

    return keyCodes;
  }

  @Mutation(() => CreateKeyCodeDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createKeyCode(): Promise<KeyCodeProps> {
    const createdBy = 'Janek25';

    const created: KeyCodeProps = await this.commandBus.execute(
      new CreateKeyCodeCommand(createdBy),
    );

    return created;
  }

  @Mutation(() => [CreateKeyCodeDTO])
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createKeyCodeBulk(
    @Args('amount') amount: number,
  ): Promise<KeyCodeProps> {
    const createdBy = 'Janek25';

    const created: KeyCodeProps = await this.commandBus.execute(
      new CreateBulkKeyCodeCommand(createdBy, amount),
    );

    return created;
  }
}
