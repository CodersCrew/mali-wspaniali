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

export class Article extends AggregateRoot {
  private props: ArticleInnerProps;

  private constructor(props: ArticleInnerProps) {
    super();

    const {
      pictureUrl,
      videoUrl,
      description,
      header,
      subtitle,
      title,
      readingTime,
      tags,
      ...otherProps
    } = props;

    this.props.pictureUrl = Url.create(pictureUrl).getValue().value;
    this.props.videoUrl = Url.create(videoUrl).getValue().value;
    this.props.description = TextLength.create(
      description,
      'description',
      300,
      30,
    ).getValue().value;
    this.props.header = TextLength.create(
      header,
      'header',
      200,
      20,
    ).getValue().value;
    this.props.subtitle = TextLength.create(
      subtitle,
      'subtitle',
      100,
      10,
    ).getValue().value;
    this.props.title = TextLength.create(
      title,
      'title',
      100,
      10,
    ).getValue().value;
    this.props.readingTime = ReadingTime.create(readingTime).getValue().value;
    this.props.tags = Tags.create(tags).getValue().value;

    this.props = { ...this.props, ...otherProps };
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
