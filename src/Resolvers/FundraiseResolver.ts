import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Fundraiser, FundraiserType } from "../entities/Fundraiser";

@Resolver()
export class FundraiserResolver {
  @Query(() => [Fundraiser])
  public async getAllFundraisers() {
    return await Fundraiser.createQueryBuilder("fund")
      .leftJoinAndSelect("fund.creator", "creator")
      .leftJoinAndSelect("fund.Organisation", "org")
      .leftJoinAndSelect("fund.address", "addr")
      .leftJoinAndSelect("fund.contributors", "contributors")
      .leftJoinAndSelect("contributors.user", "users")
      .getMany();
  }

  @Mutation(() => Fundraiser)
  async createFundraiser(
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("creator") creator: string,
    // @Arg("interests") interests: [string],
    // @Arg("tags") tags: [string],
    @Arg("lancels") lancels: number,
    @Arg("link") link: string,
    @Arg("amount") amount: number,
    @Arg("start_date") start_date: Date,
    @Arg("end_date") end_date: Date,
    @Arg("type") type: FundraiserType,
    @Arg("funds_usage") funds_usage: string,
    @Arg("about_me") about_me: string
  ) {
    return await Fundraiser.create({
      name,
      description,
      userId: creator,
      interests: [],
      tags: [],
      lancels,
      link,
      amount,
      start_date: start_date.toISOString().slice(0, 19).replace("T", " "),
      end_date: end_date.toISOString().slice(0, 19).replace("T", " "),
      type,
      funds_usage,
      about_me,
    }).save();
  }
}
