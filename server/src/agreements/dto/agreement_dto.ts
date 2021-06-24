import { ObjectType, Field } from '@nestjs/graphql';
import { FieldCore } from '../../shared/utils/field_core';

@ObjectType()
export class AgreementDTO extends FieldCore {
  @Field()
  text: string;

  @Field()
  isSigned: boolean;
}
