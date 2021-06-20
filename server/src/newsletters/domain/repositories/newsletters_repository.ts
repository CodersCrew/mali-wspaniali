import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Newsletter } from '../models/newsletter_model';
import { NewsletterCore } from '../models/newsletter_model';
import { NewsletterDocument } from '../models/newsletter_model';
import { NewsletterMapper } from '../mappers/newsletter_mapper';

@Injectable()
export class NewslettersRepository {
  constructor(
    @InjectModel('Newsletter')
    private model: Model<NewsletterDocument>,
  ) {}

  create(newsletter: NewsletterCore): Promise<Newsletter> {
    const createdNewsletter = new this.model(newsletter);

    return createdNewsletter
      .save()
      .then(newsletter =>
        NewsletterMapper.toDomain(newsletter, { isNew: true }),
      );
  }

  get(): Promise<Newsletter[]> {
    return this.model
      .find()
      .exec()
      .then(newsletters => NewsletterMapper.toDomainMany(newsletters));
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.model.deleteMany({});
  }
}
