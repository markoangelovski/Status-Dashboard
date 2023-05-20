import { StatusType, UseLocalStorageType } from "../types/types";

export const useLocalStorage = (): UseLocalStorageType => {
  const set = (key: string, value: object) => {
    if (key && typeof value === "object") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  };

  const get = (key: string): StatusType | void => {
    const svcStr = window.localStorage.getItem(key);
    if (svcStr) return JSON.parse(svcStr);
  };

  return [set, get];
};
