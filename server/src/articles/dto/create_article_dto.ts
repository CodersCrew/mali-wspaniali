import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { CreateRedactorDTO } from './create_redactor_dto';

@ObjectType()
export class CreateArticleDTO {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  readonly category: string;

  @Field()
  readonly contentHTML: string;

  @Field()
  readonly date: Date;

  @Field()
  readonly description: string;

  @Field()
  readonly header: string;

  @Field()
  readonly pictureUrl: string;

  @Field(() => Int)
  readonly readingTime: number;

  @Field()
  readonly redactor: CreateRedactorDTO;

  @Field()
  readonly subtitle: string;

  @Field(() => [String])
  tags: string[];

  @Field()
  readonly title: string;

  @Field({ nullable: true })
  readonly videoUrl?: string;
}
