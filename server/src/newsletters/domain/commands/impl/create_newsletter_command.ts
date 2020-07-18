import { NewsletterInput } from '../../../inputs/newsletter_input';

export class CreateNewsletterCommand {
  constructor(public readonly newsletterProps: NewsletterInput) {}
}
