import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseInterceptors, UseGuards } from '@nestjs/common';
import { SentryInterceptor } from '../shared/sentry_interceptor';
import { GqlAuthGuard } from '../users/guards/jwt_guard';
import { AgreementRepository } from './domain/repositories/agreement_repository';
import { GetAllAgreementsQuery } from './domain/queries/impl/get_all_agreements_query';
import { AgreementDTO } from './dto/agreement_dto';
import { ReturnedStatusDTO } from '../shared/returned_status';
import { CreateAgreementCommand } from './domain/commands/impl/create_agreement_command';
import { Agreement, AgreementCore } from './domain/models/agreement';
import { AgreementMapper } from './domain/mappers/agreement_mapper';

@UseInterceptors(SentryInterceptor)
@Resolver()
export class AgreementsResolver {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    public agreementRepository: AgreementRepository,
  ) {}

  @Query(() => [AgreementDTO])
  async agreements(): Promise<AgreementCore[]> {
    const agreements: Agreement[] = await this.queryBus.execute(
      new GetAllAgreementsQuery(),
    );

    return agreements.map(a => AgreementMapper.toRaw(a));
  }

  @Mutation(() => ReturnedStatusDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createAgreement(
    @Args('agreement') agreement: string,
  ): Promise<ReturnedStatusDTO> {
    const created: AgreementCore = await this.commandBus.execute(
      new CreateAgreementCommand({ text: agreement }),
    );

    return {
      status: !!created,
    };
  }
}
