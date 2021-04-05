import { RedactorMapper } from '../redactor_mapper';
import { Redactor } from '../../models/redactor';
import { Result } from '@app/shared/domain/result';

describe('RedactorMapper', () => {
  describe('#doDomain', () => {
    describe('with minimal input', () => {
      it('creates domain', () => {
        const redactorResult = RedactorMapper.toDomain({
          firstName: 'Alice',
          lastName: 'Smith',
        });

        expect(redactorResult).toBeInstanceOf(Result);
        expect(redactorResult.isSuccess).toBe(true);

        const redactor = redactorResult.getValue();

        expect(redactor).toBeInstanceOf(Redactor);
        expect(redactor.firstName.value).toBe('Alice');
        expect(redactor.lastName.value).toBe('Smith');
      });
    });

    describe('with complete input', () => {
      it('creates domain', () => {
        const redactorResult = RedactorMapper.toDomain({
          firstName: 'Alice',
          lastName: 'Smith',
          avatarUrl: 'http://my-link.com/me.png',
          biography: 'about-me',
          profession: 'my-profession',
          shortDescription: 'my-description',
        });

        expect(redactorResult).toBeInstanceOf(Result);
        expect(redactorResult.isSuccess).toBe(true);

        const redactor = redactorResult.getValue();

        expect(redactor).toBeInstanceOf(Redactor);
        expect(redactor.firstName.value).toBe('Alice');
        expect(redactor.lastName.value).toBe('Smith');
        expect(redactor.avatarUrl.value).toBe('http://my-link.com/me.png');
        expect(redactor.biography).toBe('about-me');
        expect(redactor.profession).toBe('my-profession');
        expect(redactor.shortDescription).toBe('my-description');
      });
    });

    describe('with invalid input', () => {
      it('creates error result', () => {
        const redactorResult = RedactorMapper.toDomain({
          firstName: 'Alice',
          lastName: 'Smith',
          avatarUrl: 'invalid-url',
        });

        expect(redactorResult).toBeInstanceOf(Result);
        expect(redactorResult.isSuccess).toBe(false);
        expect(redactorResult.error).toBe('"Redactor" props should be valid');
      });
    });
  });

  describe('#toPersistence', () => {
    describe('with minimal redactor props', () => {
      it('creates persistence DTO', () => {
        const redactor = RedactorMapper.toDomain({
          firstName: 'Alice',
          lastName: 'Smith',
        }).getValue();

        const redactorDto = RedactorMapper.toPersistence(redactor);

        expect(redactorDto).toEqual({
          firstName: 'Alice',
          lastName: 'Smith',
        });
      });
    });

    describe('with complete redactor props', () => {
      it('creates persistence DTO', () => {
        const redactor = RedactorMapper.toDomain({
          firstName: 'Alice',
          lastName: 'Smith',
          avatarUrl: 'http://my-link.com/me.png',
          biography: 'about-me',
          profession: 'my-profession',
          shortDescription: 'my-description',
        }).getValue();

        const redactorDto = RedactorMapper.toPersistence(redactor);

        expect(redactorDto).toEqual({
          firstName: 'Alice',
          lastName: 'Smith',
          avatarUrl: 'http://my-link.com/me.png',
          biography: 'about-me',
          profession: 'my-profession',
          shortDescription: 'my-description',
        });
      });
    });
  });
});
