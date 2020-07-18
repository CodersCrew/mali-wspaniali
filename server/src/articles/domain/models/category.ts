import { ValueObject, Props } from '../../../shared/domain/value_object';
import { Result } from '../../../shared/domain/result';

export type CategoryProps = 'food' | 'activity' | 'emotions' | 'other';

type CategoryValue = Props<CategoryProps>;

export class Category extends ValueObject<CategoryValue> {
  private constructor(props: CategoryValue) {
    super(props);
  }

  get value(): CategoryProps {
    return this.props.value;
  }

  public static create(category: string): Result<Category> {
    if (!['food', 'activity', 'emotions', 'other'].includes(category)) {
      return Result.fail('Category must be valid.');
    } else {
      return Result.ok<Category>(
        new Category({ value: category as CategoryProps }),
      );
    }
  }
}
