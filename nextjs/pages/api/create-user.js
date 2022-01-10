import client from "../../src/context/apollo-client";
import { gql } from "@apollo/client";

const handler = async (req, res) => {
  try {
    console.log(req.body);
    const { data } = await client.mutate({
      mutation: gql`
        mutation CreateOneUser($record: CreateOneUserInput!) {
          createOneUser(record: $record) {
            record {
              name
            }
          }
        }
      `,
      variables: {
        record: {
          ...req.body,
        },
      },
    });

    res.status(200).json(data);
  } catch (e) {}
};

export default handler;
