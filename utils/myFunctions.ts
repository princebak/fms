import { FileExtensionLogo, PAGE_LIMIT, TOKEN_VALIDITY } from "./constants";
import { FieldValidationResult } from "@/classes";
import User from "@/models/User";
import { dbConnector } from "./dbConnector";

export function getFileExtension(filename: string) {
  const match = filename.match(/\.([^./]+)$/);

  return match ? match[1] : null;
}

export function dbObjectToJsObject(dbObject: any) {
  return JSON.parse(JSON.stringify(dbObject));
}

export const getContentWithPagination = (
  list: Array<any>,
  page: string = "",
  search: string = "",
  limit: string = ""
) => {
  const validLimit = limit ? Number.parseInt(limit) : PAGE_LIMIT;
  search = search ? search : "";

  // Filters
  const filteredList = list.filter((item) => {
    const regExp = new RegExp(search, "i");
    const myJSON = JSON.stringify(item);

    return regExp.test(myJSON);
  });

  const totalPages = Math.ceil(filteredList.length / validLimit);

  // Sorting
  filteredList.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  // Pagination
  const pageNumber = page ? Number.parseInt(page) : 1;

  const currentPage =
    pageNumber < 1 ? 1 : pageNumber > totalPages ? totalPages : pageNumber;

  const startIndex = (currentPage - 1) * validLimit;
  let listByPage = [];

  let index = startIndex;
  while (index >= 0 && index < filteredList.length) {
    listByPage.push(filteredList[index]);
    index++;
    if (listByPage.length === validLimit) {
      break;
    }
  }

  const res = {
    content: listByPage,
    totalElements: filteredList.length,
    pageLimit: limit,
    currentPage: currentPage,
    totalPages: totalPages,
  };

  return res;
};

export const getTheDesiredPage = (str: string) => {
  // Regular expression to match a number after "Go to page "
  const regex = /Go to page (\d+)/;

  // Extract the number using the match method
  const match = str.match(regex);

  return match ? Number.parseInt(match[1]) : 1;
};

export const isTheUserTokenValid = (token: any) => {
  const expirationDate = new Date(
    token.updatedAt.getTime() + TOKEN_VALIDITY * 60000
  );
  const currentDate = new Date();
  return currentDate.getTime() < expirationDate.getTime();
};

export const getFileExtensionLogoPath = (extension: string) => {
  const pathObj = FileExtensionLogo.find((item: any) =>
    item.extensions.includes(extension)
  );
  return pathObj ? pathObj.logoUrl : "/images/extensions/default.png";
};

export const getLastVisitedTimeInterval = (
  lastVisitedDateTime: Date | undefined | null
) => {
  if (!lastVisitedDateTime) {
    return "Not yet read";
  }
  const currentDateTime = new Date();
  const lastVisitedDateTimeGood = new Date(lastVisitedDateTime);
  const secondes = Math.round(
    (currentDateTime.getTime() - lastVisitedDateTimeGood.getTime()) / 1000
  );

  if (secondes < 60) {
    return `${secondes} s ago`;
  } else {
    const munites = Math.round(secondes / 60);
    if (munites < 60) {
      return `${munites} m ago`;
    } else {
      const hours = Math.round(munites / 60);
      if (hours < 24) {
        return `${hours} h ago`;
      } else {
        const days = Math.round(hours / 24);
        if (days < 30) {
          return `${days} d ago`;
        } else {
          const months = Math.round(days / 30);
          if (months < 12) {
            return `${months} M ago`;
          } else {
            const years = Math.round(months / 12);
            return `${years} Y ago`;
          }
        }
      }
    }
  }
};

