import { ObjectType, Field } from '@nestjs/graphql';
import { KindergartenDTO } from '../../kindergartens/dto/kindergarten_dto';
import { UserDTO } from '../../users/dto/user_dto';
import { KindergartenCore } from '../../kindergartens/domain/models/kindergarten_model';
import { UserCore } from '../../users/domain/models/user_model';

@ObjectType()
export class KindergartenWithInstructorDTO {
  @Field(() => KindergartenDTO, { nullable: true })
  kindergarten: KindergartenCore;

  @Field(() => UserDTO, { nullable: true })
  instructor: UserCore;
}
