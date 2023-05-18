"use client";

import { useTransition } from "react";
import { logout } from "./actions";

const Logout = () => {
  let [_, startTransition] = useTransition();

  return (
    <button onClick={() => startTransition(() => logout())}>Logout</button>
  );
};

export default Logout;
