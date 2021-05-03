import { AggregateRoot } from '@nestjs/cqrs';

import { ArticleCreatedEvent, ArticleUpdatedEvent } from '../events/impl';
import { Category, CategoryProps } from './category';
import { UrlProps, Url } from '../../../shared/domain/url';
import { Tags, TagsProps } from './tags';
import { Redactor, RedactorProps } from './redactor';
import { ArticleInput } from '../../inputs/article_input';
import { ArticleMapper } from '../mappers/article_mapper';
import {
  TextLength,
  TextLengthProps,
} from '../../../shared/domain/text_length';

export interface ArticleProps {
  _id?: string;
  category: CategoryProps;
  contentHTML: string;
  date?: Date;
  description: TextLengthProps;
  pictureUrl: UrlProps;
  redactor: RedactorProps;
  tags: TagsProps;
  title: TextLengthProps;
  videoUrl?: UrlProps;
}

export interface ArticleInnerProps {
  _id?: string;
  category: Category;
  contentHTML: string;
  date?: Date;
  description: TextLength;
  pictureUrl: Url;
  redactor: Redactor;
  tags: Tags;
  title: TextLength;
  videoUrl?: Url;
}

export type ArticleBeforeSaveProps = Omit<ArticleProps, '_id'>;

export class Article extends AggregateRoot {
  private constructor(private props: ArticleInnerProps) {
    super();
  }

  get id(): string | undefined {
    return this.props._id;
  }

  get title(): TextLength {
    return this.props.title;
  }

  get category(): Category {
    return this.props.category;
  }

  get contentHTML(): string {
    return this.props.contentHTML;
  }

  get date(): Date {
    return this.props.date;
  }

  get description(): TextLength {
    return this.props.description;
  }

  get pictureUrl(): Url {
    return this.props.pictureUrl;
  }

  get videoUrl(): Url {
    return this.props.videoUrl;
  }

  get redactor(): Redactor {
    return this.props.redactor;
  }

  get tags(): Tags {
    return this.props.tags;
  }

  update(updates: Partial<ArticleInput>) {
    this.props = updateArticle(this, updates);

    this.apply(new ArticleUpdatedEvent(this.id, updates));
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
}

function updateArticle(article: Article, updates: Partial<ArticleInput>) {
  const articleProps = ArticleMapper.toRaw(article);

  const updatedArticleProps: ArticleProps = { ...articleProps, ...updates };

  return ArticleMapper.toDomain(updatedArticleProps).getProps();
}
