import { JWTValidationResponseType, LoginFormType } from 'src/types/types';

export const LoginForm: LoginFormType = {
  email: 'johnDoe@elpicoteo.com',
  password: '92johnDOE4ever',
};

export const exampleToken: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicGFzc3dvcmQiOiJIZWxsbywgdGhlcmUgOkQiLCJpYXQiOjE1MTYyMzkwMjJ9.0iw4GfknY4GUQPQNxGwQtiCRKEo2oNSqHYcDW5gK0po';

export const validationRes: JWTValidationResponseType = {
  data: {
    name: 'John',
    second_name: 'Doe',
    email: 'johnDoe@mail.com',
  },
  status: true,
};
