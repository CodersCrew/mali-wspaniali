import * as UserEvents from '../../events/impl';
import { User, UserProps } from '../user_model';

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
});

function createUser(user: Partial<UserProps> = {}) {
  const userProps: UserProps = {
    _id: 'my-id',
    agreements: [],
    children: [],
    date: new Date(),
    mail: 'my-email@email.com',
    notifications: [],
    password: '',
    role: '',
    confirmed: false,
    deleted: false,
    ...user,
  };

  return User.create(userProps, 'my-keycode');
}
