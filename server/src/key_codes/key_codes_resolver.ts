import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
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
import { allowHost } from '../shared/allow_host';

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
  async keyCodes(@Context() context): Promise<KeyCodeProps[]> {
    const keyCodes: KeyCodeProps[] = await this.queryBus.execute(
      new GetAllKeyCodesQuery(),
    );

    allowHost(context);

    return keyCodes;
  }

  @Mutation(() => CreateKeyCodeDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createKeyCode(@Context() context): Promise<KeyCodeProps> {
    const createdBy = 'Janek25';

    const created: KeyCodeProps = await this.commandBus.execute(
      new CreateKeyCodeCommand(createdBy),
    );

    allowHost(context);

    return created;
  }

  @Mutation(() => [CreateKeyCodeDTO])
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createKeyCodeBulk(
    @Args('amount') amount: number,
    @Context() context,
  ): Promise<KeyCodeProps> {
    const createdBy = 'Janek25';

    const created: KeyCodeProps = await this.commandBus.execute(
      new CreateBulkKeyCodeCommand(createdBy, amount),
    );

    allowHost(context);

    return created;
  }
}
