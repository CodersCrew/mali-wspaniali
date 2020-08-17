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
import { AgreementProps } from './schemas/agreement_schema';

@UseInterceptors(SentryInterceptor)
@Resolver()
export class AgreementsResolver {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    public readonly agreementRepository: AgreementRepository,
  ) {}

  @Query(() => [AgreementDTO])
  async agreements(): Promise<AgreementDTO[]> {
    const agreements: AgreementDTO[] = await this.queryBus.execute(
      new GetAllAgreementsQuery(),
    );

    return agreements;
  }

  @Mutation(() => ReturnedStatusDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createAgreement(
    @Args('agreement') agreement: string,
  ): Promise<ReturnedStatusDTO> {
    const created: AgreementProps = await this.commandBus.execute(
      new CreateAgreementCommand({ text: agreement }),
    );

    return {
      status: !!created,
    };
  }
}
