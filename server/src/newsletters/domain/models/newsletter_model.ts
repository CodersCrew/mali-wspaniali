import { AggregateRoot } from '@nestjs/cqrs';
import { Expose, Transform } from 'class-transformer';

import { Document } from 'mongoose';
import { ICoreModel, CoreModel } from '../../../shared/utils/core_model';
import { NewsletterCreatedEvent } from '../events/impl/newsletter_created_event';

export type NewsletterDocument = NewsletterCore & Document;

export class NewsletterCore extends CoreModel {
  @Expose()
  message: string;

  @Expose()
  recipients: string[];

  @Expose()
  title: string;

  @Expose()
  type: string;

  @Expose()
  @Transform(value => value ?? false)
  isDone?: boolean;
}

export class Newsletter extends AggregateRoot
  implements ICoreModel<Newsletter, NewsletterCore> {
  private constructor(private props: NewsletterCore) {
    super();
  }

  getProps(): NewsletterCore {
    return this.props;
  }

  get id(): string {
    return this.props._id;
  }

  get recipients(): string[] {
    return this.props.recipients;
  }

  get message(): string {
    return this.props.message;
  }

  get title(): string {
    return this.props.title;
  }

  get isDone(): boolean {
    return this.props.isDone;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get modifiedAt(): Date {
    return this.props.modifiedAt;
  }

  get deletedAt(): Date {
    return this.props.deletedAt;
  }

  static create(props: NewsletterCore): Newsletter {
    const article = new Newsletter(props);

    article.apply(new NewsletterCreatedEvent(article.getProps()));

    return article;
  }

  static recreate(props: NewsletterCore): Newsletter {
    return new Newsletter(props);
  }
}
