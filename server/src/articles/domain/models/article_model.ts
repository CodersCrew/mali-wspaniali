import { AggregateRoot } from '@nestjs/cqrs';

import { ArticleCreatedEvent } from '../events/impl';
import { Category, CategoryProps } from './category';
import { ReadingTime } from './reading_time';
import { UrlProps, Url } from '../../../shared/domain/url';
import { Tags, TagsProps } from './tags';
import { Redactor, RedactorProps } from './redactor';
import {
  TextLength,
  TextLengthProps,
} from '../../../shared/domain/text_length';

export interface ArticleProps {
  readonly _id?: string;
  category: CategoryProps;
  readonly contentHTML: string;
  readonly date?: Date;
  description: TextLengthProps;
  pictureUrl: UrlProps;
  readingTime: number;
  readonly redactor: RedactorProps;
  tags: TagsProps;
  title: TextLengthProps;
  videoUrl?: UrlProps;
}

interface ArticleInnerProps {
  readonly _id?: string;
  category: Category;
  readonly contentHTML: string;
  readonly date?: Date;
  description: TextLength;
  pictureUrl: Url;
  readingTime: ReadingTime;
  readonly redactor: Redactor;
  tags: Tags;
  title: TextLength;
  videoUrl?: Url;
}

export class Article extends AggregateRoot {
  private constructor(private readonly props: ArticleInnerProps) {
    super();
  }

  static create(props: ArticleInnerProps): Article {
    const article = new Article(props);

    article.apply(new ArticleCreatedEvent(article.id));

    return article;
  }

  static recreate(props: ArticleInnerProps): Article {
    return new Article(props);
  }

  getProps(): ArticleInnerProps {
    return this.props;
  }

  get id(): string {
    return this.props._id;
  }
}
