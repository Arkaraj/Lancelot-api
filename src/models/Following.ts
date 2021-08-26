import { Schema, model } from "mongoose";
import { userType } from "../Types/types";

export interface IFollowing extends Document {
  _id: String;
  user_details: string;
  followers: userType[];
  following: userType[];
}

const FollowSchema = new Schema(
  {
    user_details: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    followers: [
      {
        name: { type: String },
        username: { type: String },
        user_id: { type: Schema.Types.ObjectId, ref: "User" },
        profile_pic: { type: String },
        created_on: { type: Date },
      },
    ],
    following: [
      {
        name: { type: String },
        username: { type: String },
        user_id: { type: Schema.Types.ObjectId, ref: "User" },
        profile_pic: { type: String },
        created_on: { type: Date },
      },
    ],
  },
  { toJSON: { virtuals: true } }
);

export default model<IFollowing>("Follow", FollowSchema);
