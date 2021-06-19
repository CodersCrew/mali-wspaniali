import { ObjectType, Field } from '@nestjs/graphql';
import { NotificationDTO } from '../../notifications/dto/notification_dto';
import { ChildDTO } from './child_dto';
import { AgreementDTO } from '../../agreements/dto/agreement_dto';
import { FieldCore } from '../../shared/utils/field_core';

@ObjectType()
export class UserDTO extends FieldCore {
  @Field()
  mail: string;

  @Field()
  role: string;

  @Field(() => [NotificationDTO], { nullable: true })
  notifications: string[];

  @Field(() => [ChildDTO], { nullable: true })
  children: string[];

  @Field(() => [AgreementDTO])
  agreements: string[];
}
