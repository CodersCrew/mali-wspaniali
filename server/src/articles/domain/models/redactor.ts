import { Expose } from 'class-transformer';

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
