import { model, Schema, Document, Types } from "mongoose";
import { regexStrings } from "../config/regexHelper";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, "Name should be atleast 2 character long"],
    maxLength: [64, "Name cannot be greater than 64 characters"],
    match: [regexStrings.name, "name does not match required pattern"],
  },
});

export default model<IUser>("User", UserSchema);
