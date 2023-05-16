import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { verifyToken, toBase64, verifyBearerToken } from "../Helpers/helpers";

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
      className="flex justify-center h-screen w-screen items-center"
      action={handleLogin}
    >
      <div className="w-full md:w-1/2 flex flex-col items-center ">
        <h1 className="text-center text-2xl font-bold text-gray-600 mb-6">
          LOGIN
        </h1>

        <div className="w-3/4 mb-6">
          <input
            type="text"
            name="token"
            id="token"
            className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
            placeholder="Token"
          ></input>
          {!isTokenOk && (
            <div className="absolute text-red-500">
              Invalid token, please try again.
            </div>
          )}
        </div>

        <div className="w-3/4 mt-4">
          <button
            type="submit"
            className="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
