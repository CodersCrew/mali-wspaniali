import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllKindergartensQuery } from '../impl/get_all_kindergartens_query';
import { KindergartenRepository } from '../../repositories/kindergarten_repository';
import { Kindergarten } from '../../models/kindergarten_model';

@QueryHandler(GetAllKindergartensQuery)
export class GetAllKindergartensHandler
  implements IQueryHandler<GetAllKindergartensQuery> {
  constructor(private readonly repository: KindergartenRepository) {}

  async execute(query: GetAllKindergartensQuery): Promise<Kindergarten[]> {
    // return this.repository.getPage(query.page, query.category);
    return this.repository.all();
  }
}

// Type 'import("/Users/piotrzachoszcz/Desktop/mali_wspaniali/mali-wspaniali/server/src/kindergarten/interfaces/kindergarten.interface").Kindergarten[]' is not assignable to type 'import("/Users/piotrzachoszcz/Desktop/mali_wspaniali/mali-wspaniali/server/src/kindergarten/domain/models/kindergarten_model").Kindergarten[]'.

// Type 'Kindergarten' is missing the following properties from type 'Kindergarten': props, getPropsts(2322)
// getPage
