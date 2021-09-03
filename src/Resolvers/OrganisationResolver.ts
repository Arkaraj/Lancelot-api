import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Organisation } from "../entities/Organisation";
import { nanoid } from "nanoid";
import { Address } from "../entities/Address";

@Resolver()
export class OrganisationResolver {
  @Query(() => [Organisation])
  public async getAllOrganisations() {
    return await Organisation.createQueryBuilder("org")
      .leftJoinAndSelect("org.creator", "creator")
      .leftJoinAndSelect("org.fundraisers", "fundraiser")
      .leftJoinAndSelect("org.address", "addr")
      .getMany();
  }

  @Mutation(() => Organisation)
  async createOrganisation(
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("creator") creator: string,
    // @Arg("interests") interests: string[],
    @Arg("link") social_links: string
  ) {
    return await Organisation.create({
      name,
      description,
      interests: [],
      userid: creator,
      social_links,
      code: nanoid(6),
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
    @Arg("OrgId") OrgId: string
  ) {
    try {
      const organisation = await Organisation.findOne({ where: { OrgId } });

      if (!organisation) {
        return [
          {
            path: "Organisation",
            message: "Organisation Not Found!",
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

      organisation.address = address;
      await organisation.save();
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
