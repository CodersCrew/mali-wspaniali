import { Child, ChildCore } from '../../models/child_model';
import { ChildMapper } from '../child_mapper';

describe('ChildMapper', () => {
  describe('#toDomain', () => {
    it('creates domain from not persisted data', () => {
      const childData = {
        firstname: 'my-name',
        lastname: 'my-lastname',
        sex: 'male',
        birthYear: 2010,
        birthQuarter: 3,
        isDeleted: false,
        kindergarten: 'my-kindergarten',
        results: ['result-id-1', 'result-id-2'],
      };
      const child = ChildMapper.toDomain(childData);

      expect(child).toBeInstanceOf(Child);
      expect(typeof child.id).toBe('string');
      expect(child.results[0]).toBe('result-id-1');
    });

    it('creates domain from persisted data', () => {
      const childData: ChildCore = {
        _id: 'my-id',
        firstname: 'my-name',
        lastname: 'my-lastname',
        sex: 'male',
        birthYear: 2010,
        birthQuarter: 3,
        isDeleted: false,
        kindergarten: 'my-kindergarten',
        createdAt: new Date(),
        results: ['result-id-1', 'result-id-2'],
      };
      const child = ChildMapper.toDomain(childData);

      expect(child).toBeInstanceOf(Child);
      expect(child.id).toBe('my-id');
      expect(child.results[0]).toBe('result-id-1');
    });
  });

  describe('#toPlain', () => {
    it('creates data without _id', () => {
      const childData = {
        firstname: 'my-name',
        lastname: 'my-lastname',
        sex: 'male',
        birthYear: 2010,
        birthQuarter: 3,
        isDeleted: false,
        kindergarten: 'my-kindergarten',
        results: ['result-id-1', 'result-id-2'],
      };
      const child = ChildMapper.toDomain(childData);

      const parsedChildData = ChildMapper.toPlain(child);

      expect(parsedChildData).toEqual(
        jasmine.objectContaining({
          firstname: 'my-name',
          lastname: 'my-lastname',
          sex: 'male',
          birthYear: 2010,
          birthQuarter: 3,
          isDeleted: false,
          kindergarten: 'my-kindergarten',
          results: ['result-id-1', 'result-id-2'],
        }),
      );

      expect(Object.keys(parsedChildData)).not.toEqual(
        jasmine.arrayContaining(['_id', 'date']),
      );
    });

    it('creates data with _id', () => {
      const creationDate = new Date();
      const childData = {
        _id: 'my-id',
        firstname: 'my-name',
        lastname: 'my-lastname',
        sex: 'male',
        birthYear: 2010,
        birthQuarter: 3,
        isDeleted: false,
        kindergarten: 'my-kindergarten',
        createdAt: creationDate,
        results: ['result-id-1', 'result-id-2'],
      };
      const child = ChildMapper.toDomain(childData);

      const parsedChildData = ChildMapper.toPlain(child);

      expect(parsedChildData).toEqual({
        _id: 'my-id',
        firstname: 'my-name',
        lastname: 'my-lastname',
        sex: 'male',
        birthYear: 2010,
        birthQuarter: 3,
        isDeleted: false,
        kindergarten: 'my-kindergarten',
        results: ['result-id-1', 'result-id-2'],
        createdAt: creationDate,
        deletedAt: null,
        modifiedAt: null,
      });
    });
  });
});
