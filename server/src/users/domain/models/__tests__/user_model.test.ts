import * as UserEvents from '../../events/impl';
import { User, UserCore } from '../user_model';
import { UserMapper } from '../../mappers/user_mapper';

describe('UserModel', () => {
  let user: User;

  beforeEach(() => {
    user = createUser();
  });

  describe('when created with correct data', () => {
    it('returns model', () => {
      expect(user).toBeInstanceOf(User);
      expect(user.mail).toBe('my-email@email.com');
    });

    it('applies user created event', () => {
      const [createEvent] = user.getUncommittedEvents();

      expect(createEvent).toEqual(
        new UserEvents.UserCreatedEvent('my-id', 'my-keycode'),
      );
    });

    it('creates not confirmed user', () => {
      expect(user.confirmed).toBe(false);
    });
  });

  describe('#confirm', () => {
    beforeEach(() => {
      user.confirm();
    });

    it('sets user as confirmed', () => {
      expect(user.confirmed).toBe(true);
    });

    it('applies user confirmed event', () => {
      const [, updateEvent] = user.getUncommittedEvents();

      expect(updateEvent).toEqual(new UserEvents.UserConfirmedEvent('my-id'));
    });
  });

  describe('#delete', () => {
    beforeEach(() => {
      user.delete();
    });

    it('sets user as deleted and anonimized', () => {
      expect(user.isDeleted()).toBe(true);
      expect(user.mail).toBe('');
      expect(user.password).toBe('');
    });

    it('applies user updated and user anonimized event', () => {
      const [, updateEvent, deleteEvent] = user.getUncommittedEvents();

      expect(updateEvent).toEqual(
        new UserEvents.UserUpdatedEvent('my-id', {
          isDeleted: true,
          mail: '',
          password: '',
        }),
      );
      expect(deleteEvent).toEqual(new UserEvents.UserAnonymizedEvent('my-id'));
    });
  });

  describe('#signAgreement', () => {
    it('sign agreement', () => {
      expect(user.agreements.length).toBe(0);

      user.signAgreement('new-agreement');

      expect(user.agreements).toEqual(['new-agreement']);
    });

    it('applies user signed event', () => {
      user.signAgreement('new-agreement');

      const [, agreementEvent] = user.getUncommittedEvents();

      expect(agreementEvent).toEqual(
        new UserEvents.UserSignedAgreementEvent('my-id', 'new-agreement'),
      );
    });
  });

  describe('#unsignAgreement', () => {
    it('unsign agreement', () => {
      expect(user.agreements.length).toBe(0);

      user.signAgreement('new-agreement');
      user.signAgreement('new-agreement-2');
      user.signAgreement('new-agreement-3');

      expect(user.agreements).toEqual([
        'new-agreement',
        'new-agreement-2',
        'new-agreement-3',
      ]);

      user.unsignAgreement('new-agreement');

      expect(user.agreements).toEqual(['new-agreement-2', 'new-agreement-3']);
    });

    it('applies user unsigned event', () => {
      user.signAgreement('new-agreement');

      user.unsignAgreement('new-agreement');

      const [
        ,
        signedAgreementEvent,
        unSignedAgreementEvent,
      ] = user.getUncommittedEvents();

      expect(signedAgreementEvent).toEqual(
        new UserEvents.UserSignedAgreementEvent('my-id', 'new-agreement'),
      );

      expect(unSignedAgreementEvent).toEqual(
        new UserEvents.UserSignedAgreementEvent('my-id', 'new-agreement'),
      );
    });
  });
});

function createUser(user: Partial<UserCore> = {}) {
  const userProps = {
    _id: 'my-id',
    agreements: [],
    children: [],
    mail: 'my-email@email.com',
    password: '',
    role: '',
    ...user,
  };

  return UserMapper.toDomain(userProps, { keyCode: 'my-keycode' });
}
