import { ObjectType, Field, ID } from '@nestjs/graphql';
import { NotificationDTO } from '../../notifications/dto/notification_dto';
import { ChildDTO } from './children_dto';
import { AgreementDTO } from '../../agreements/dto/agreement_dto';

@ObjectType()
export class UserDTO {
  @Field(() => ID)
  _id: string;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly mail: string;

  @Field()
  readonly role: string;

  @Field(() => [NotificationDTO], { nullable: true })
  readonly notifications: string[];

  @Field(() => [ChildDTO], { nullable: true })
  readonly children: string[];

  @Field(() => [AgreementDTO])
  readonly agreements: string[];
}
