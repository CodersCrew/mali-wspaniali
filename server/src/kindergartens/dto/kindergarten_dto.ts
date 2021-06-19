import { ObjectType, Field, Int } from '@nestjs/graphql';

import { CoreModelDto } from '../../shared/utils/core_dto';

@ObjectType()
export class KindergartenDTO extends CoreModelDto {
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
