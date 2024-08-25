import { AnyAaaaRecord } from "dns";
import { FileExtensionLogo, PAGE_LIMIT, TOKEN_VALIDITY } from "./constants";

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
