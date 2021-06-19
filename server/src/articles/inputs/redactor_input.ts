import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RedactorInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  avatarUrl?: string;

  @Field({ nullable: true })
  profession?: string;

  @Field({ nullable: true })
  biography?: string;

  @Field({ nullable: true })
  shortDescription?: string;
}
