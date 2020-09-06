import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseInterceptors, UseGuards } from '@nestjs/common';

import { KindergartenDTO } from './dto/kindergarten_dto';
import { SentryInterceptor } from '../shared/sentry_interceptor';
import { GqlAuthGuard } from '../users/guards/jwt_guard';
import { KindergartenProps } from './domain/models/kindergarten_model';
import { GetAllKindergartensQuery } from './domain/queries/impl';
import {
  CreateKindergartenCommand,
  EditKindergartenCommand,
} from './domain/commands/impl';
import { CreateKindergartenInput } from './inputs/create_kindergarten_input';
import { EditKindergartenInput } from './inputs/edit_kindergarten_input';

@UseInterceptors(SentryInterceptor)
@Resolver()
export class KindergartenResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Query(() => [KindergartenDTO])
  @UseGuards(GqlAuthGuard)
  async kindergartens(): Promise<KindergartenProps[]> {
    const kindergartens: KindergartenProps[] = await this.queryBus.execute(
      new GetAllKindergartensQuery(),
    );

    return kindergartens;
  }

  @Mutation(() => KindergartenDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createKindergarten(
    @Args('kindergarten') kindergarten: CreateKindergartenInput,
  ): Promise<KindergartenProps> {
    const created: KindergartenProps = await this.commandBus.execute(
      new CreateKindergartenCommand(kindergarten),
    );

    return created;
  }

  @Mutation(() => KindergartenDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async updateKindergarten(
    @Args('id') id: string,
    @Args('kindergarten') kindergarten: EditKindergartenInput,
  ): Promise<KindergartenProps> {
    const updated: KindergartenProps = await this.commandBus.execute(
      new EditKindergartenCommand(id, kindergarten),
    );

    return updated;
  }
}
