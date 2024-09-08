export class UserClass implements IUser {
  name: string = "";
  email: string = "";
  type: string = "";
  phone?: string | undefined;
  address?: string | undefined;
  password: string = "";
  profilPicUrl?: string | undefined;
  status?: string | undefined;
}

export class FieldValidationResult {
  constructor(public message: string, public isValid: boolean = false) {}
}

export class AlertMessageClass {
  public content?: string;
  public color?: string = "alert-danger";

  constructor(content: string, color?: string) {
    this.content = content;
    this.color = color;
  }
}
