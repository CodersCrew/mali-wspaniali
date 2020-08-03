import { loginUser, LoginInput } from '../graphql/userRepository';

export function login(user: LoginInput) {
    return loginUser(user);
}
