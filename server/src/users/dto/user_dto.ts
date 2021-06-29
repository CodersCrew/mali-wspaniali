import { ObjectType, Field } from '@nestjs/graphql';
import { ChildDTO } from './child_dto';
import { AgreementDTO } from '../../agreements/dto/agreement_dto';
import { FieldCore } from '../../shared/utils/field_core';

@ObjectType()
export class UserDTO extends FieldCore {
  @Field({ nullable: true })
  firstname: string;

  @Field({ nullable: true })
  lastname: string;

  @Field()
  mail: string;

  @Field()
  role: string;

  @Field(() => [ChildDTO], { nullable: true })
  children: string[];

  @Field(() => [AgreementDTO])
  agreements: string[];
}
