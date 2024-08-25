import { fileStatus } from "@/utils/constants";
import mongoose from "mongoose";

// We are handling Folders and Files just as Files

const Schema = mongoose.Schema;

const myFileSchema = new Schema<IMyFile>(
  {
    constainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MyFile",
    },
    type: {
      type: String,
    },
    isContainer: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
    },
    contentNo: {
      type: Number,
    },
    downloadUrl: {
      type: String,
    },
    extension: {
      type: String,
    },
    visited: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
      default: fileStatus.CREATED,
    },
  },
  { timestamps: true }
);

const MyFile = mongoose.models.MyFile || mongoose.model("MyFile", myFileSchema);

export default MyFile;
