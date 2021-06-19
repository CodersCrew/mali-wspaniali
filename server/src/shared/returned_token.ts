import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ReturnedTokenDTO {
  @Field()
  token: string;
}
