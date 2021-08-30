import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Organisation } from "../entities/Organisation";

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
      code: "xYHz-nanoid",
    }).save();
  }
}
