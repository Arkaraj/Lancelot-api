import User from "../models/User";

export const resolvers = {
  Query: {
    users: async () => await User.find(),
    userById: async (userId: any) => await User.findById(userId),
  },
  Mutation: {
    createUser: async (
      _o: any,
      { name, password }: { name: String; password: String }
    ) => {
      const user = new User({ name, password });
      await user.save();
      return user;
    },
  },
};
