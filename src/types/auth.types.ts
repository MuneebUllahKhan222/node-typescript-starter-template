
export type signUpPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
};

export type loginPayload = {
  email: string;
  password: string;
};

export type encodedToken = {
  id: string;
  role: string;
  email: string;
}