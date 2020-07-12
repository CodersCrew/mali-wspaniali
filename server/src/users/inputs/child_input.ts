import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ChildInput {
  @Field()
  readonly firstname: string;
}
