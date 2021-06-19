import { ObjectType, Field } from '@nestjs/graphql';
import { FieldCore } from '../../shared/utils/field_core';

@ObjectType()
export class CreateKeyCodeDTO extends FieldCore {
  @Field()
  createdBy: string;

  @Field()
  keyCode: string;

  @Field()
  series: string;

  @Field()
  target: string;
}

@ObjectType()
export class KeyCodeSeriesDTO extends CreateKeyCodeDTO {
  @Field()
  count: string;
}
