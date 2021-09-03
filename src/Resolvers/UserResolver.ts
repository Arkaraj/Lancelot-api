import { User } from "../entities/User";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import bcyrpt from "bcrypt";
import { getUniqueUsername } from "../helper/usernameHelper";
import { FundraiserContributors } from "../entities/FundraiserContribution";
import { Fundraiser } from "../entities/Fundraiser";
import { Address } from "../entities/Address";
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

  // Address
  @Mutation(() => Address)
  public async AddAddress(
    @Arg("city") city: string,
    @Arg("state") state: string,
    @Arg("Country") Country: string,
    @Arg("location") location: string,
    @Arg("pincode") pincode: string,
    @Arg("phone") phone: string,
    @Arg("phoneCountryCode", { nullable: true }) phoneCountryCode: string,
    @Arg("userId") userId: string
  ) {
    try {
      const user = await User.findOne({ where: { userId } });

      if (!user) {
        return [
          {
            path: "user",
            message: "User Not Found!",
          },
        ];
      }

      const address = await Address.create({
        city,
        state,
        Country,
        location,
        pincode,
        phoneCountryCode,
        phone,
      }).save();

      user.address = address;
      await user.save();
      return address;
    } catch (err) {
      return [
        {
          path: "Server",
          message: "Internal Server Error",
        },
      ];
    }
  }

  // Update users

  @Mutation(() => User)
  public async AddBio(@Arg("bio") bio: string, @Arg("userId") userId: string) {
    let user = await User.findOne({ where: { userId } });
    if (!user) {
      return [
        {
          path: "user",
          message: "User Not Found!",
        },
      ];
    }
    user.bio = bio;
    await user.save();
    return user;
  }

  @Mutation(() => User)
  public async AddInterests(
    @Arg("interests", (_type) => [String]) interests: string[],
    @Arg("userId") userId: string
  ) {
    let user = await User.findOne({ where: { userId } });
    if (!user) {
      return [
        {
          path: "user",
          message: "User Not Found!",
        },
      ];
    }
    user.interests = interests;
    await user.save();
    return user;
  }

  @Mutation(() => User)
  public async AddLink(
    @Arg("link") social_link: string,
    @Arg("userId") userId: string
  ) {
    let user = await User.findOne({ where: { userId } });
    if (!user) {
      return [
        {
          path: "user",
          message: "User Not Found!",
        },
      ];
    }
    user.social_link = social_link;
    await user.save();
    return user;
  }
}
