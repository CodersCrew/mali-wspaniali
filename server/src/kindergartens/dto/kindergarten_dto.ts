import { ObjectType, Field, Int } from '@nestjs/graphql';

import { FieldCore } from '../../shared/utils/field_core';

@ObjectType()
export class KindergartenDTO extends FieldCore {
  @Field(() => Int)
  number: number;

  @Field()
  name: string;

  @Field()
  city: string;

  @Field()
  address: string;

  @Field()
  isDeleted: boolean;

  @Field()
  createdAt: Date;

  @Field()
  modifiedAt: Date;

  @Field()
  deletedAt: Date;
}
