"use server";

import { PostAuthLoginBody, PostAuthOtpBody } from "@lib/schemas";
import { postAuthLogin, postAuthOtp } from "@lib/services/auth/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export async function otpAction(data: PostAuthOtpBody) {
  try {
    const response = await postAuthOtp(data);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("خطایی رخ داده است");
    }
  }
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
