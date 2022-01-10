import { schemaComposer } from "graphql-compose";
import { UserModel, UserTC } from "../../models";

export const userById = UserTC.getResolver("findById");

export const me = schemaComposer.createResolver({
  name: "me",
  type: UserTC.getType(),
  resolve: async ({ context }) => {
    if (!context.user) throw new Error("Unauthorize");
    const myAcc = await UserModel.findById(context.user?._id);
    return myAcc;
  },
});
