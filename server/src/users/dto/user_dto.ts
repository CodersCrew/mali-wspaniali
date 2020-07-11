import { ObjectType, Field, ID } from '@nestjs/graphql';
import { NotificationDTO } from '../../notifications/dto/notification.dto';

@ObjectType()
export class UserDTO {
  @Field(() => ID)
  id: string;

  @Field()
  readonly date: Date;

  @Field()
  readonly mail: string;

  @Field()
  readonly role: string;

  @Field(() => [NotificationDTO], { nullable: true })
  readonly notifications: NotificationDTO[];
}
