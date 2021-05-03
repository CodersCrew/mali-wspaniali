import { Result } from '@app/shared/domain/result';
import { Category } from '@articles/domain/models/category';

describe('Category', () => {
  it('creates Category', () => {
    const categoryResult = Category.create('food');

    expect(categoryResult).toBeInstanceOf(Result);
    expect(categoryResult.getValue()).toBeInstanceOf(Category);

    const category = categoryResult.getValue();

    expect(category.value).toBe('food');
  });

  describe('if created with invalid category', () => {
    it('returns result', () => {
      const categoryResult = Category.create('fish');

      expect(categoryResult).toBeInstanceOf(Result);
      expect(categoryResult.errorValue()).toBe('Category must be valid.');
      expect(() => categoryResult.getValue()).toThrowError(
        'Category must be valid.',
      );
    });
  });
});
