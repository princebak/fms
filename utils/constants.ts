// Constant Types
type UserTokenStatus = {
  UNUSED: string;
  PENDING: string;
  USED: string;
  REFRESHED: string;
  EXPIRED: string;
};

type UserStatus = {
  CREATED: string;
  ACTIVE: string;
  VALIDATED: string;
  BLOCKED: string;
};

type FileStatus = {
  CREATED: string;
  REMOVED: string;
  RESTORED: string;
};

type UserType = {
  ADMIN: string;
  USER: string;
};

type FileType = {
  FILE: string;
  FOLDER: string;
};

// Constants
export const userTokenStatus: UserTokenStatus = {
  UNUSED: "unused",
  PENDING: "pending",
  USED: "used",
  REFRESHED: "refreshed",
  EXPIRED: "expired",
};

export const userStatus: UserStatus = {
  CREATED: "created",
  ACTIVE: "active",
  VALIDATED: "validated",
  BLOCKED: "blocked",
};

export const fileStatus: FileStatus = {
  CREATED: "created",
  REMOVED: "active",
  RESTORED: "validated",
};

export const userType: UserType = {
  ADMIN: "created",
  USER: "actived",
};
