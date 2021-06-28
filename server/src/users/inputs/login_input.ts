import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  mail: string;

  @Field()
  password: string;
}
