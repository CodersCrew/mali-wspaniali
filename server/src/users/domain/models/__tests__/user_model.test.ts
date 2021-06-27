import * as UserEvents from '../../events/impl';
import { User, UserCore } from '../user_model';
import { UserMapper } from '../../mappers/user_mapper';

jest.mock('../../events/impl');

describe('UserModel', () => {
  let user: User;

  describe('when created with correct data', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      user = createUser();
    });

    it('returns model', () => {
      expect(user).toBeInstanceOf(User);
      expect(user.mail).toBe('my-email@email.com');
    });

    it('applies user created event', () => {
      expect(UserEvents.UserCreatedEvent).toHaveBeenCalledTimes(1);
      expect(UserEvents.UserCreatedEvent).toHaveBeenCalledWith(
        'my-id',
        'my-keycode',
      );
    });

    it('creates not confirmed user', () => {
      expect(user.confirmed).toBe(false);
    });
  });

  describe('#confirm', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      user = createUser();
      user.confirm();
    });

    it('sets user as confirmed', () => {
      expect(user.confirmed).toBe(true);
    });

    it('applies user confirmed event', () => {
      expect(UserEvents.UserConfirmedEvent).toHaveBeenCalledTimes(1);
      expect(UserEvents.UserConfirmedEvent).toHaveBeenCalledWith('my-id');
    });
  });

  describe('#delete', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      user = createUser();
      user.delete();
    });

    it('sets user as deleted and anonimized', () => {
      expect(user.isDeleted()).toBe(true);
      expect(user.mail).toBe('');
      expect(user.password).toBe('');
    });

    it('applies user updated and user anonimized event', () => {
      expect(UserEvents.UserUpdatedEvent).toHaveBeenCalledTimes(1);
      expect(UserEvents.UserUpdatedEvent).toHaveBeenCalledWith('my-id', {
        isDeleted: true,
        mail: '',
        password: '',
      });
      expect(UserEvents.UserAnonymizedEvent).toHaveBeenCalledTimes(1);
      expect(UserEvents.UserAnonymizedEvent).toHaveBeenCalledWith(user.id);
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
