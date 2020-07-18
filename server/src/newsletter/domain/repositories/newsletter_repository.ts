import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewsletterInput } from '../../inputs/newsletter_input';
import {
  Newsletter,
  NewsletterNotPersistedProps,
} from '../models/newsletter_model';
import { NewsletterProps } from '../../../newsletter/domain/models/newsletter_model';
import { NewsletterDocument } from '../models/newsletter_model';

@Injectable()
export class NewsletterRepository {
  constructor(
    @InjectModel('Newsletter')
    private readonly model: Model<NewsletterDocument>,
  ) {}

  async create(createNewsletterDTO: NewsletterInput): Promise<Newsletter> {
    const newsletter = Newsletter.recreate(createNewsletterDTO);
    const createdNewsletter = new this.model(newsletter.getProps());

    return await createdNewsletter
      .save()
      .then((newsletter: NewsletterNotPersistedProps) =>
        Newsletter.create(newsletter),
      );
  }

  async get(): Promise<Newsletter[]> {
    return await this.model
      .find()
      .exec()
      .then((newsletters: NewsletterProps[]) =>
        newsletters.map(newsletter => Newsletter.recreate(newsletter)),
      );
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.model.deleteMany({});
  }
}
