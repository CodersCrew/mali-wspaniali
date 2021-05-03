import { InputType, Field } from '@nestjs/graphql';
import { RedactorProps } from '../../articles/domain/models/redactor';

@InputType()
export class RedactorInput implements RedactorProps {
  @Field()
  readonly firstName: string;

  @Field()
  readonly lastName: string;

  @Field({ nullable: true })
  readonly avatarUrl?: string;

  @Field({ nullable: true })
  readonly profession?: string;

  @Field({ nullable: true })
  readonly biography?: string;

  @Field({ nullable: true })
  readonly shortDescription?: string;
}
