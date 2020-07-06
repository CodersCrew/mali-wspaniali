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
  category: CategoryProps;
  readonly contentHTML: string;
  readonly date: Date;
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
  constructor(private readonly props: ArticleProps) {
    super();

    this.props.category = Category.create(props.category).getValue().value;
    this.props.pictureUrl = Url.create(props.pictureUrl).getValue().value;
    this.props.videoUrl = Url.create(props.videoUrl).getValue().value;
    this.props.description = TextLength.create(
      props.description,
      'description',
      300,
      30,
    ).getValue().value;
    this.props.header = TextLength.create(
      props.header,
      'header',
      200,
      20,
    ).getValue().value;
    this.props.subtitle = TextLength.create(
      props.subtitle,
      'subtitle',
      100,
      10,
    ).getValue().value;
    this.props.title = TextLength.create(
      props.title,
      'title',
      100,
      10,
    ).getValue().value;
    this.props.readingTime = ReadingTime.create(
      props.readingTime,
    ).getValue().value;
    this.props.tags = Tags.create(props.tags).getValue().value;
  }

  sendNotifications(users: string): void {
    this.apply(new ArticleCreatedEvent(this.id, users));
  }

  getProps(): ArticleProps {
    return this.props;
  }

  get id(): string {
    return this.props._id;
  }
}
