import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { ChildResultProps } from '../../users/domain/models/child_result_model';
import { ChildResultDTO } from './child_result_dto';
import { KindergartenDTO } from '../../kindergartens/dto/kindergarten_dto';
import { KindergartenProps } from '../../kindergartens/domain/models/kindergarten_model';

@ObjectType()
export class ChildDTO {
  @Field(() => ID)
  _id: string;

  @Field()
  readonly date: Date;

  @Field()
  readonly firstname: string;

  @Field()
  readonly lastname: string;

  @Field(() => Int)
  readonly birthYear: number;

  @Field(() => Int)
  readonly birthQuarter: number;

  @Field()
  readonly sex: string;

  @Field(() => [ChildResultDTO])
  readonly results: ChildResultProps;

  @Field(() => KindergartenDTO)
  readonly kindergarten: KindergartenProps;
}
