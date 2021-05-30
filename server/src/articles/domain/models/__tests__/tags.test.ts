import { Result } from '@app/shared/domain/result';
import { Tags } from '../tags';

describe('Tags', () => {
  it('creates Tags', () => {
    const tagsResult = Tags.create(['food']);

    expect(tagsResult).toBeInstanceOf(Result);
    expect(tagsResult.getValue()).toBeInstanceOf(Tags);

    const tags = tagsResult.getValue();

    expect(tags.value).toEqual(['food']);
  });

  describe('if created with duplicated tags', () => {
    it('returns result', () => {
      const tagsResult = Tags.create(['fish', 'frog', 'fish']);

      expect(tagsResult).toBeInstanceOf(Result);
      expect(tagsResult.errorValue()).toBe('Tags must be valid.');
      expect(() => tagsResult.getValue()).toThrowError('Tags must be valid.');
    });
  });

  describe('if created with without tags', () => {
    it('returns result', () => {
      const tagsResult = Tags.create([]);

      expect(tagsResult).toBeInstanceOf(Result);
      expect(tagsResult.getValue()).toBeInstanceOf(Tags);

      const tags = tagsResult.getValue();

      expect(tags.value).toEqual([]);
    });
  });
});
