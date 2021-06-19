import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ChildRepository } from '../../repositories/child_repository';
import { KindergartenMapper } from '../../../../kindergartens/domain/mappers/kindergarten_mapper';
import { Child } from '../../models/child_model';
import { GetChildrenQuery } from '../impl/get_children_query';
import { KindergartenRepository } from '../../../../kindergartens/domain/repositories/kindergarten_repository';
import { ChildMapper } from '../../mappers/child_mapper';
import { ChildAssessmentResultRepository } from '../../repositories/child_assessment_result_repository';
import { ChildAssessmentResultMapper } from '../../mappers/child_assessment_result_mapper';

@QueryHandler(GetChildrenQuery)
export class GetChildrenHandler implements IQueryHandler<GetChildrenQuery> {
  constructor(
    private readonly childRepository: ChildRepository,
    private readonly childrResultRepository: ChildAssessmentResultRepository,
    private readonly kindergartenRepository: KindergartenRepository,
  ) {
    this.mapChildWithKindergarten = this.mapChildWithKindergarten.bind(this);
  }

  async execute({ ids }: { ids: string[] }) {
    const children = await this.childRepository.get(ids);

    const childWithKindergarten = await Promise.all(
      children.map(this.mapChildWithKindergarten),
    );

    return childWithKindergarten.filter(child => !child.isDeleted);
  }

  async mapChildWithKindergarten(child: Child) {
    const results = await this.childrResultRepository.getByChild(child.id);
    const kindergarten = await this.kindergartenRepository.get(
      child.kindergarten,
    );

    return {
      ...ChildMapper.toPlain(child),
      results: results.map(r => ChildAssessmentResultMapper.toPlain(r)),
      kindergarten: KindergartenMapper.toRaw(kindergarten),
    };
  }
}
