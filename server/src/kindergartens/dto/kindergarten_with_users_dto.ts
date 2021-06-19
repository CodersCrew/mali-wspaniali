import { ObjectType, Field, Int } from '@nestjs/graphql';

import { UserDTO } from '../../users/dto/user_dto';
import { CoreModelDto } from '../../shared/utils/core_dto';
import { UserCore } from '../../users/domain/models/user_model';

@ObjectType()
export class KindergartenWithUsersDTO extends CoreModelDto {
  @Field(() => Int)
  readonly number: number;

  @Field()
  readonly name: string;

  @Field()
  readonly city: string;

  @Field()
  readonly address: string;

  @Field(() => [UserDTO])
  readonly users: UserCore;
}
