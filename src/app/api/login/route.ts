import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import { checkAuth } from "@/app/Helpers/helpers";

export async function GET(request: Request) {
  const submittedToken = headers().get("authorization") as string;

  if (checkAuth(submittedToken)) {
    // @ts-ignore
    cookies().set("auth", submittedToken); // https://nextjs.org/docs/app/api-reference/functions/cookies

    return NextResponse.json({ ok: true });
  } else {
    // @ts-ignore
    cookies().set("auth", "");

    return NextResponse.json(
      { ok: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
}
