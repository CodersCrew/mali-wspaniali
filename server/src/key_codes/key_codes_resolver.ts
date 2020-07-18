import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseInterceptors } from '@nestjs/common';

import { KeyCodeRepository } from './domain/repositories/key_codes_repository';
import { KeyCodeProps } from './domain/models/key_code_model';
import { CreateKeyCodeCommand } from './domain/commands/impl/create_key_code_command';
import { CreateBulkKeyCodeCommand } from './domain/commands/impl/create_bulk_key_code_command';
import { CreateKeyCodeDTO } from './dto/create_key_code.dto';
import { GetAllKeyCodesQuery } from './domain/queries/impl/get_all_key_codes_query';
import { SentryInterceptor } from '../shared/sentry_interceptor';

@UseInterceptors(SentryInterceptor)
@Resolver()
export class KeyCodesResolver {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    public readonly keyCodeRepository: KeyCodeRepository,
  ) {}

  @Query(() => [CreateKeyCodeDTO])
  async keyCodes(): Promise<KeyCodeProps[]> {
    const keyCodes: KeyCodeProps[] = await this.queryBus.execute(
      new GetAllKeyCodesQuery(),
    );

    return keyCodes;
  }

  @Mutation(() => CreateKeyCodeDTO)
  async createKeyCode(): Promise<KeyCodeProps> {
    const createdBy = 'Janek25';

    const created: KeyCodeProps = await this.commandBus.execute(
      new CreateKeyCodeCommand(createdBy),
    );

    return created;
  }

  @Mutation(() => [CreateKeyCodeDTO])
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
