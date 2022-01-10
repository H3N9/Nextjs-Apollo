import monggose from "mongoose";
import { composeWithMongooseDiscriminators } from "graphql-compose-mongoose";

const { Schema } = monggose;

const ObjectId = Schema.Types.ObjectId;

const enumPostType = {
  STATUS: "StatusPost",
  //PHOTO: 'PhotoPost'
};

const typeEnum = "type";

const PostSchema = new Schema({
  timestamp: { type: Date, default: Date.now() },
  type: { type: String, enum: Object.keys(enumPostType), require: true },
  postById: { type: ObjectId, ref: "User", require: true },
});

const StatusScehma = new Schema({
  caption: { type: String, require: true },
});

PostSchema.set("discriminatorKey", typeEnum);

const options = {
  inputType: {
    removeFields: ["timestamp", "PostById"],
  },
};

export const PostModel = monggose.model("Post", PostSchema);
export const StatusModel = PostModel.discriminator(
  enumPostType.STATUS,
  StatusScehma
);

export const PostTC = composeWithMongooseDiscriminators(PostModel);
export const StatusPostTC = PostTC.discriminator(StatusModel, {
  name: enumPostType.STATUS,
  ...options,
});

export default PostModel;
