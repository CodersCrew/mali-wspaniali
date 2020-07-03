import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RedactorInput {
  @Field({ nullable: true })
  readonly avatarUrl: string;

  @Field()
  readonly firstName: string;

  @Field({ nullable: true })
  readonly lastName: string;

  @Field({ nullable: true })
  readonly profession: string;

  @Field({ nullable: true })
  readonly biography: string;
}
