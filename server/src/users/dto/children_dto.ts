import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ChildDTO {
  @Field(() => ID)
  id: string;

  @Field()
  readonly date: Date;

  @Field()
  readonly firstname: string;
}
