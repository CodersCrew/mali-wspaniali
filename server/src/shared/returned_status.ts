import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ReturnedStatusDTO {
  @Field()
  status: boolean;
}
