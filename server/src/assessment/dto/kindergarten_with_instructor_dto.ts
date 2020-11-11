import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { KindergartenDTO } from '../../kindergartens/dto/kindergarten_dto';
import { UserDTO } from '../../users/dto/user_dto';
import { KindergartenProps } from '../../kindergartens/domain/models/kindergarten_model';
import { UserProps } from '../../users/domain/models/user_model';

@ObjectType()
export class KindergartenWithInstructorDTO {
  @Field(() => KindergartenDTO)
  kindergarten: KindergartenProps;

  @Field(() => UserDTO, { nullable: true })
  instructor: UserProps;
}
