import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreateRedactorDTO {
  @Field({ nullable: true })
  avatarUrl?: string;

  @Field()
  firstName: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  profession?: string;

  @Field({ nullable: true })
  biography?: string;
}
