import { ApolloError } from "apollo-server";

class ApolloErrorNotFound extends ApolloError {
  constructor(message: string) {
    super(message, "404");

    Object.defineProperty(this, "name", { value: "MyError" });
  }
}

export { ApolloErrorNotFound };
