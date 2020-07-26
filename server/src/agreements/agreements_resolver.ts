import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseInterceptors, UseGuards } from '@nestjs/common';
import { SentryInterceptor } from '../shared/sentry_interceptor';
import { GqlAuthGuard } from '../users/guards/jwt_guard';
import { AggrementRepository } from './domain/repositories/aggrement_repository';
import { GetAllAggrementsQuery } from './domain/queries/impl/get_all_aggrements_query';
import { AggrementDTO } from './dto/agreement_dto';
import { ReturnedStatusDTO } from '../shared/returned_status';
import { CreateAggrementCommand } from './domain/commands/impl/create_aggrement_command';
import { AggrementProps } from './schemas/aggrement_schema';
import { allowHost } from '../shared/allow_host';

@UseInterceptors(SentryInterceptor)
@Resolver()
export class AggrementsResolver {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    public readonly aggrementRepository: AggrementRepository,
  ) {}

  @Query(() => [AggrementDTO])
  async aggrements(@Context() context): Promise<AggrementDTO[]> {
    const aggrements: AggrementDTO[] = await this.queryBus.execute(
      new GetAllAggrementsQuery(),
    );

    allowHost(context);

    return aggrements;
  }

  @Mutation(() => ReturnedStatusDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createAggrement(
    @Args('aggrement') aggrement: string,
    @Context() context,
  ): Promise<ReturnedStatusDTO> {
    const created: AggrementProps = await this.commandBus.execute(
      new CreateAggrementCommand({ text: aggrement }),
    );

    allowHost(context);

    return {
      status: !!created,
    };
  }
}
