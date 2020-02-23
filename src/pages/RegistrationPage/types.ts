export type RegistrationUser = {
  email: string;
  password: string;
};

export type RegistrationState = {
  user: RegistrationUser;
};

export type AppState = {
  registrationState: RegistrationState;
};
