import { User } from "../entities/User";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import bcyrpt from "bcrypt";
import { getUniqueUsername } from "../helper/usernameHelper";
import { FundraiserContributors } from "../entities/FundraiserContribution";
import { Fundraiser } from "../entities/Fundraiser";
@Resolver()
export class UserResolver {
  @Query(() => [User])
  public async getAllUsers() {
    return await User.createQueryBuilder("user")
      .leftJoinAndSelect("user.fundraisers", "fundraiser")
      .getMany();
  }

  @Mutation(() => User)
  public async createUser(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    let userEmail = await User.findOne({ where: { email } });
    if (userEmail) {
      return [
        {
          path: "email",
          message: "Eamil already Taken",
        },
      ];
    } else {
      let hashPassword = await bcyrpt.hash(password, 10);
      let username: string;
      let uniqueName = await getUniqueUsername();
      if (!uniqueName) {
        return [
          {
            path: "username",
            message: "Username Not unique!",
          },
        ];
      } else {
        username = uniqueName;
      }
      const user = await User.create({
        name,
        email,
        password: hashPassword,
        username,
        interests: [],
      }).save();
      return user;
    }
  }

  @Mutation(() => FundraiserContributors)
  public async ContributeToFundraiser(
    @Arg("Fid") Fid: string,
    @Arg("user") contributor: string,
    @Arg("amount") amount: number
  ) {
    try {
      const fundraiser = await Fundraiser.findOne(Fid);
      const user = await User.findOne(contributor);
      if (!fundraiser) {
        return [
          {
            path: "fundraiser",
            message: "No fundraiser found",
          },
        ];
      }
      if (!user) {
        return [
          {
            path: "user",
            message: "No user found",
          },
        ];
      }

      const newContribution = await FundraiserContributors.create({
        fundraiserId: Fid,
        userId: contributor,
        amount,
      }).save();

      fundraiser.raised_amount += amount;
      await fundraiser.save();

      // user.contributedFundraiser.push(newContribution);
      user.lancels += fundraiser.lancels;
      await user.save();

      return newContribution;
    } catch (err) {
      return [
        {
          path: "error",
          message: err,
        },
      ];
    }
  }
}
