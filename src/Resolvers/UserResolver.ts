import { User } from "../entities/User";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import bcyrpt from "bcrypt";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  public async getAllUsers() {
    return await User.createQueryBuilder("user")
      .leftJoinAndSelect("user.fundraisers", "fundraiser")
      .getMany();
  }

  @Mutation(() => User)
  async createUser(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    let userEmail = await User.findOne({ where: { email } });
    if (userEmail) {
      return "User Email  Already Exsists!";
    } else {
      let hashPassword = await bcyrpt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashPassword,
        username: "Donator123", // some nanoid
        interests: [],
      }).save();
      return user;
    }
  }
}
