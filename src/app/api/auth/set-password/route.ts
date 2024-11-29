import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const password = String(formData.get("password"));
  const token = String(formData.get("token"));

  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.auth.verifyOtp({
    token_hash: token,
    type: "signup",
  });

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/auth/set-password?error=Invalid token`,
      {
        status: 301,
      }
    );
  }

  await supabase.auth.updateUser({ password });

  return NextResponse.redirect(`${requestUrl.origin}/auth/login`, {
    status: 301,
  });
}
