import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Address } from "./Address";
import { Fundraiser } from "./Fundraiser";
import { FundraiserContributors } from "./FundraiserContribution";
import { ImageSchema } from "./ImageSchema";
import { Organisation } from "./Organisation";

export interface IUser {
  userId: string;
  name: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  profile_pic: string;
  interests: string[];
  organisations: string[];
  following_fundraisers: string[];
  phone: {
    country_code: string;
    number: string;
  };
  address: {
    country: string;
    state: string;
    city: string;
    locality: string;
  };
  location: { type: any[]; coordinates: number[] };
  lancels: number;
  level: number;
  social_links: any;
  created_at: Date;
  updated_at: Date;
}

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  userId: string;

  @Field()
  @Column("varchar")
  name: string;

  @Field()
  @Column("varchar", { unique: true })
  username: string;

  @Field()
  @Column("text")
  bio: string;

  // phone
  // address, location
  @Field(() => Address)
  @OneToOne(() => Address, (addr) => addr.Addressid)
  @JoinColumn()
  address: Address;

  @Field(() => ImageSchema)
  @OneToOne(() => ImageSchema, (img) => img.Imgid)
  @JoinColumn()
  profile_pic: ImageSchema;

  @Field()
  @Column("float", { default: 0 })
  lancels: number;

  @Field()
  @Column("float", { default: 1 })
  level: number;

  @Field()
  @Column("varchar", { unique: true })
  email: string;

  @Field()
  @Column("varchar")
  password: string;

  @Field()
  @Column("varchar")
  social_link: string;

  @Field(() => [Fundraiser])
  @OneToMany(() => Fundraiser, (f) => f.creator)
  fundraisers: Fundraiser[];

  @Field(() => [String])
  @Column("simple-array")
  interests: string[];

  @Field(() => [Organisation])
  @OneToMany(() => Organisation, (org) => org.creator)
  organisations: [];

  @Field(() => [FundraiserContributors])
  @OneToMany(() => FundraiserContributors, (fc) => fc.user)
  contributedFundraiser: FundraiserContributors[];
}
