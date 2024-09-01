import AccessToken from "@/models/AccessToken";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { localLink, userStatus, userTokenStatus } from "@/utils/constants";
import { dbConnector } from "@/utils/dbConnector";

export async function GET(req, { params: { token } }) {
  try {
    await dbConnector();

    const userAccessToken = await AccessToken.findById(token).populate("owner");
    console.log("userAccessToken Api >> ", userAccessToken);

    const user = userAccessToken.owner;

    // TODO add the token validity check
    /*TODO and token type check to be sure that a Email Validation token 
    is not used for reset password */

    if (userAccessToken && userAccessToken.status === userTokenStatus.UNUSED) {
      const activeUser = await User.findByIdAndUpdate(user._id, {
        status: userStatus.ACTIVE,
      });
      console.log("Actived User >> ", activeUser);
      await AccessToken.findByIdAndUpdate(userAccessToken._id, {
        status: userTokenStatus.USED,
      });

      return NextResponse.redirect(
        `${localLink.APP_BASE_PATH}/login?actived=true`
      );
    } else {
      return NextResponse.redirect(
        `${localLink.APP_BASE_PATH}/login?badRequest=true`
      );
    }
  } catch (error) {
    console.log("E error >> ", error);
    return NextResponse.redirect(
      `${localLink.APP_BASE_PATH}/validate-email?error=true`
    );
  }
}
