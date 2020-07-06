import { ValueObject, Props } from '../../../shared/domain/value_object';
import { Result } from '../../../shared/domain/result';

export type TagsProps = string[];

export type TagsValue = Props<TagsProps>;

export class Tags extends ValueObject<TagsValue> {
  private constructor(props: TagsValue) {
    super(props);
  }

  get value(): TagsProps {
    return this.props.value;
  }

  public static create(tags: string[]) {
    if (new Set(tags).size !== tags.length) {
      return Result.fail<TagsValue>('Tags must be valid.');
    } else {
      return Result.ok<TagsValue>(new Tags({ value: tags }));
    }
  }
}
