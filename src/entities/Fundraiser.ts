// import { model, Schema, Document, Types } from "mongoose";
import { userType } from "src/Types/types";
import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // OneToMany,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Address } from "./Address";
import { FundraiserContributors } from "./FundraiserContribution";
import { ImageSchema } from "./ImageSchema";
import { Organisation } from "./Organisation";
import { User } from "./User";

export interface IFundraiser {
  Fid: string;
  name: string;
  description: string;
  images: string[];
  interests: string[];
  organisations: string[];
  tags: string[];
  address: {
    country: string;
    state: string;
    city: string;
    locality: string;
  };
  location: { type: any[]; coordinates: number[] };
  creator: string;
  co_hosts: string[];
  lancels: number;
  verified: boolean;
  contributors: userType[];
  link: string;
  amount: number;
  raised_amount: number;
  start_date: Date;
  end_date: Date;
  featured: boolean;
  type:
    | "Environment"
    | "Community"
    | "Animal causes"
    | "Travel campaigns"
    | "Local businesses"
    | "Startups"
    | "Education"
    | "Women Empowerment"
    | "Creative projects"
    | "Personal"
    | "Other";
  // how funds will be used
  funds_usage: string;
  about_me: string;
  created_at: Date;
  updated_at: Date;
}

export enum FundraiserType {
  Environment = "Environment",
  Community = "Community",
  Animal_causes = "Animal causes",
  Travel_campaigns = "Travel campaigns",
  Local_businesses = "Local businesses",
  Startups = "Startups",
  Education = "Education",
  Women_Empowerment = "Women Empowerment",
  Creative_projects = "Creative projects",
  Personal = "Personal",
  Other = "Other",
}
@ObjectType()
@Entity()
export class Fundraiser extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  FId: string;

  @Field()
  @Column("varchar")
  name: string;

  @Field()
  @Column("text")
  description: string;

  @Field()
  @Column("varchar")
  userId: string;
  @Field(() => User)
  @JoinColumn({ name: "userId" })
  @ManyToOne(() => User, (usr) => usr.fundraisers)
  creator: User;

  // optional
  @Field()
  @Column("text", { nullable: true })
  orgId: string;
  @Field(() => Organisation)
  @ManyToOne(() => Organisation, (org) => org.fundraisers)
  @JoinColumn({ name: "orgId" })
  Organisation: Organisation;

  @Field(() => [String])
  @Column("simple-array")
  interests: string[];

  @Field(() => [String])
  @Column("simple-array")
  tags: string[];
  // phone
  // address, location
  @Field(() => Address)
  @OneToOne(() => Address, (addr) => addr.Addressid)
  @JoinColumn()
  address: Address;

  @Field(() => [ImageSchema])
  @OneToMany(() => ImageSchema, (img) => img.fundraiser)
  images: ImageSchema[];

  // co_hosts: string[];

  @Field()
  @Column("float", { default: 0 })
  lancels: number;

  @Field()
  @Column("boolean", { default: false })
  verified: boolean;

  @Field(() => FundraiserContributors)
  @OneToMany(() => FundraiserContributors, (fc) => fc.fundraiser)
  contributors: FundraiserContributors;

  @Field()
  @Column("varchar")
  link: string;

  @Field()
  @Column("float", { default: 0 })
  amount: number;

  @Field()
  @Column("float", { default: 0 })
  raised_amount: number;

  @Field()
  @Column("datetime", {
    default: new Date().toISOString().slice(0, 19).replace("T", " "),
  })
  start_date: Date;

  @Field()
  @Column("datetime")
  end_date: Date;

  @Field()
  @Column("boolean", { default: false })
  featured: boolean;

  @Field()
  @Column({ type: "enum", enum: FundraiserType, default: FundraiserType.Other })
  type: FundraiserType;

  // how funds will be used
  @Field()
  @Column("text")
  funds_usage: string;

  @Field()
  @Column("text")
  about_me: string;

  @Field()
  @Column("datetime", {
    default: new Date().toISOString().slice(0, 19).replace("T", " "),
  })
  created_at: Date;
}
