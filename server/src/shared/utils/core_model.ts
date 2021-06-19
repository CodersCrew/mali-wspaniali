import { Expose, Transform } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

import { ValueOrNull } from './value_or_null';

export class CoreModel {
  @Expose()
  @Transform(value => value ?? uuidv4())
  _id?: string;

  @Expose()
  @Transform(value => value ?? false)
  isDeleted?: boolean;

  @Expose()
  @Transform(value => value ?? new Date())
  createdAt?: Date;

  @Expose()
  @ValueOrNull()
  deletedAt?: Date | null;

  @Expose()
  @ValueOrNull()
  modifiedAt?: Date | null;
}
