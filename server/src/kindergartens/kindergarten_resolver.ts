import {
  Resolver,
  Mutation,
  Query,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseInterceptors, UseGuards } from '@nestjs/common';

import { KindergartenDTO } from './dto/kindergarten_dto';
import { SentryInterceptor } from '../shared/sentry_interceptor';
import { GqlAuthGuard } from '../users/guards/jwt_guard';
import { Kindergarten } from './domain/models/kindergarten_model';
import {
  GetAllKindergartensQuery,
  GetKindergartenWithUsersQuery,
} from './domain/queries/impl';
import {
  CreateKindergartenCommand,
  EditKindergartenCommand,
  DeleteKindergartenCommand,
} from './domain/commands/impl';
import { ReturnedStatusDTO } from '../shared/returned_status';
import { KindergartenWithUsersDTO } from './dto/kindergarten_with_users_dto';
import { KindergartenMapper } from './domain/mappers/kindergarten_mapper';
import { ChildDTO } from '../users/dto/children_dto';
import { GetChildrenFromKindergartenQuery } from '../users/domain/queries/impl/get_children_from_kindergarten_query';
import { Child } from '../users/domain/models/child_model';
import { ChildMapper } from '../users/domain/mappers/child_mapper';
import { KindergartenCore } from './domain/models/kindergarten_model';
import {
  KindergartenInput,
  UpdatedKindergartenInput,
} from './inputs/kindergarten_input';
import { KindergartenWithUsersProps } from './domain/models/kindergarten_with_users_model';

@UseInterceptors(SentryInterceptor)
@Resolver(() => KindergartenDTO)
export class KindergartenResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @ResolveField(() => [ChildDTO])
  async children(@Parent() kindergarten: KindergartenDTO) {
    const children: Child[] = await this.queryBus.execute(
      new GetChildrenFromKindergartenQuery(kindergarten._id),
    );

    return children.map(child => ChildMapper.toPlain(child));
  }

  @Query(() => [KindergartenDTO])
  @UseGuards(GqlAuthGuard)
  async kindergartens() {
    const kindergartens: Kindergarten[] = await this.queryBus.execute(
      new GetAllKindergartensQuery(),
    );

    return kindergartens.map(k => KindergartenMapper.toRaw(k));
  }

  @Query(() => [KindergartenWithUsersDTO])
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async kindergartenWithUsers(
    @Args('ids', { type: () => [String] }) ids: string[],
  ): Promise<KindergartenCore[]> {
    const kindergarten: KindergartenWithUsersProps[] = await this.queryBus.execute(
      new GetKindergartenWithUsersQuery(ids),
    );

    return kindergarten;
  }

  @Mutation(() => KindergartenDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createKindergarten(
    @Args('kindergarten') kindergarten: KindergartenInput,
  ) {
    const created: Kindergarten = await this.commandBus.execute(
      new CreateKindergartenCommand(kindergarten),
    );

    return KindergartenMapper.toRaw(created);
  }

  @Mutation(() => KindergartenDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async updateKindergarten(
    @Args('id') id: string,
    @Args('kindergarten') kindergarten: UpdatedKindergartenInput,
  ): Promise<KindergartenCore> {
    const updated: Kindergarten = await this.commandBus.execute(
      new EditKindergartenCommand(id, kindergarten),
    );

    return KindergartenMapper.toRaw(updated);
  }

  @Mutation(() => ReturnedStatusDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async deleteKindergarten(
    @Args('id') id: string,
  ): Promise<{ status: boolean }> {
    const isDeleted: boolean = await this.commandBus.execute(
      new DeleteKindergartenCommand(id),
    );

    return { status: isDeleted };
  }
}
