import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RedactorInput {
  @Field()
  readonly firstName: string;

  @Field()
  readonly lastName: string;

  @Field({ nullable: true })
  readonly avatarUrl?: string;

  @Field({ nullable: true })
  readonly profession?: string;

  @Field({ nullable: true })
  readonly biography?: string;

  @Field({ nullable: true })
  readonly shortDescription?: string;
}
