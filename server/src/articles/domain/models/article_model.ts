import { AggregateRoot } from '@nestjs/cqrs';
import { Expose, Transform } from 'class-transformer';
import {
  Length,
  IsUrl,
  IsOptional,
  IsIn,
  ValidateNested,
} from 'class-validator';
import { transformAndValidateSync } from 'class-transformer-validator';

import { ArticleCreatedEvent, ArticleUpdatedEvent } from '../events/impl';
import { Redactor } from './redactor';
import { UpdateArticleInput } from '../../inputs/article_input';
import { ValueOrNull } from '../../../shared/utils/value_or_null';
import { ArticleMapper } from '../mappers/article_mapper';
import { CoreModel } from '../../../shared/utils/core_model';
import { ICoreModel } from '../../../shared/utils/core_model';

export class ArticleCore extends CoreModel {
  @Expose()
  @Length(10, 100)
  title: string;

  @Expose()
  @Length(30, 300)
  description: string;

  @Expose()
  contentHTML: string;

  @Expose()
  @IsIn(['food', 'activity', 'emotions', 'other'])
  category: string;

  @Expose()
  tags: string[];

  @Expose()
  @IsOptional()
  @ValueOrNull()
  videoUrl: string | null;

  @Expose()
  @IsUrl()
  pictureUrl: string;

  @Expose()
  @ValidateNested()
  redactor: Redactor;

  @Expose()
  @Transform(value => value ?? false)
  isDeleted: boolean;

  @Expose()
  @Transform(value => value ?? false)
  isPublished: boolean;

  @Expose()
  @Transform(value => value ?? null)
  publishedAt: Date | null;
}

export class Article extends AggregateRoot
  implements ICoreModel<Article, ArticleCore> {
  private constructor(private props: ArticleCore) {
    super();
  }

  get id(): string | undefined {
    return this.props._id;
  }

  get title(): string {
    return this.props.title;
  }

  get category(): string {
    return this.props.category;
  }

  get contentHTML(): string {
    return this.props.contentHTML;
  }

  get description(): string {
    return this.props.description;
  }

  get pictureUrl(): string {
    return this.props.pictureUrl;
  }

  get videoUrl(): string | null {
    return this.props.videoUrl;
  }

  get redactor(): Redactor {
    return this.props.redactor;
  }

  get tags(): string[] {
    return this.props.tags;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  get isPublished(): boolean {
    return this.props.isPublished;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get modifiedAt(): Date | null {
    return this.props.modifiedAt;
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt;
  }

  get publishedAt(): Date | null {
    return this.props.publishedAt;
  }

  getProps(): ArticleCore {
    return this.props;
  }

  update(updates: Partial<UpdateArticleInput>) {
    const { extendedUpdate, props } = updateArticle(this, updates);

    this.props = props;

    this.apply(new ArticleUpdatedEvent(this.id, extendedUpdate));
  }

  static create(props: ArticleCore): Article {
    const article = new Article(props);

    article.apply(new ArticleCreatedEvent(article.id, article.getProps()));

    return article;
  }

  static recreate(props: ArticleCore): Article {
    return new Article(props);
  }
}

function updateArticle(article: Article, updates: Partial<UpdateArticleInput>) {
  const articleProps = ArticleMapper.toPlain(article);

  updatedReadOnlyFields(updates);

  const extendedUpdate = createExtendedUpdate(updates);

  return {
    props: transformAndValidateSync(
      ArticleCore,
      {
        ...articleProps,
        ...extendedUpdate,
      },
      { validator: { validationError: { target: false, value: false } } },
    ),
    extendedUpdate,
  };
}

function updatedReadOnlyFields(updates: Partial<UpdateArticleInput>) {
  if (
    Object.keys(updates).find(k =>
      ['createdAt', 'deletedAt', 'modifiedAt', 'publishedAt'].includes(k),
    )
  ) {
    throw new Error('Readonly fields cannot be modified');
  }
}

function createExtendedUpdate(values: Partial<UpdateArticleInput>) {
  let options: { [key: string]: unknown } = values;

  if (values.isDeleted) {
    options = {
      ...options,
      deletedAt: new Date(),
    };
  }

  if (values.isPublished) {
    options = {
      ...options,
      publishedAt: new Date(),
    };
  }

  if (!values.isDeleted || !values.isPublished) {
    options = {
      ...options,
      modifiedAt: new Date(),
    };
  }

  return options;
}
