import * as QueryFields from "./queries";
import * as MutationFields from "./mutations";
import { schemaComposer } from "graphql-compose";
import "./relations";

schemaComposer.Query.addFields(QueryFields);
schemaComposer.Mutation.addFields(MutationFields);

const GQLbuild = schemaComposer.buildSchema();

export default GQLbuild;
