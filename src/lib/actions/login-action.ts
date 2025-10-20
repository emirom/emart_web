"use server";

import { PostAuthLoginBody, PostAuthOtpBody } from "@lib/schemas";
import { postAuthLogin, postAuthOtp } from "@lib/services/auth/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function otpAction(data: PostAuthOtpBody) {
  await postAuthOtp(data);
}

export async function loginAction(data: PostAuthLoginBody) {
  const response = await postAuthLogin(data);

  const tokenValue = response?.data?.tokens?.accessToken;

  if (!tokenValue) {
    throw new Error("توکن از سرور دریافت نشد");
  }

  const cookieStore = await cookies();

  cookieStore.set("access_token", tokenValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  redirect("/dashboard");
}
