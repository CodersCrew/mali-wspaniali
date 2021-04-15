import {
  Child,
  ChildProps,
  NotCreatedChildProps,
} from '../../models/child_model';
import { ChildMapper } from '../child_mapper';
describe('ChildMapper', () => {
  describe('#toDomain', () => {
    it('creates domain from not persisted data', () => {
      const childData: NotCreatedChildProps = {
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
      expect(child.id.isEmpty()).toBe(true);
      expect(child.results[0].toString()).toBe('result-id-1');
    });

    it('creates domain from persisted data', () => {
      const childData: ChildProps = {
        _id: 'my-id',
        firstname: 'my-name',
        lastname: 'my-lastname',
        sex: 'male',
        birthYear: 2010,
        birthQuarter: 3,
        isDeleted: false,
        kindergarten: 'my-kindergarten',
        date: new Date(),
        results: ['result-id-1', 'result-id-2'],
      };
      const child = ChildMapper.toDomain(childData);

      expect(child).toBeInstanceOf(Child);
      expect(child.id.isEmpty()).toBe(false);
      expect(child.results[0].toString()).toBe('result-id-1');
    });
  });

  describe('#toPersistance', () => {
    it('creates data without _id', () => {
      const childData: NotCreatedChildProps = {
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

      const parsedChildData: NotCreatedChildProps = ChildMapper.toPersistence(
        child,
      );

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
      const childData: ChildProps = {
        _id: 'my-id',
        firstname: 'my-name',
        lastname: 'my-lastname',
        sex: 'male',
        birthYear: 2010,
        birthQuarter: 3,
        isDeleted: false,
        kindergarten: 'my-kindergarten',
        date: creationDate,
        results: ['result-id-1', 'result-id-2'],
      };
      const child = ChildMapper.toDomain(childData);

      const parsedChildData: NotCreatedChildProps = ChildMapper.toPersistence(
        child,
      );

      expect(parsedChildData).toEqual(
        jasmine.objectContaining({
          _id: 'my-id',
          firstname: 'my-name',
          lastname: 'my-lastname',
          sex: 'male',
          birthYear: 2010,
          birthQuarter: 3,
          isDeleted: false,
          kindergarten: 'my-kindergarten',
          date: creationDate,
          results: ['result-id-1', 'result-id-2'],
        }),
      );
    });
  });
});
