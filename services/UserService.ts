"use server";

import bcrypt, { compare } from "bcrypt";
import User from "@/models/User";
import { dbConnector } from "@/utils/dbConnector";
import {
  emailMetadata,
  logMessage,
  userStatus,
  userTokenStatus,
} from "@/utils/constants";
import { sendEmailWithEmailJs } from "./NotificationService";
import AccessToken from "@/models/AccessToken";
import {
  areAllFieldsValid,
  dbObjectToJsObject,
  isTheUserTokenValid,
} from "@/utils/myFunctions";
import { redirect } from "next/navigation";
import { error } from "console";

type RegisterPayload = {
  email: string;
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export async function register(data: RegisterPayload) {

  try {
    // Initiate The Db  connection if not already
    await dbConnector();

    // validating fields
    const validateRes = await areAllFieldsValid(data);
    if (!validateRes.isValid) {
      return { error: validateRes.message };
    }

    // Saving...

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const goodData = {
      ...data,
      password: hashedPassword,
    };
    const newUser = new User(goodData);

    const savedUser = await newUser.save();

    await sendEmailWithEmailJs({
      receiver: savedUser,
      subject: emailMetadata.SUBJECT_EMAIL_VALIDATION,
      validationLink: emailMetadata.EMAIL_VALIDATION_LINK,
    });

    const { _id, name, email } = savedUser._doc;

    return dbObjectToJsObject({ _id, name, email, error: null });
  } catch (error: any) {
    console.log("Error >> ", error);
    return { error: "Server error, please try again later." };
  }
}

export async function updateUser(data: any) {
  const { name, phone, address, profilPicUrl } = data;

  await dbConnector();

  const validateFormRes = await areAllFieldsValid({ name, phone });

  if (!validateFormRes.isValid) {
    return validateFormRes.message;
  }

  try {
    const existingUser = await User.findById(data.id);
    if (existingUser.status === userStatus.ACTIVE) {
      data = { ...data, status: userStatus.VALIDATED };
    }

    const savedUser = await User.findByIdAndUpdate(data.id, data, {
      new: true,
    });

    return dbObjectToJsObject(savedUser._doc);
  } catch (error: any) {
    console.log("Error >> ", error);
    return { error: error.message };
  }
}

export async function changePassword(data: {
  token: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    await dbConnector();

    const userAccessToken = await AccessToken.findById(data.token).populate(
      "owner"
    );
    // validating fields
    const validateRes = await areAllFieldsValid(data);
    if (!validateRes.isValid) {
      return { error: validateRes.message };
    }
    const user = userAccessToken.owner;

    const hashedPassword = await bcrypt.hash(data.password, 12);

    if (userAccessToken && userAccessToken.status === userTokenStatus.PENDING) {
      await AccessToken.findByIdAndUpdate(userAccessToken._id, {
        status: userTokenStatus.USED,
      });

      await User.findByIdAndUpdate(user._id, { password: hashedPassword });

      return { msg: "Password changed with success !" };
    } else {
      return { error: "Token invalid, the reset password process failed !" };
    }
  } catch (error) {
    return { error: "Sever Error" };
  }
}

export async function sendResetPwLink(email: string) {
  try {
    await dbConnector();

    const user = await User.findOne({ email: email });

    if (user) {
      const res = await sendEmailWithEmailJs({
        receiver: user,
        subject: emailMetadata.SUBJECT_RESET_PW_VALIDATION,
        validationLink: emailMetadata.RESET_PW_VALIDATION_LINK,
      });

      return { msg: "Reset password link sent with success !" };
    } else {
      return { error: "This email address is not registered !" };
    }
  } catch (error) {
    return { error: "Server error !" };
  }
}

export async function authenticate(data: any) {
  await dbConnector();
  const user = await User.findOne({
    email: data.email,
  }).select("+password");

  if (!user) {
    throw new Error("Email is not registered");
  }

  const { password, ...userWithoutPassword } = user._doc;

  if (user.status === userStatus.CREATED) {
    await sendEmailWithEmailJs({
      receiver: user,
      subject: emailMetadata.SUBJECT_EMAIL_VALIDATION,
      validationLink: emailMetadata.EMAIL_VALIDATION_LINK,
    });

    throw new Error(logMessage.USER_NOT_ACTIVE);
  }

  const isPasswordCorrect = await compare(data.password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Password is incorrect");
  }

  return userWithoutPassword;
}
