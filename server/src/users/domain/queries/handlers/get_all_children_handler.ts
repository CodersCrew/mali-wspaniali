import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllChildrenQuery } from '../impl/get_all_children_query';
import { ChildRepository } from '../../repositories/child_repository';
import { ChildCore } from '../../models/child_model';
import { KindergartenRepository } from '../../../../kindergartens/domain/repositories/kindergarten_repository';
import { ChildMapper } from '../../mappers/child_mapper';
import { KindergartenMapper } from '../../../../kindergartens/domain/mappers/kindergarten_mapper';
import { KindergartenCore } from '../../../../kindergartens/domain/models/kindergarten_model';
import { ChildAssessmentResultCore } from '../../models/child_assessment_result_model';
import { ChildAssessmentResultMapper } from '../../mappers/child_assessment_result_mapper';
import { ChildAssessmentResultRepository } from '../../repositories/child_assessment_result_repository';

export interface ChildWithKindergarten {
  child: ChildCore;
  kindergarten: KindergartenCore;
  results: ChildAssessmentResultCore[];
}

@QueryHandler(GetAllChildrenQuery)
export class GetAllChildrenHandler
  implements IQueryHandler<GetAllChildrenQuery> {
  constructor(
    private childRepository: ChildRepository,
    private kindergartenRepository: KindergartenRepository,
    private childrResultRepository: ChildAssessmentResultRepository,
  ) {}

  async execute(): Promise<ChildWithKindergarten[]> {
    const children = await this.childRepository.getAll();

    const kindergartensIds = children.map(child => child.kindergarten);

    const childrenIds = children.map(child => child.id);

    const kindergartenList = await this.kindergartenRepository.getMany(
      kindergartensIds,
    );

    const results = await this.childrResultRepository.getMany(childrenIds);

    const childrenWithKindergartens = children.map(child => {
      const foundKindergarten = kindergartenList.find(
        kindergarten => kindergarten.id === child.kindergarten,
      );

      const foundChildrenResults = results.filter(
        result => result.childId === child.id,
      );

      return {
        child: ChildMapper.toPlain(child),
        kindergarten: KindergartenMapper.toPlain(foundKindergarten),
        results: foundChildrenResults.map(e =>
          ChildAssessmentResultMapper.toPlain(e),
        ),
      };
    });

    return childrenWithKindergartens;
  }
}
