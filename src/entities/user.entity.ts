export class User {
  id?: number | string;
  username: string;
  password: string;
  email?: string;
  refreshToken?: string;
  createAt?: Date;
  updateAt?: Date;

  constructor(id: number, username: string, password: string, email: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
  }
}

// add 20 mock users
export const sampleUsers: User[] = Array.from({ length: 20 }, (_, i) => {
  return {
    id: i + 1,
    username: `user${i + 1}`,
    password: `password${i + 1}`,
    email: `user${i + 1}@gamil.com`,
    refreshToken: `refreshToken${i + 1}`,
    createAt: new Date(),
    updateAt: new Date(),
  };
});
