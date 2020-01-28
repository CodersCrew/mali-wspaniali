export type RegistrationUser = {
  email: string;
  password: string;
};

export type RegistrationState = RegistrationUser;

export type AppState = {
  registrationState: RegistrationState;
}

