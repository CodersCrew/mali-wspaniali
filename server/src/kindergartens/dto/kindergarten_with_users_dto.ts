import { ObjectType, Field, Int } from '@nestjs/graphql';

import { UserDTO } from '../../users/dto/user_dto';
import { UserCore } from '../../users/domain/models/user_model';
import { FieldCore } from '../../shared/utils/field_core';

@ObjectType()
export class KindergartenWithUsersDTO extends FieldCore {
  @Field(() => Int)
  number: number;

  @Field()
  name: string;

  @Field()
  city: string;

  @Field()
  address: string;

  @Field(() => [UserDTO])
  users: UserCore;
}
