import { AggregateRoot } from '@nestjs/cqrs';

import { ArticleCreatedEvent } from '../events/impl/article_created_event';

interface Redactor {
  readonly avatarUrl?: string;
  readonly firstName: string;
  readonly lastName?: string;
  readonly profession?: string;
  readonly shortDescription?: string;
}

export interface ArticleProps {
  readonly _id: string;
  readonly category: string;
  readonly contentHTML: string;
  readonly date: Date;
  readonly description: string;
  readonly header: string;
  readonly pictureUrl: string;
  readonly readingTime: number;
  readonly redactor: Redactor;
  readonly subtitle: string;
  readonly tags: string[];
  readonly title: string;
  readonly videoUrl?: string;
}

export class Article extends AggregateRoot {
  constructor(private readonly props: ArticleProps) {
    super();
  }

  sendNotifications(users: string) {
    this.apply(new ArticleCreatedEvent(this.id, users));
  }

  getProps() {
    return this.props;
  }

  get id() {
    return this.props._id;
  }
}
