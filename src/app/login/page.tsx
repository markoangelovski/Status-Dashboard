// TODO: Validate if user is logged in https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#using-headers

"use client";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = e.currentTarget.token.value;

    if (!token) return;

    try {
      const response = await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${btoa(token)}`
        }
      }).then((res) => res.json());

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.warn("Error with login: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center h-screen w-screen items-center"
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

// type Data = {};

// export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (
//   context
// ) => {
//   const res = await fetch("https://.../data");
//   const data: Data = await res.json();

//   return {
//     props: {
//       data
//     }
//   };
// };
