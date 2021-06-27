import { Resolver, ResolveField, Root } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { UseInterceptors } from '@nestjs/common';

import { SentryInterceptor } from '../shared/sentry_interceptor';
import { KindergartenWithInstructorDTO } from './dto/kindergarten_with_instructor_dto';
import {
  Kindergarten,
  KindergartenCore,
} from '../kindergartens/domain/models/kindergarten_model';
import { KindergartenMapper } from '../kindergartens/domain/mappers/kindergarten_mapper';
import { GetKindergartenQuery } from '../kindergartens/domain/queries/impl/get_kindergarten_query';
import { GetUserQuery } from '../users/domain/queries/impl/get_user_query';
import { User, UserCore } from '@users/domain/models';

@UseInterceptors(SentryInterceptor)
@Resolver(() => KindergartenWithInstructorDTO)
export class KindergartenWithInstructorResolver {
  constructor(private queryBus: QueryBus) {}

  @ResolveField(() => KindergartenWithInstructorDTO, { nullable: true })
  async instructor(
    @Root()
    parent: {
      kindergartenId: string | null;
      instructorId: string | null;
    },
  ): Promise<UserCore> {
    if (!parent.instructorId) return null;

    const instructor: User = await this.queryBus.execute(
      new GetUserQuery(parent.instructorId),
    );

    return instructor.getProps();
  }

  @ResolveField(() => KindergartenWithInstructorDTO, { nullable: true })
  async kindergarten(
    @Root()
    parent: {
      kindergartenId: string | null;
      instructorId: string | null;
    },
  ): Promise<KindergartenCore> {
    if (!parent.kindergartenId) return null;

    const kindergarten: Kindergarten = await this.queryBus.execute(
      new GetKindergartenQuery(parent.kindergartenId),
    );

    if (kindergarten) {
      return KindergartenMapper.toPlain(kindergarten);
    }
  }
}
