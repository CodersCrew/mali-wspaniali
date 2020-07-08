import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  readonly mail: string;

  @Field()
  readonly password: string;
}
