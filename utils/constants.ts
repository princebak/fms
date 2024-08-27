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

export const TOKEN_VALIDITY = 30;

export const PAGE_LIMIT = 8;

const extensionsBasePath = "/images/extensions/";

export const FileExtensionLogo = [
  { logoUrl: `${extensionsBasePath}pdf.png`, extensions: ["pdf"] },
  { logoUrl: `${extensionsBasePath}doc.png`, extensions: ["docx", "doc"] },
  { logoUrl: `${extensionsBasePath}txt.png`, extensions: ["txt"] },
  { logoUrl: `${extensionsBasePath}jpg.png`, extensions: ["jpg", "jpeg"] },
  { logoUrl: `${extensionsBasePath}png.png`, extensions: ["png"] },
  { logoUrl: `${extensionsBasePath}ppt.png`, extensions: ["ppt", "pptx"] },
  { logoUrl: `${extensionsBasePath}xls.png`, extensions: ["xls", "xlsx"] },
  { logoUrl: `${extensionsBasePath}mp3.png`, extensions: ["mp3"] },
  { logoUrl: `${extensionsBasePath}mp4.png`, extensions: ["mp4"] },
  { logoUrl: `${extensionsBasePath}zip.png`, extensions: ["zip"] },
  { logoUrl: `${extensionsBasePath}exe.png`, extensions: ["exe"] },
  { logoUrl: `${extensionsBasePath}html.png`, extensions: ["html", "htm"] },
];