export const getFormatedDate = (
  date: Date,
  displayHour = false,
  displayMinute = false,
  displaySecond = false
) => {
  date = new Date(date);

  function padTo2Digits(num: any) {
    return num.toString().padStart(2, "0");
  }

  const mainDate = [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");

  const time = [];

  if (displayHour) {
    time.push(padTo2Digits(date.getHours()));
  }

  if (displayMinute) {
    time.push(padTo2Digits(date.getMinutes()));
  }

  if (displaySecond) {
    time.push(padTo2Digits(date.getSeconds()));
  }

  const timeString = time.join(":");

  return `${mainDate} ${timeString}`;
};

type AnyObject = Record<string, any>;

export const areAllFieldsValid = async (
  form: AnyObject
): Promise<FieldValidationResult> => {
  for (const field in form) {
    let comparingValue = "";
    if (field === "confirmPassword") {
      comparingValue = form["password"];
    }

    const res = await isFieldValid(field, form[field], comparingValue);
    if (!res.isValid) {
      return res;
    }
  }

  return new FieldValidationResult("All fields are valid", true);
};

export const isFieldValid = async (
  fieldName: string,
  fieldValue: string,
  comparingFieldValue?: string
): Promise<FieldValidationResult> => {
  switch (fieldName) {
    case "email":
      return await isEmailValid(fieldValue);
    case "name":
      return isFullNameValid(fieldValue);
    case "password":
      return isPasswordValid(fieldValue);
    case "confirmPassword":
      return isConfirmPasswordValid(fieldValue, comparingFieldValue);
    case "phone":
      return validatePhone(fieldValue);
    default:
      return new FieldValidationResult("Unkown field !", true);
  }
};

const isEmailValid = async (email?: string): Promise<FieldValidationResult> => {
  const regExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!email) {
    return new FieldValidationResult("An email is required.");
  }
  if (email === "updateUser") {
    return new FieldValidationResult(email, true);
  }
  if (!(regExp.test(email) && email.length <= 150)) {
    return new FieldValidationResult("A valid email is required.");
  }

  await dbConnector();

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return new FieldValidationResult(
      "This email already exists, change it please."
    );
  }

  return new FieldValidationResult(email, true);
};

const isFullNameValid = (fullName?: string): FieldValidationResult => {
  if (!fullName) {
    return new FieldValidationResult("A Name is required.");
  }

  if (fullName.length > 150) {
    return new FieldValidationResult(
      "A Name with at last 150 caracters is required."
    );
  }
  return new FieldValidationResult(fullName, true);
};

const isPasswordValid = (password?: string): FieldValidationResult => {
  const regExp: RegExp =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;

  if (!password) {
    return new FieldValidationResult("A password is required.");
  }
  if (password === "updateUser") {
    return new FieldValidationResult(password, true);
  }
  if (!regExp.test(password)) {
    return new FieldValidationResult(
      "A password with 8 to 16 caracters, and at least one Capital letter and one special caracter is required."
    );
  }

  return new FieldValidationResult(password, true);
};

const isConfirmPasswordValid = (
  confirmPassword: string,
  password?: string
): FieldValidationResult => {
  const regExp: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[w@#$!%*?&]{8,}$/gm;

  if (!confirmPassword) {
    return new FieldValidationResult("A confirmPassword is required.");
  }
  if (confirmPassword === "updateUser") {
    return new FieldValidationResult(confirmPassword, true);
  }
  if (confirmPassword != password) {
    return new FieldValidationResult(
      "A confirm password must be equal to the password."
    );
  }

  return new FieldValidationResult(confirmPassword, true);
};

const validatePhone = (phone?: string): FieldValidationResult => {
  if (!phone) {
    return new FieldValidationResult("A phone number is required !");
  }

  let phoneNumber = "";

  try {
    phoneNumber = Math.abs(Number.parseInt(phone)) + "";
    if (phoneNumber.length > 20) {
      return new FieldValidationResult(
        "A phone should have at last 20 characters !"
      );
    }
    return new FieldValidationResult(phone, true);
  } catch (error) {
    return new FieldValidationResult(
      "A valid phone number is required: no space, no other symbole, except '+' as prefix if you want."
    );
  }
};

export const isTheSubscriptionValid = (subscription: ISubscription) => {
  const expireAt = new Date(subscription.expireAt);
  const currentDate = new Date();
  const diff = currentDate.getTime() < expireAt.getTime();

  return diff;
};
