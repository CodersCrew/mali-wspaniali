import { loginUser, LoginInput } from '../graphql/userRepository';

export function login(user: LoginInput) {
    return loginUser(user).then(({ data }) => {
        if (!data) return;

        const {
            login: { token },
        } = data;

        localStorage.setItem('token', token);
    });
}
