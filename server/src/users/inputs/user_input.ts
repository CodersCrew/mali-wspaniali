import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  mail: string;

  @Field()
  password: string;

  @Field()
  keyCode: string;

  @Field(() => [String], { nullable: true })
  agreements?: string[];
}
