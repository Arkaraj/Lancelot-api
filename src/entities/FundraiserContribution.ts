import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
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
  @JoinColumn({ name: "userId" })
  @ManyToOne(() => User, (usr) => usr.contributedFundraiser)
  user: User;

  @Field(() => Fundraiser)
  @JoinColumn({ name: "fundraiserId" })
  @ManyToOne(() => Fundraiser, (cmt) => cmt.contributors)
  fundraiser: Fundraiser;

  @Field()
  @Column("float")
  amount: number;
}
