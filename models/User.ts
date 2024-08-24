import { userStatus, userType } from "@/utils/constants";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxLength: 150,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: 200,
    },
    phone: {
      type: String,
      required: true,
      maxLength: 15,
    },
    address: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      default: userType.USER,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      select: false,
    },
    profilPicUrl: { type: String },
    status: {
      type: String,
      required: true,
      default: userStatus.CREATED,
    },
  },
  { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
