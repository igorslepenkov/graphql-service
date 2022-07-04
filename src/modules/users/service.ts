import { RESTDataSource } from "apollo-datasource-rest";
import { JWT, LoginInput } from "../jwt/types";

class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://localhost:${process.env.USERS_PORT}`;
  }

  async getUserById(id: string) {
    const user = await this.get(`/v1/users/${id}`);
    return user;
  }

  async createNewUser(userData: {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
  }) {
    const user = await this.post(`/v1/users/register`, userData);

    return user;
  }

  async logInUser(loginInput: LoginInput): Promise<JWT> {
    const response = await this.post(`/v1/users/login`, loginInput);
    return response;
  }
}

export { UsersAPI };
