import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyBearerToken } from "./helpers/helpers";

import Nav from "./components/Nav/Nav";
import ServicesListTable from "./components/ServicesListTable/ServicesListTable";

// Dashboard template: https://larainfo.com/blogs/tailwind-css-simple-admin-dashboard-ui-example
export default function Home() {
  // Check if user is logged in
  const token = cookies().get("auth")?.value as string;
  if (!verifyBearerToken(token)) redirect("/login");

  return (
    <main className="">
      <Nav />
      <div className="flex h-screen">
        <div className="w-full bg-gray-200 px-4 py-2 lg:w-full">
          <div className="container mx-auto mt-12">
            <div className="mt-8 flex flex-col">
              <div className="-my-2 overflow-x-auto py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="inline-block min-w-full overflow-hidden border-b border-gray-200 align-middle shadow sm:rounded-lg">
                  <ServicesListTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
