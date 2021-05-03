import { ValueObject, Props } from '../../../shared/domain/value_object';
import { Result } from '../../../shared/domain/result';

export type TagsProps = string[];

export type TagsValue = Props<TagsProps>;

export class Tags extends ValueObject<TagsProps> {
  private constructor(props: TagsValue) {
    super(props);
  }

  public static create(tags: string[]): Result<Tags> {
    if (validIfTagsAreUnique(tags)) {
      return Result.fail('Tags must be valid.');
    } else {
      return Result.ok(new Tags({ value: tags }));
    }
  }
}

function validIfTagsAreUnique(tags: string[]) {
  return new Set(tags).size !== tags.length;
}
