import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { UserProps } from '../../users/domain/models/user_model';
import { UserDTO } from '../../users/dto/user_dto';

@ObjectType()
export class KindergartenWithUsersDTO {
  @Field(() => ID)
  _id: string;

  @Field()
  readonly date: Date;

  @Field(() => Int)
  readonly number: number;

  @Field()
  readonly name: string;

  @Field()
  readonly city: string;

  @Field()
  readonly address: string;

  @Field(() => [UserDTO])
  readonly users: UserProps;
}
