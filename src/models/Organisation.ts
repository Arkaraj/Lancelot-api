import { model, Schema, Document, Types } from "mongoose";
import { userType } from "src/Types/types";
import { regexStrings } from "../config/regexHelper";

export interface IOrganisation extends Document {
  _id: Types.ObjectId;
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
  updated_at: Date;
}

const OrganisationSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [2, "Name should be atleast 2 character long"],
      maxLength: [64, "Name cannot be greater than 64 characters"],
      match: [regexStrings.name, "name does not match required pattern"],
    },
    description: {
      type: String,
      required: true,
      maxLength: [1000, "Description cannot be greater than 1000 characters"],
      match: [
        regexStrings.description,
        "description does not match required pattern",
      ],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    phone: {
      country_code: {
        type: String,
        match: [
          regexStrings.phoneCode,
          "phone code does not match required pattern",
        ],
      },
      number: {
        type: String,
        unique: true,
        match: [
          regexStrings.phoneNumber,
          "phone number does not match required pattern",
        ],
      },
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
    address: {
      country: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
      locality: {
        type: String,
      },
    },
    images: [
      {
        type: String,
      },
    ],
    social_links: {
      instagram: {
        type: String,
        default: undefined,
      },
      facebook: {
        type: String,
        default: undefined,
      },
      linkedIn: {
        type: String,
        default: undefined,
      },
      twitter: {
        type: String,
        default: undefined,
      },
    },
    fundraisers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Fundraiser",
        default: [],
      },
    ],
    members: [
      {
        user_id: { type: Schema.Types.ObjectId, ref: "User" },
        name: String,
        username: String,
        profile_pic: String,
        joined_on: { type: Date, default: Date.now },
      },
    ],
    interests: [
      {
        type: String,
        default: [],
      },
    ],
    code: { type: String, required: true },
  },
  {
    minimize: true,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

OrganisationSchema.index({ location: "2dsphere" });

export default model<IOrganisation>("Organisation", OrganisationSchema);
