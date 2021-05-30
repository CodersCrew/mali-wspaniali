import { Expose } from 'class-transformer';
import { Url } from '../../../shared/domain/url';
import { Firstname, Lastname } from '../../../users/domain/models';

export interface RedactorProps {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  profession?: string;
  shortDescription?: string;
  biography?: string;
}

export interface RedactorInnerProps {
  firstName: Firstname;
  lastName: Lastname;
  avatarUrl?: Url;
  profession?: string;
  shortDescription?: string;
  biography?: string;
}

export class Redactor {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  avatarUrl?: string;

  @Expose()
  profession?: string;

  @Expose()
  shortDescription?: string;

  @Expose()
  biography?: string;
}
