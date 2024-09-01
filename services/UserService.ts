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
import { dbObjectToJsObject, isTheUserTokenValid } from "@/utils/myFunctions";

const validateEmail = (email?: string) => {
  const regExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!email) {
    return false;
  }
  if (email === "updateUser") {
    return true;
  }

  return regExp.test(email) && email.length <= 150;
};

const validateFullName = (fullName?: string) => {
  if (!fullName) {
    return false;
  }
  return fullName.length <= 150;
};

const validatePassword = (password?: string) => {
  if (!password) {
    return false;
  }
  if (password === "updateUser") {
    return true;
  }
  return password.length >= 5;
};

const validatePhone = (phone?: string) => {
  if (!phone) {
    return false;
  }
  return phone.length <= 20;
};

const validateUserType = (type?: string) => {
  console.log("Type >>", type);

  if (!type) {
    return false;
  }
  if (type === "updateUser") {
    return true;
  }

  return true;
};

const validateForm = async (
  fullName?: string,
  email?: string,
  phone?: string,
  type?: string,
  password?: string
) => {
  if (!validateUserType(type)) {
    return {
      error: "A type in this list[admin, buyer, driver, merchant] is required.",
    };
  }

  if (!validateFullName(fullName)) {
    return { error: "A Name with at last 150 caracters is required." };
  }

  if (!validateEmail(email)) {
    return { error: "A valid email is required." };
  }

  if (!validatePassword(password)) {
    return {
      error: "A password with at least 5 caracters is required.",
    };
  }

  if (!validatePhone(phone)) {
    return {
      error: "A phone number with at last 20 caracters is required.",
    };
  }

  const userByEmail = await User.findOne({ email: email });

  if (userByEmail) {
    return {
      error: "Change the email please, there is some user with the same.",
    };
  }

  return null;
};

export async function register(data: any) {
  const { name, email, phone, type, password } = data;
  await dbConnector();

  const validateFormRes = await validateForm(
    name,
    email,
    phone,
    type,
    password
  );

  if (validateFormRes) {
    return validateFormRes;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const goodData = {
    ...data,
    password: hashedPassword,
  };

  const newUser = new User(goodData);

  try {
    const savedUser = await newUser.save();

    await sendEmailWithEmailJs({
      receiver: savedUser,
      subject: emailMetadata.SUBJECT_EMAIL_VALIDATION,
      validationLink: emailMetadata.EMAIL_VALIDATION_LINK,
    });

    const { _id, name, email } = savedUser._doc;

    return { _id, name, email };
  } catch (error: any) {
    console.log("Error >> ", error);
    return { error: error.message };
  }
}

export async function updateUser(data: any) {
  const { name, phone, address, profilPicUrl } = data;

  await dbConnector();

  const validateFormRes = await validateForm(
    // TODO set a good way to validate for updateUser
    name,
    "updateUser",
    phone,
    "updateUser",
    "updateUser"
  ); // TODO add shop fields

  if (validateFormRes) {
    return validateFormRes; // Text response if invalid in error obj
  }

  try {
    const existingUser = await User.findById(data._id);
    if (existingUser.status === userStatus.ACTIVE && data.shop) {
      data = { ...data, status: userStatus.VALIDATED };
    }

    const savedUser = await User.findByIdAndUpdate(data._id, data, {
      new: true,
    });

    console.log("savedUser .. ", savedUser);

    return dbObjectToJsObject(savedUser._doc);
  } catch (error: any) {
    console.log("Error >> ", error);
    return { error: error.message };
  }
}

export async function changePassword({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}) {
  try {
    await dbConnector();

    const userAccessToken = await AccessToken.findById(token).populate("owner");

    const user = userAccessToken.owner;

    const hashedPassword = await bcrypt.hash(newPassword, 12);

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
