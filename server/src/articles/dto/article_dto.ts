import { ObjectType, Field } from '@nestjs/graphql';
import { RedactorDTO } from './redactor_dto';
import { FieldCore } from '../../shared/utils/field_core';

@ObjectType()
export class ArticleDTO extends FieldCore {
  @Field(() => String)
  category: string;

  @Field()
  contentHTML: string;

  @Field()
  description: string;

  @Field()
  pictureUrl: string;

  @Field()
  redactor: RedactorDTO;

  @Field()
  title: string;

  @Field({ nullable: true })
  isPublished?: boolean;

  @Field({ nullable: true })
  videoUrl?: string;

  @Field({ nullable: true })
  publishedAt: Date;
}
