import { AggregateRoot } from '@nestjs/cqrs';

// import { ArticleCreatedEvent } from '../events/impl/article_created_event';
// import { Category, CategoryProps } from './category';
// import { ReadingTime } from './reading_time';
// import { UrlProps, Url } from '../../../shared/domain/url';
// import { Tags, TagsProps } from './tags';
// import {
//   TextLength,
//   TextLengthProps,
// } from '../../../shared/domain/text_length';

export interface KindergartenProps {
  readonly _id?: string;
  readonly city: string;
  readonly number: string;
  readonly name: string;
}

export class Kindergarten extends AggregateRoot {
  private constructor(private readonly props: KindergartenProps) {
    super();

    // this.props.city =
  }

  //     this.props.category = Category.create(props.category).getValue().value;
  //     this.props.pictureUrl = Url.create(props.pictureUrl).getValue().value;
  //     this.props.videoUrl = Url.create(props.videoUrl).getValue().value;
  //     this.props.description = TextLength.create(
  //       props.description,
  //       'description',
  //       300,
  //       30,
  //     ).getValue().value;
  //     this.props.header = TextLength.create(
  //       props.header,
  //       'header',
  //       200,
  //       20,
  //     ).getValue().value;
  //     this.props.subtitle = TextLength.create(
  //       props.subtitle,
  //       'subtitle',
  //       100,
  //       10,
  //     ).getValue().value;
  //     this.props.title = TextLength.create(
  //       props.title,
  //       'title',
  //       100,
  //       10,
  //     ).getValue().value;
  //     this.props.readingTime = ReadingTime.create(
  //       props.readingTime,
  //     ).getValue().value;
  //     this.props.tags = Tags.create(props.tags).getValue().value;
  //   }

  //   static create(props: ArticleProps): Article {
  //     const article = new Article(props);

  //     article.apply(new ArticleCreatedEvent(article.id));

  //     return article;
  //   }

  //   static recreate(props: ArticleProps): Article {
  //     return new Article(props);
  //   }

  getProps(): KindergartenProps {
    return this.props;
  }

  get id(): string {
    return this.props._id;
  }
}
