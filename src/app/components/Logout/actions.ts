"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  // @ts-ignore
  cookies().set("auth", "");
  redirect("/login");
}
