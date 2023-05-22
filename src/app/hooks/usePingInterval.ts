import { useLocalStorage } from "./useLocalStorage";

export const usePingInterval = (svcUrl: string) => {
  const [set, get] = useLocalStorage();

  const svc = get(svcUrl);

  const timeoutId = setTimeout(() => {
    const intervalId = setInterval(() => {}, 1000);
  }, 1000);

  return "";
};
