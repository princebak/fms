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
  REMOVED: "removed",
  RESTORED: "restored",
};

export const userType: UserType = {
  ADMIN: "admin",
  USER: "user",
};

export const TOKEN_VALIDITY = 30;

export const PAGE_LIMIT = 4;

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

export const logMessage = {
  USER_NOT_ACTIVE:
    "User is not active, click on the validation link in your mail box please.",
};

export const emailMetadata = {
  SUBJECT_EMAIL_VALIDATION: "Email validation",
  SUBJECT_RESET_PW_VALIDATION: "Reset password validation",
  SENDER_NAME: "FMS",
  EMAIL_VALIDATION_LINK: "/api/email-validation",
  RESET_PW_VALIDATION_LINK: "/api/reset-pw-validation",
};

export const localLink = {
  TERMS_AND_CONDITIONS: "/assets/pdfs/ecom-terms-conditions.pdf",
  PRIVACY_POLICY: "/assets/pdfs/ecom-privacy-policy.pdf",
  //APP_BASE_PATH: "http://localhost:3000",
  APP_BASE_PATH: "https://fms-taupe.vercel.app",
};

export const paymentMethod = {
  CREDIT_CARD: "credit-card",
};

export const subscriptionStatus = {
  PAID: "paid",
  ACTIVE: "active",
  EXPIRED: "expired",
};

export const SUBSCRIPTION_AMOUNT = 50;
export const SUBSCRIPTION_DAYS = 30;
