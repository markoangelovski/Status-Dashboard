export type ServiceType = {
  icon: string;
  url: string;
  title: string;
  description: string;
};

export enum StatusList {
  Loading = "--",
  Unknown = "unknown",
  Active = "active",
  Inactive = "inactive",
  Inprogress = "inprogress"
}

export type PingData = {
  hasErrors: boolean;
  message: string;
  ping: object;
  pingOk: boolean;
};

export type StatusType = {
  status?: StatusList;
  lastPinged: string;
  retry: string;
  reset: string;
  pingData: PingData;
};

export type UsePingType = [StatusType, (service: ServiceType) => Promise<void>];

export type SetLocalStorage = (key: string, value: object) => void;
export type GetLocalStorage = (key: string) => StatusType | void;

export type UseLocalStorageType = [SetLocalStorage, GetLocalStorage];

export type ApiRes = {
  hasErrors: boolean;
  pingOk: boolean;
  message: string;
  ping: object;
};
