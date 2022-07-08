import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserPagination {
  @Field({ nullable: true })
  kindergartenId?: string;

  @Field({ nullable: true })
  role?: string;

  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  page?: string;

  @Field({ nullable: true })
  isConfirmed?: boolean;
}
