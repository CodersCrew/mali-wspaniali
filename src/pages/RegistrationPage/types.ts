export type RegistrationUser = {
  email: string;
  password: string;
};

export type RegistrationState = {
  user: RegistrationUser;
  apiCallsInProgress: number;
};

export type AppState = {
  registrationState: RegistrationState;
}

