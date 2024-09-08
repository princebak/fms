interface IMyFile {
  constainer: string?;
  isContainer: boolean;
  name: string;
  type: string?;
  downloadUrl: string?;
  extension: string?;
  size: number;
  contentNo: number;
  visited: Date;
  status: string?;
}

interface S3File {
  name: string;
  content: File;
}

interface IAccessToken {
  name: string;
  owner: IUser;
  type: string;
  status: string?;
}

interface IUser {
  name: string;
  email: string;
  type: string;
  phone?: string;
  address?: string;
  password: string;
  profilPicUrl?: string;
  status?: string;
}
