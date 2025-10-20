"use server";

import { PostAuthOtpBody } from "@lib/schemas";
import { postAuthOtp } from "@lib/services/auth/auth";

export async function otpAction(data: PostAuthOtpBody) {
  await postAuthOtp(data);
}
