export const REGISTER_USER = 'REGISTER_USER';


export function registerUser(userData: object) {
  return { type: REGISTER_USER, userData };
}

