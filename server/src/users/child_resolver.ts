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

import { SentryInterceptor } from '../shared/sentry_interceptor';
import { ReturnedStatusDTO } from '../shared/returned_status';
import { GqlAuthGuard } from './guards/jwt_guard';
import { CurrentUser } from './params/current_user_param';
import { ChildInput, UpdatedChildInput } from './inputs/child_input';
import { Child, ChildCore } from './domain/models/child_model';
import { LoggedUser } from './params/current_user_param';
import { ChildDTO } from './dto/children_dto';
import { ResultInput } from './inputs/result_input';
import { GetAllChildrenQuery } from './domain/queries/impl/get_all_children_query';
import {
  AddChildCommand,
  AddChildResultCommand,
  CreateAssessmentResultCommand,
  UpdateAssessmentResultCommand,
} from './domain/commands/impl';
import { ChildWithKindergarten } from './domain/queries/handlers/get_all_children_handler';
import { EditChildCommand } from './domain/commands/impl/edit_child_command';
import { ChildMapper } from './domain/mappers/child_mapper';
import { KindergartenDTO } from '../kindergartens/dto/kindergarten_dto';
import { GetKindergartenQuery } from '../kindergartens/domain/queries/impl/get_kindergarten_query';
import { KindergartenMapper } from '../kindergartens/domain/mappers/kindergarten_mapper';
import { ChildCurrentParamsDTO } from './dto/child_current_params_dto';
import { countParams } from '../shared/utils/count_params';
import {
  PartialChildResult,
  PartialChildResultInput,
  PartialUpdateChildResultInput,
} from './inputs/child_result_input';
import { GetKindergartenResults } from './domain/queries/impl';
import { KindergartenCore } from '../kindergartens/domain/models/kindergarten_model';
import { ChildAssessmentResultDTO } from './dto/child_assessment_result';
import { GetChildResultsQuery } from './domain/queries/impl/get_child_results_query';
import { ChildAssessmentResultCore } from './domain/models/child_assessment_result_model';
import { ChildAssessmentResultMapper } from './domain/mappers/child_assessment_result_mapper';

@UseInterceptors(SentryInterceptor)
@Resolver(() => ChildDTO)
export class ChildResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @ResolveField(() => KindergartenDTO)
  async kindergarten(@Parent() child: ChildDTO): Promise<KindergartenCore> {
    const result = await this.queryBus.execute(
      new GetKindergartenQuery(child.kindergarten),
    );

    return KindergartenMapper.toRaw(result);
  }

  @ResolveField(() => ChildCurrentParamsDTO)
  currentParams(@Parent() child: ChildDTO): ChildCurrentParamsDTO {
    return countParams(child);
  }

  @ResolveField(() => [ChildAssessmentResultDTO])
  async results(
    @Parent() child: ChildDTO,
  ): Promise<ChildAssessmentResultCore[]> {
    const results = await this.queryBus.execute(
      new GetChildResultsQuery(child._id),
    );

    return results.map(result => ChildAssessmentResultMapper.toPlain(result));
  }

  @Query(() => [ChildDTO])
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async allChildren() {
    const childrenWithKindergarten: ChildWithKindergarten[] = await this.queryBus.execute(
      new GetAllChildrenQuery(),
    );

    return childrenWithKindergarten.map(child => ({
      ...child.child,
      kindergarten: child.kindergarten,
      results: child.results,
    }));
  }

  @Mutation(() => ChildDTO)
  @UseGuards(GqlAuthGuard)
  async addChild(
    @CurrentUser() user: LoggedUser,
    @Args('child') child: ChildInput,
  ): Promise<ChildCore> {
    const created: Child = await this.commandBus.execute(
      new AddChildCommand(child, user.userId),
    );

    return ChildMapper.toPlain(created);
  }

  @Mutation(() => ReturnedStatusDTO)
  @UseGuards(GqlAuthGuard)
  async editChild(
    @CurrentUser() user: LoggedUser,
    @Args('child') child: UpdatedChildInput,
  ): Promise<{ status: boolean }> {
    const edited: ChildCore = await this.commandBus.execute(
      new EditChildCommand(child, user.userId),
    );

    return { status: !!edited };
  }

  @Mutation(() => ReturnedStatusDTO)
  async addResult(
    @Args('childId') childId: string,
    @Args('result') result: ResultInput,
    @Args('rootResultId', { nullable: true }) rootResultId?: string | undefined,
  ): Promise<{ status: boolean }> {
    const created: ChildCore = await this.commandBus.execute(
      new AddChildResultCommand(result, childId, rootResultId),
    );

    return { status: !!created };
  }

  @Mutation(() => PartialChildResult)
  async createAssessmentResult(
    @Args('result') result: PartialChildResultInput,
  ): Promise<PartialChildResult> {
    const created: PartialChildResult = await this.commandBus.execute(
      new CreateAssessmentResultCommand(result),
    );

    return created;
  }

  @Mutation(() => PartialChildResult)
  updateAssessmentResult(
    @Args('result') result: PartialUpdateChildResultInput,
  ): Promise<PartialChildResult> {
    return this.commandBus.execute(new UpdateAssessmentResultCommand(result));
  }

  @Query(() => [PartialChildResult])
  async kindergartenResults(
    @Args('assessmentId') assessmentId: string,
    @Args('kindergartenId') kindergartenId: string,
  ) {
    const results: PartialChildResult[] = await this.queryBus.execute(
      new GetKindergartenResults(assessmentId, kindergartenId),
    );

    return results;
  }
}
