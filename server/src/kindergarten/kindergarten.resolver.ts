import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import * as Sentry from '@sentry/minimal';
import { CreateKindergartenDTO } from './dto/create_kindergarten_dto';
import { KindergartenInput } from './inputs/kindergarten_input';
import {
  Kindergarten,
  KindergartenProps,
} from './domain/models/kindergarten_model';
import { CreateKindergartenCommand } from './domain/commands/impl/create_kindergarten_command';
import { GetAllKindergartensQuery } from './domain/queries/impl/get_all_kindergartens_query';
import { GetKindergartenByIdQuery } from './domain/queries/impl/get_kindergarten_by_id_query';
import { ReturnedStatusDTO } from '../shared/returned_status';
import { HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { SentryInterceptor } from '../shared/sentry_interceptor';

@UseInterceptors(SentryInterceptor)
@Resolver()
export class KindergartenResolver {
  constructor(
    private commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => [CreateKindergartenDTO])
  async kindergartens(): Promise<KindergartenProps[]> {
    const kindergartens: Kindergarten[] = await this.queryBus.execute(
      new GetAllKindergartensQuery(),
    );

    return kindergartens.map(kindergarten => kindergarten.getProps());
  }

  @Query(() => CreateKindergartenDTO)
  async kindergarten(@Args('id') id: string): Promise<KindergartenProps> {
    const kindergarten: Kindergarten = await this.queryBus.execute(
      new GetKindergartenByIdQuery(id),
    );
    if (kindergarten.getProps()) {
      return kindergarten.getProps();
    }
    throw new HttpException('Kindergarten not found', HttpStatus.NOT_FOUND);
  }

  @Mutation(() => ReturnedStatusDTO)
  async createKindergarten(
    @Args('kindergarten') kindergarten: KindergartenInput,
  ): Promise<{ status: boolean }> {
    const newKindergarten: Kindergarten = await this.commandBus.execute(
      new CreateKindergartenCommand(kindergarten),
    );

    const kindergartenContent = newKindergarten.getProps();

    if (kindergartenContent) {
      Sentry.captureMessage(
        `[Mali Wspaniali]: Created a new kindergarten ${kindergartenContent.name}`,
      );
    }
    return { status: !!kindergartenContent };
  }
}
