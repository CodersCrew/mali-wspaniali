import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllNewsletterQuery } from '../impl';
import { NewslettersRepository } from '../../repositories/newsletters_repository';
import { Newsletter } from '../../models/newsletter_model';

@QueryHandler(GetAllNewsletterQuery)
export class GetAllNewsletterHandler
  implements IQueryHandler<GetAllNewsletterQuery> {
  constructor(private readonly repository: NewslettersRepository) {}

  async execute(): Promise<Newsletter[]> {
    return this.repository.get();
  }
}
