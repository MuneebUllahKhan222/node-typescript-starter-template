
export type signUpPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
};

export type loginPayload = {
  email: string;
  password: string;
};