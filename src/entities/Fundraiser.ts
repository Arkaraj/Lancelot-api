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
} from "typeorm";
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

// const FundraiserSchema: Schema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       minLength: [2, "Name should be atleast 2 character long"],
//       maxLength: [64, "Name cannot be greater than 64 characters"],
//     },
//     description: {
//       type: String,
//       required: true,
//       maxLength: [1000, "Name cannot be greater than 1000 characters"],
//     },
//     creator: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//     co_hosts: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//     // Not required
//     location: {
//       type: {
//         type: String,
//         enum: ["Point"],
//       },
//       coordinates: {
//         type: [Number],
//       },
//     },
//     address: {
//       country: {
//         type: String,
//         required: false,
//       },
//       state: {
//         type: String,
//         required: false,
//       },
//       city: {
//         type: String,
//         required: false,
//       },
//       locality: {
//         type: String,
//       },
//     },
//     images: [
//       {
//         type: String,
//       },
//     ],
//     type: {
//       type: String,
//       enum: [
//         "Environment",
//         "Community",
//         "Animal causes",
//         "Travel campaigns",
//         "Local businesses",
//         "Startups",
//         "Education",
//         "Women Empowerment",
//         "Creative projects",
//         "Personal",
//         "Other",
//       ],
//     },
//     lancels: {
//       type: Number,
//       min: 0,
//       default: 0,
//     },
//     verified: {
//       type: Boolean,
//       default: false,
//     },
//     link: {
//       instagram: {
//         type: String,
//         default: undefined,
//       },
//       facebook: {
//         type: String,
//         default: undefined,
//       },
//       linkedIn: {
//         type: String,
//         default: undefined,
//       },
//       twitter: {
//         type: String,
//         default: undefined,
//       },
//     },
//     contributors: [
//       {
//         user_id: { type: Schema.Types.ObjectId, ref: "User" },
//         name: String,
//         username: String,
//         profile_pic: String,
//         created_on: { type: Date, default: Date.now },
//       },
//     ],
//     tags: [
//       {
//         type: String,
//         default: [],
//       },
//     ],
//     organisations: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Organisation",
//         default: [],
//       },
//     ],
//     amount: {
//       type: Number,
//     },
//     raised_amount: {
//       type: Number,
//       default: 0,
//     },
//     start_date: {
//       type: Date,
//     },
//     end_date: {
//       type: Date,
//       min: Date.now,
//     },
//     featured: {
//       type: Boolean,
//       default: false,
//     },
//     // how funds will be used
//     funds_usage: {
//       type: String,
//     },
//     about_me: {
//       type: String,
//     },
//     //why people should contribute
//     contribution_reasons: {
//       type: String,
//     },
//   },
//   {
//     minimize: true,
//     timestamps: {
//       createdAt: "created_at",
//       updatedAt: "updated_at",
//     },
//   }
// );

// FundraiserSchema.index({ location: "2dsphere" });

// export default model<IFundraiser>("Fundraiser", FundraiserSchema);

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
  userid: string;
  @Field(() => User)
  @ManyToOne(() => User, (usr) => usr.following_fundraisers)
  creator: User;
}
