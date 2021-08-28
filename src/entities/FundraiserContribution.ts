import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Fundraiser } from "./Fundraiser";
import { User } from "./User";

// Many to Many types

@ObjectType()
@Entity()
export class FundraiserContributors extends BaseEntity {
  @Field()
  @PrimaryColumn()
  fundraiserId: string;

  @Field()
  @PrimaryColumn()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, (usr) => usr.contributedFundraiser)
  @JoinColumn({ name: "userId" })
  user: User;

  @Field(() => Fundraiser)
  @ManyToOne(() => Fundraiser, (cmt) => cmt.contributors)
  @JoinColumn({ name: "fundraiserId" })
  fundraiser: Fundraiser;
}
