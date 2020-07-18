import { AggregateRoot } from '@nestjs/cqrs';

import { ArticleCreatedEvent } from '../events/impl';
import { Category, CategoryProps } from './category';
import { ReadingTime } from './reading_time';
import { UrlProps, Url } from '../../../shared/domain/url';
import { Tags, TagsProps } from './tags';
import {
  TextLength,
  TextLengthProps,
} from '../../../shared/domain/text_length';

interface Redactor {
  readonly avatarUrl?: string;
  readonly firstName: string;
  readonly lastName?: string;
  readonly profession?: string;
  readonly shortDescription?: string;
}

export interface ArticleProps {
  readonly _id?: string;
  category: CategoryProps;
  readonly contentHTML: string;
  readonly date?: Date;
  description: TextLengthProps;
  header: TextLengthProps;
  pictureUrl: UrlProps;
  readingTime: number;
  readonly redactor: Redactor;
  subtitle: TextLengthProps;
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
  header: TextLength;
  pictureUrl: Url;
  readingTime: ReadingTime;
  readonly redactor: Redactor;
  subtitle: TextLength;
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
