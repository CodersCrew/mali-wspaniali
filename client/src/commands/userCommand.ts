import { loginUser, LoginInput, getUser } from '../graphql/userRepository';

export function login(user: LoginInput) {
    return loginUser(user)
        .then(({ data }) => {
            if (!data) return;

            const {
                login: { token },
            } = data;

            localStorage.setItem('token', token);
        })
        .then(() => getUser().then(({ data }) => data!.me));
}
