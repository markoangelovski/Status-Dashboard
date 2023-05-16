import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyBearerToken } from "./Helpers/helpers";
import Logout from "./Components/Logout/Logout";

export default function Home() {
  // Check if user is logged in
  const token = cookies().get("auth")?.value as string;
  if (!verifyBearerToken(token)) redirect("/login");

  return (
    <main className="">
      <Logout />
    </main>
  );
}
