import { InputType, Field, PickType } from '@nestjs/graphql';

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

@InputType()
export class UpdatedUserInput {
  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;
}
