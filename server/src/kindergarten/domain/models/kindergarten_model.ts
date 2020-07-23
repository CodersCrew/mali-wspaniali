// import { AggregateRoot } from '@nestjs/cqrs';

// import { ArticleCreatedEvent } from '../events/impl/article_created_event';
// import { Category, CategoryProps } from './category';
// import { ReadingTime } from './reading_time';
// import { UrlProps, Url } from '../../../shared/domain/url';
// import { Tags, TagsProps } from './tags';
// import {
//   TextLength,
//   TextLengthProps,
// } from '../../../shared/domain/text_length';

// [Entity] ? ___________________________________________________________________________________
// Po co redonly i dlaczego nie możnq wtedy umieścić ich w konstruktorze ?

export interface KindergartenProps {
  readonly _id?: string;
  readonly city: string;
  readonly number: string;
  readonly name: string;
}

export class Kindergarten {
  private constructor(private readonly props: KindergartenProps) {
    //  city: string;
    // readonly number: string;
    // readonly name: string;
  }
  // }

  getProps(): KindergartenProps {
    return this.props;
  }

  get id(): string {
    return this.props._id;
  }
}
