import client, { authMiddleware } from "../../src/context/apollo-client";
import { gql } from "@apollo/client";
import cookie from "cookie";

const cookiesOption = {
  httpOnly: true,
  path: "/",
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 60 * 60 * 24 * 1, //60secs 60mins 24hours * TTL
};

const tokenName = "token";

const handler = async (req, res) => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation Login($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            token
          }
        }
      `,
      variables: { ...req.body },
    });
    const { token = "" } = data?.login ?? {};

    if (!token) res.send(400);
    if (token)
      res.setHeader(
        "Set-Cookie",
        cookie.serialize(tokenName, token, cookiesOption)
      );
    res.send(200);
  } catch (e) {}
};

export default handler;
