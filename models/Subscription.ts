import { paymentMethod, subscriptionStatus } from "@/utils/constants";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema<ISubscription>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    expireAt: {
      type: Date,
    },
    paymentMethod: {
      type: String,
      required: true,
      default: paymentMethod.CREDIT_CARD,
    },
    status: {
      type: String,
      required: true,
      default: subscriptionStatus.PAID,
    },
  },
  { timestamps: true }
);

const Subscription =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
