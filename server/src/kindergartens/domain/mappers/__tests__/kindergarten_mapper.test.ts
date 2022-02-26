import { KindergartenInput } from '@app/kindergartens/inputs/kindergarten_input';
import { KindergartenMapper } from '../kindergarten_mapper';
import { Kindergarten } from '../../models/kindergarten_model';
describe('KindergartenMapper', () => {
  describe('#toDomain', () => {
    it('creates domain from not persisted data', () => {
      const kindergartenData: KindergartenInput = {
        number: 5,
        name: 'rainbow',
        city: 'wroclaw',
        address: 'somewhere',
      };
      const kindergarten = KindergartenMapper.toDomainFrom(kindergartenData);

      expect(kindergarten).toBeInstanceOf(Kindergarten);
      expect(kindergarten.address).toBe('somewhere');
      expect(kindergarten.name).toBe('rainbow');
      expect(kindergarten.city).toBe('wroclaw');
      expect(kindergarten.number).toBe(5);
      expect(kindergarten.isDeleted).toBe(false);
    });

    it('creates domain from persisted data', () => {
      const creationDate = new Date();

      const kindergartenData = {
        _id: 'my-id',
        number: 5,
        name: 'rainbow',
        city: 'wroclaw',
        address: 'somewhere',
        createdAt: creationDate,
        isDeleted: false,
      };
      const kindergarten = KindergartenMapper.toDomainFrom(kindergartenData);

      expect(kindergarten).toBeInstanceOf(Kindergarten);
      expect(typeof kindergarten.id).toBe('string');
      expect(kindergarten.address).toBe('somewhere');
      expect(kindergarten.name).toBe('rainbow');
      expect(kindergarten.city).toBe('wroclaw');
      expect(kindergarten.number).toBe(5);
      expect(kindergarten.isDeleted).toBe(false);
      expect(kindergarten.createdAt).toEqual(creationDate);
    });
  });

  describe('#toPlain', () => {
    it('creates data without _id', () => {
      const kindergartenData: KindergartenInput = {
        number: 5,
        name: 'rainbow',
        city: 'wroclaw',
        address: 'somewhere',
      };
      const kindergarten = KindergartenMapper.toDomainFrom(kindergartenData);

      const parsedChildData: KindergartenInput = KindergartenMapper.toPlain(
        kindergarten,
      );

      expect(parsedChildData).toEqual(
        jasmine.objectContaining({
          number: 5,
          name: 'rainbow',
          city: 'wroclaw',
          address: 'somewhere',
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
        number: 5,
        name: 'rainbow',
        city: 'wroclaw',
        address: 'somewhere',
        createdAt: creationDate,
        isDeleted: false,
      };
      const child = KindergartenMapper.toDomainFrom(childData);

      const parsedChildData: KindergartenInput = KindergartenMapper.toPlain(
        child,
      );

      expect(parsedChildData).toEqual(
        jasmine.objectContaining({
          _id: 'my-id',
          number: 5,
          name: 'rainbow',
          city: 'wroclaw',
          address: 'somewhere',
          createdAt: creationDate,
          isDeleted: false,
        }),
      );
    });
  });
});
