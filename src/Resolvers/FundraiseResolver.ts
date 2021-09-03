import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Fundraiser, FundraiserType } from "../entities/Fundraiser";
import { Address } from "../entities/Address";

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

  @Query(() => [Fundraiser])
  public async getAllFundraiserContributions(
    @Arg("fundraiserId") fundraiserId: string
  ) {
    return await Fundraiser.createQueryBuilder("fund")
      .leftJoinAndSelect("fund.contributors", "contributors")
      .leftJoinAndSelect("contributors.user", "users")
      .where("fund.FId = :fundraiserId", { fundraiserId })
      .getMany();
  }

  @Mutation(() => Fundraiser)
  async createFundraiser(
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("creator") creator: string,
    // @Arg("interests") interests: string[],
    // @Arg("tags") tags: string[] = [],
    @Arg("lancels") lancels: number,
    @Arg("link") link: string,
    @Arg("amount") amount: number,
    @Arg("start_date") start_date: string,
    @Arg("end_date") end_date: string,
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
      start_date: new Date(start_date)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      end_date: new Date(end_date).toISOString().slice(0, 19).replace("T", " "),
      type,
      funds_usage,
      about_me,
    }).save();
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
    @Arg("Fid") fundraiserId: string
  ) {
    try {
      const fundraiser = await Fundraiser.findOne({ where: { fundraiserId } });

      if (!fundraiser) {
        return [
          {
            path: "fundraiser",
            message: "fundraiser Not Found!",
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

      fundraiser.address = address;
      await fundraiser.save();
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
}
