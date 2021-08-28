import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Fundraiser } from "./Fundraiser";

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
  @Column("varchar")
  username: string;

  @Field()
  @Column("text")
  bio: string;

  // phone: {
  //   country_code: {
  //     type: String,
  //     match: [
  //       regexStrings.phoneCode,
  //       "phone code does not match required pattern",
  //     ],
  //   },
  //   number: {
  //     type: String,
  //     unique: true,
  //     match: [
  //       regexStrings.phoneNumber,
  //       "phone number does not match required pattern",
  //     ],
  //   },
  // },
  // location: {
  //   type: {
  //     type: String,
  //     enum: ["Point"],
  //   },
  //   coordinates: {
  //     type: [Number],
  //   },
  // },
  // address: {
  //   country: {
  //     type: String,
  //     required: false,
  //   },
  //   state: {
  //     type: String,
  //     required: false,
  //   },
  //   city: {
  //     type: String,
  //     required: false,
  //   },
  //   locality: {
  //     type: String,
  //   },
  // },

  @Field()
  @Column("varchar")
  profile_pic: string;

  @Field()
  @Column({ default: 0 })
  lancels: number;

  @Field()
  @Column({ default: 1 })
  level: number;

  @Field()
  @Column("varchar")
  email: string;

  @Field()
  @Column("varchar")
  password: string;

  @Field()
  @Column("varchar")
  social_link: string;

  @Field(() => [Fundraiser])
  @OneToMany(() => Fundraiser, (f) => f.creator)
  following_fundraisers: [];

  interests: string[];

  // organisations: [];
}
