import { PostTC, UserTC } from "../../models";
import moment from "moment";

PostTC.addRelation("postBy", {
  resolver: () => UserTC.getResolver("findById"),
  prepareArgs: {
    _id: (source) => source.postById,
  },
  projection: { postById: 1 },
});

PostTC.addFields({
  timestampFromNow: {
    type: "String",
    resolve: (source) => moment(source.timestamp).fromNow(),
    projection: { timestamp: 1 },
  },
});
