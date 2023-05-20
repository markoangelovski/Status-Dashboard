import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { maxRetries, resetPingIn, retryPingIn } from "../constants/constants";
import { inXMins, timeDistInMin } from "../helpers/helpers";
import { useLocalStorage } from "./useLocalStorage";
import {
  ApiRes,
  ServiceType,
  SetLocalStorage,
  StatusList,
  StatusType,
  UsePingType
} from "../types/types";

const resetPing = (
  timer: number, // in miliseconds
  svcUrl: string,
  state: StatusType,
  setState: Dispatch<SetStateAction<StatusType>>,
  set: SetLocalStorage
) => {
  // const [set] = useLocalStorage();
  // Resets Service Ping stats in state and local storage when rest timer is up
  const svcStat = {
    ...state,
    status: StatusList.Default,
    retry: "--"
  };
  setTimeout(() => {
    setState(svcStat);
    set(svcUrl, svcStat);
  }, timer);
};

const fetchSvc = async (url: string): Promise<ApiRes> => {
  const result = await fetch("/api/ping?url=" + url);
  const json = await result.json();
  return {
    status: result.status,
    ...json
  };
};

export const usePing = (service: ServiceType): UsePingType => {
  const [set, get] = useLocalStorage();

  const [pingStatus, setPingStatus] = useState<StatusType>({
    status: StatusList.Default,
    lastPinged: "--",
    retry: "--",
    reset: "--",
    pingData: { hasErrors: false, message: "", ping: {}, pingOk: false }
  });

  const resetActive = useRef<boolean>(false);

  useEffect(() => {
    // Load existing Service Ping stats from Local Storage - used when page reloads to reload the state
    let svcPingStats = get(service.url);
    if (svcPingStats) {
      svcPingStats = { ...svcPingStats, retry: "--" };
      setPingStatus(svcPingStats);
      resetPing(
        new Date(svcPingStats.reset).getTime() - new Date().getTime(),
        service.url,
        svcPingStats,
        setPingStatus,
        set
      );
    }
  }, []);

  let retries = 0;
  const pingSvc = async (service: ServiceType) => {
    const setStats = (res: ApiRes) => {
      const pingStatEnd = {
        ...pingStatStart,
        reset: inXMins(resetPingIn),
        pingData: res
      };

      if (res.pingOk) {
        pingStatEnd.status = StatusList.Active;
      } else {
        pingStatEnd.status = StatusList.Inactive;
        pingStatEnd.retry = inXMins(retryPingIn);
      }

      set(service.url, pingStatEnd);
      setPingStatus(pingStatEnd);
      resetPing(
        resetPingIn * 60 * 1000,
        service.url,
        pingStatEnd,
        setPingStatus,
        set
      );
    };

    const pingStatStart = {
      ...pingStatus,
      lastPinged: new Date().toISOString(),
      status: StatusList.Inprogress
    };
    setPingStatus(pingStatStart);

    try {
      const res = await fetchSvc(service.url);

      if (res.status === 200 && res.pingOk) {
        setStats(res);
      } else {
        setStats(res);
        if (retries < maxRetries) {
          retries++;
          setTimeout(async () => {
            await pingSvc(service);
          }, 60 * 1000);
        }
      }
    } catch (error) {
      console.warn("Error while pinging service ", service.title, error);
    }
  };

  return [pingStatus, pingSvc];
};
