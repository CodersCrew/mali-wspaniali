import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { ChildResultDTO } from './child_result_dto';
import { KindergartenDTO } from '../../kindergartens/dto/kindergarten_dto';

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
  readonly results: string[];

  @Field(() => KindergartenDTO)
  readonly kindergarten: string;

  @Field()
  readonly isDeleted: boolean;
}
