import { AggregateRoot } from '@nestjs/cqrs';

import { Document } from 'mongoose';

export interface NewsletterProps {
  readonly _id?: string;
  message: string;
  recipients: string[];
  title: string;
  type: string;
  isDone: boolean;
}

export type NewsletterNotPersistedProps = Omit<
  NewsletterProps,
  '_id' | 'isDone'
>;

export type NewsletterDocument = NewsletterProps & Document;

export class Newsletter extends AggregateRoot {
  private constructor(
    private readonly props: NewsletterProps | NewsletterNotPersistedProps,
  ) {
    super();
  }

  static create(props: NewsletterNotPersistedProps): Newsletter {
    const article = new Newsletter(props);

    return article;
  }

  static recreate(
    props: NewsletterProps | NewsletterNotPersistedProps,
  ): Newsletter {
    return new Newsletter(props);
  }

  getProps(): NewsletterProps | NewsletterNotPersistedProps {
    return this.props;
  }
}
