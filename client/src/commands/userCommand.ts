import { loginUser } from '../graphql/userRepository';

export interface LoginInput {
    mail: string;
    password: string;
}

export function login(user: LoginInput) {
    return loginUser(user);
}
