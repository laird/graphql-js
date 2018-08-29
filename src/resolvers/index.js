const Query = require("./Query");
const Mutation = require("./Mutation");
const User = require("./User");
const Link = require("./Link");
const Vote = require("./Vote");

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
  Vote
};

module.exports = resolvers