import { StatusPostTC } from "../../models";

export const createOneStatus = StatusPostTC.getResolver(
  "createOne"
).wrapResolve((next) => async (req) => {
  if (!req.context?.user) throw new Error("Unauthorize");
  const {
    context: { user },
    args,
  } = req;
  return next({
    ...req,
    args: {
      record: {
        ...args.record,
        postById: user?._id,
      },
    },
  });
}); // manual wrap authorization
