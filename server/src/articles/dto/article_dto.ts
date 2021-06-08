import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { RedactorDTO } from './redactor_dto';

@ObjectType()
export class ArticleDTO {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  readonly category: string;

  @Field()
  readonly contentHTML: string;

  @Field()
  readonly description: string;

  @Field()
  readonly pictureUrl: string;

  @Field()
  readonly redactor: RedactorDTO;

  @Field(() => [String])
  tags: string[];

  @Field()
  readonly title: string;

  @Field({ nullable: true })
  readonly isDeleted?: boolean;

  @Field({ nullable: true })
  readonly isPublished?: boolean;

  @Field({ nullable: true })
  readonly videoUrl?: string;

  @Field({ nullable: true })
  readonly createdAt: Date;

  @Field({ nullable: true })
  readonly deletedAt: Date;

  @Field({ nullable: true })
  readonly modifiedAt: Date;

  @Field({ nullable: true })
  readonly publishedAt: Date;
}
