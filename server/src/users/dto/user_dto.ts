import { ObjectType, Field, ID } from '@nestjs/graphql';
import { NotificationDTO } from '../../notifications/dto/notification.dto';
import { ChildDTO } from './children_dto';

@ObjectType()
export class UserDTO {
  @Field(() => ID)
  _id: string;

  @Field()
  readonly date: Date;

  @Field()
  readonly mail: string;

  @Field()
  readonly role: string;

  @Field(() => [NotificationDTO], { nullable: true })
  readonly notifications: NotificationDTO[];

  @Field(() => [ChildDTO], { nullable: true })
  readonly children: ChildDTO[];
}
