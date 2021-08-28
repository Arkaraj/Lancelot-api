// import { model, Schema, Document, Types } from "mongoose";
import { userType } from "src/Types/types";
import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Address } from "./Address";
import { Fundraiser } from "./Fundraiser";
import { ImageSchema } from "./ImageSchema";
import { User } from "./User";

export interface IOrganisation {
  OrgId: string;
  name: string;
  descriptionn: string;
  images: string[];
  interests: string[];
  fundraisers: string[];
  creator: string;
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
  members: userType[];
  social_links: any;
  code: string;
  created_at: Date;
  // updated_at: Date;
}

@ObjectType()
@Entity()
export class Organisation extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  OrgId: string;

  @Field()
  @Column("varchar")
  name: string;

  @Field()
  @Column("text")
  description: string;

  @Field(() => [String])
  @Column("simple-array")
  interests: string[];

  @Field(() => [ImageSchema])
  @OneToMany(() => ImageSchema, (img) => img.organisation)
  images: ImageSchema[];

  @Field(() => [Fundraiser])
  @OneToMany(() => Fundraiser, (fund) => fund.Organisation)
  fundraisers: Fundraiser[];

  @Field()
  @Column("varchar")
  userid: string;
  @Field(() => User)
  @ManyToOne(() => User, (usr) => usr.organisations)
  creator: User;

  // address, location
  @Field(() => Address)
  @OneToOne(() => Address, (addr) => addr.Addressid)
  @JoinColumn()
  address: Address;

  // @Field(() => [User])
  // members: User[];

  @Field()
  @Column("varchar")
  social_links: string;

  // Default nanoid
  @Field()
  @Column("varchar")
  code: string;

  @Field()
  @Column("datetime", {
    default: new Date().toISOString().slice(0, 19).replace("T", " "),
  })
  created_at: Date;
}
