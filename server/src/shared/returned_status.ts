import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ReturnedStatusDTO {
  @Field()
  readonly status: boolean;
}
