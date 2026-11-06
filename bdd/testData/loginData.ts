export type LoginCredentials = {
  username: string;
  password: string;
};

export const loginTestData = {
  validUser: {
    username: 'Admin',
    password: 'admin123',
  },
  invalidUser: {
    username: 'invalid-user',
    password: 'wrong-password',
  },
  missingUsername: {
    username: '',
    password: 'admin123',
  },
  missingPassword: {
    username: 'Admin',
    password: '',
  },
} satisfies Record<string, LoginCredentials>;
