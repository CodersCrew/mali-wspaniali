import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllNewsletterQuery } from '../impl';
import { NewsletterRepository } from '../../repositories/newsletter_repository';
import { Newsletter } from '../../models/newsletter_model';

@QueryHandler(GetAllNewsletterQuery)
export class GetAllNewsletterHandler
  implements IQueryHandler<GetAllNewsletterQuery> {
  constructor(private readonly repository: NewsletterRepository) {}

  async execute(query: GetAllNewsletterQuery): Promise<Newsletter[]> {
    return this.repository.get();
  }
}
