import { NewsletterCore } from '../../models/newsletter_model';
export class NewsletterCreatedEvent {
  constructor(public newsletter: NewsletterCore) {}
}
