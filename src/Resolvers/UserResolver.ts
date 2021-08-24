import User from "../models/User";

export const resolvers = {
  Query: {
    hello: () => "Lancelot",
    users: () => User.find(),
  },
  Mutation: {
    createUser: async (_o: any, { name }: { name: String }) => {
      const user = new User({ name });
      await user.save();
      return user;
    },
  },
};
