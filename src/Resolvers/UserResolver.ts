import { User } from "../entities/User";
import { Resolver, Query } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  public async getAllUsers() {
    return await User.createQueryBuilder("user")
      .leftJoinAndSelect("user.fundraisers", "fundraiser")
      .getMany();
  }
}
