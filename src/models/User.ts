import { model, Schema, Document, Types } from "mongoose";
import { regexStrings } from "../config/regexHelper";

export interface IUser extends Document {
  _id: Types.ObjectId;
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

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [2, "Name should be atleast 2 character long"],
      maxLength: [64, "Name cannot be greater than 64 characters"],
      match: [regexStrings.name, "name does not match required pattern"],
    },
    username: {
      type: String,
      unique: true,
      minLength: [3, "username should be atleast 3 character long"],
      maxLength: [32, "username cannot be greater than 32 characters"],
      match: [
        regexStrings.username,
        "username does not match required pattern",
      ],
    },
    bio: {
      type: String,
      required: false,
      maxLength: [200, "Name cannot be greater than 200 characters"],
      match: [regexStrings.description, "bio does not match required pattern"],
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
    profile_pic: {
      type: String,
    },
    lancels: {
      type: Number,
      min: 0,
      default: 0,
    },
    level: {
      type: Number,
      min: 1,
      max: 100,
      default: 1,
    },
    email: {
      type: String,
      unique: true,
      minLength: [3, "email should be atleast 3 character long"],
      maxLength: [320, "email cannot be greater than 320 characters"],
      match: [regexStrings.email, "email does not match required pattern"],
    },
    password: {
      type: String,
      required: true,
    },
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
    following_fundraisers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Fundraiser",
        default: [],
      },
    ],
    interests: [
      {
        type: String,
        default: [],
      },
    ],
    organisations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Organisation",
        default: [],
      },
    ],
  },
  {
    minimize: true,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

UserSchema.index({ location: "2dsphere" });

export default model<IUser>("User", UserSchema);
