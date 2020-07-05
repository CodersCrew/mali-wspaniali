import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class KeyCodeInput {
  @Field()
  readonly createdBy: string;

  @Field()
  readonly keyCode: string;
}
