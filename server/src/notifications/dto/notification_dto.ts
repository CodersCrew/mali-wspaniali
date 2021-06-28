import { ObjectType, Field } from '@nestjs/graphql';
import { FieldCore } from '../../shared/utils/field_core';

@ObjectType()
export class NotificationDTO extends FieldCore {
  @Field()
  user: string;

  @Field()
  templateId: string;

  @Field(() => [String])
  values: string[];

  @Field()
  isRead: boolean;
}
