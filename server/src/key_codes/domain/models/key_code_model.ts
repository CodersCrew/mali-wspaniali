import { Expose, Transform } from 'class-transformer';
import { IsIn } from 'class-validator';
import ShortUniqueId from 'short-unique-id';
import { CoreModel } from '@app/shared/utils/core_model';

const uuid = new ShortUniqueId({
  dictionary: [...'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'],
});

export class KeyCodeCore extends CoreModel {
  @Expose()
  createdBy: string;

  @Expose()
  @Transform(value => value ?? uuid.randomUUID(10))
  keyCode?: string;

  @Expose()
  @Transform(value => value ?? uuid.randomUUID(10))
  series?: string;

  @Expose()
  @IsIn(['parent', 'instructor'])
  target: string;
}

export class KeyCode {
  private constructor(private props: KeyCodeCore) {}

  get keyCode(): string {
    return this.props.keyCode;
  }

  get target(): string {
    return this.props.target;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  getProps(): KeyCodeCore {
    return this.props;
  }

  static create(props: KeyCodeCore): KeyCode {
    return new KeyCode(props);
  }
}
