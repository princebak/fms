"use server";

import Subscription from "@/models/Subscription";
import { subscriptionStatus } from "@/utils/constants";
import { dbConnector } from "@/utils/dbConnector";
import {
  dbObjectToJsObject,
  isTheSubscriptionValid,
} from "@/utils/myFunctions";

export async function createSubscription(subscription: ISubscription) {
  try {
    await dbConnector();

    const newSubscription = new Subscription(subscription);
    const res = await newSubscription.save();

    return dbObjectToJsObject(res);
  } catch (error: any) {
    console.log("Error >>", error);
    return { error: error.message };
  }
}

export async function activeSubscription(id: string) {
  try {
    await dbConnector();
    console.log("Id >>", id);

    let res = await Subscription.findById(id);

    if (res.status === subscriptionStatus.PAID) {
      res = await Subscription.findByIdAndUpdate(
        id,
        {
          status: subscriptionStatus.ACTIVE,
        },
        { new: true }
      ).populate("owner");
    }

    return dbObjectToJsObject(res._doc);
  } catch (error: any) {
    console.log("Error >>", error);
    return { error: error.message };
  }
}

export async function renewSubscription(id: string, days: number) {
  try {
    await dbConnector();

    console.log("newExpiredDate >>", days);
    const millisecondsToAdd = days * 24 * 60 * 60 * 1000;

    let lastActiveSubscription = await Subscription.findById(id);
    const newExpiredDate: Date =
      lastActiveSubscription.expireAt.getTime() + millisecondsToAdd;

    if (lastActiveSubscription.status === subscriptionStatus.ACTIVE) {
      lastActiveSubscription = await Subscription.findByIdAndUpdate(
        id,
        {
          expireAt: newExpiredDate,
        },
        { new: true }
      ).populate("owner");
    } else {
      return { error: "To renew the subscription, it must be active." };
    }

    return dbObjectToJsObject(lastActiveSubscription._doc);
  } catch (error: any) {
    console.log("Error >>", error);
    return { error: error.message };
  }
}

export async function getUserLastActiveSubscription(userId: string) {
  try {
    await dbConnector();
    console.log("userId >>", userId);

    let existingActiveSubscription = await Subscription.findOne({
      owner: userId,
      status: subscriptionStatus.ACTIVE,
    });

    if (!existingActiveSubscription) {
      return null;
    }

    if (!isTheSubscriptionValid(existingActiveSubscription)) {
      const updatedSubscription = await Subscription.findByIdAndUpdate(
        existingActiveSubscription._id,
        {
          status: subscriptionStatus.EXPIRED,
        },
        { new: true }
      );
      return dbObjectToJsObject(updatedSubscription._doc);
    }

    return dbObjectToJsObject(existingActiveSubscription._doc);
  } catch (error: any) {
    console.log("Error >>", error);
    return { error: error.message };
  }
}
