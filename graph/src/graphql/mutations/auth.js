import { schemaComposer } from "graphql-compose";
import { UserModel, UserTC } from "../../models";
import { UserInputError } from "apollo-server-express";
import jsonwebtoken from "jsonwebtoken";

const LoginPlayload = schemaComposer.createObjectTC({
  name: "LoginPlayload",
  fields: {
    token: "String",
    user: UserTC.getType(),
  },
});

const loginInput = schemaComposer.createInputTC({
  name: "LoginInput",
  fields: {},
});

export const login = schemaComposer.createResolver({
  name: "login",
  args: {
    username: "String!",
    password: "String!",
  },
  type: LoginPlayload,
  resolve: async ({ args }) => {
    const { username, password } = args;
    const user = await UserModel.findOne({ username });
    if (!user) throw new UserInputError(`Username ${username} not found`);
    const valid = await user.verifyPassword(password);

    if (!valid) throw new UserInputError("Username or Password not valid");
    return {
      token: jsonwebtoken.sign({ _id: user._id }, "h3n9", {
        expiresIn: "1d",
        algorithm: "HS256",
      }),
      user,
    };
  },
});
