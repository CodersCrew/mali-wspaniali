import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ChildResultProps } from '../../users/domain/models/child_result_model';
import { ChildResultDTO } from './child_result_dto';

@ObjectType()
export class ChildDTO {
  @Field(() => ID)
  _id: string;

  @Field()
  readonly date: Date;

  @Field()
  readonly firstname: string;

  @Field(() => [ChildResultDTO])
  readonly results: ChildResultProps;
}
