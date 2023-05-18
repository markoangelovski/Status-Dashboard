import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { verifyToken, toBase64, verifyBearerToken } from "../helpers/helpers";

let isTokenOk = true;

const Login = () => {
  // Check if logged in user is trying to access
  const token = cookies().get("auth")?.value as string;
  if (verifyBearerToken(token)) redirect("/");

  async function handleLogin(formData: FormData) {
    "use server";

    const token = formData.get("token") as string;

    if (verifyToken(token)) {
      // @ts-ignore
      cookies().set("auth", "Bearer " + toBase64(token));
      isTokenOk = true;
      redirect("/");
    } else {
      // @ts-ignore
      cookies().set("auth", "");
      isTokenOk = false;
      revalidatePath("/login");
    }
  }

  return (
    <form
      className="flex h-screen w-screen items-center justify-center"
      action={handleLogin}
    >
      <div className="flex w-full flex-col items-center md:w-1/2 ">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-600">
          LOGIN
        </h1>

        <div className="mb-6 w-3/4">
          <input
            type="text"
            name="token"
            id="token"
            className="w-full rounded bg-slate-200 px-8 py-4 outline-blue-500 placeholder:font-semibold hover:ring-1"
            placeholder="Token"
          ></input>
          {!isTokenOk && (
            <div className="absolute text-red-500">
              Invalid token, please try again.
            </div>
          )}
        </div>

        <div className="mt-4 w-3/4">
          <button
            type="submit"
            className="w-full rounded bg-blue-400 py-4 font-bold text-blue-50 hover:bg-blue-700"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
