import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import bcrypt from "mongoose-bcrypt";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { type: String, require: true },
  password: { type: String, require: true, bcrypt: true },
  name: { type: String, require: true },
});

UserSchema.plugin(bcrypt);

export const UserModel = model("User", UserSchema);

export const UserTC = composeWithMongoose(UserModel).removeField("password");

export default UserModel;
