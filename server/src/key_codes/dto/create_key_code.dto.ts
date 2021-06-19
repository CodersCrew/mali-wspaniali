import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class CreateKeyCodeDTO {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

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
