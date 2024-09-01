import AccessToken from "@/models/AccessToken";
import { NextResponse } from "next/server";
import { localLink, userTokenStatus } from "@/utils/constants";
import { dbConnector } from "@/utils/dbConnector";

export async function GET(req, { params: { token } }) {
  try {
    await dbConnector();

    const userAccessToken = await AccessToken.findById(token).populate("owner");

    // TODO add the token validity check
    /*TODO  token type check to be sure that a Email Validation token 
    is not used for reset password */

    if (userAccessToken && userAccessToken.status === userTokenStatus.UNUSED) {
      await AccessToken.findByIdAndUpdate(userAccessToken._id, {
        status: userTokenStatus.PENDING,
      });

      return NextResponse.redirect(
        `${localLink.APP_BASE_PATH}/change-password?nsapi=${userAccessToken._id}`
      );
    } else {
      return NextResponse.redirect(
        `${localLink.APP_BASE_PATH}/login?badRequest=true`
      );
    }
  } catch (error) {
    console.log("Error >> ", error);
    return NextResponse.redirect(
      `${localLink.APP_BASE_PATH}/validate-email?error=true`
    );
  }
}
