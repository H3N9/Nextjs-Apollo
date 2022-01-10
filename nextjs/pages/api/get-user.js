import client from "../../src/context/apollo-client";
import { gql } from "@apollo/client";
import cookie from "cookie";

const getToken = (req) => {
  const encodeCookie = req?.headers?.cookie || "";
  return cookie.parse(encodeCookie)?.token;
};

const handler = async (req, res) => {
  try {
    const { data } = await client.query({
      query: gql`
        query UserById {
          userById(_id: "61d6d8115b57b352862be29e") {
            username
          }
        }
      `,
      context: {
        headers: {
          authorization: `Bearer ${getToken(req)}`,
        },
      },
    });

    res.status(200).json(data);
  } catch (e) {}
};

export default handler;
