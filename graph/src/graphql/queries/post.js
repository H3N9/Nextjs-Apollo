import { PostTC } from "../../models";

export const posts = PostTC.getResolver("findMany");
