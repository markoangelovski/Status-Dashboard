import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { maxRetries, resetPingIn, retryPingIn } from "../constants/constants";
import { inXMins } from "../helpers/helpers";
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
  // Resets Service Ping stats in state and local storage when rest timer is up
  const svcStat = {
    ...state,
    status: StatusList.Unknown,
    retry: "--"
  };
  setTimeout(() => {
    setState(svcStat);
    set(svcUrl, svcStat);
  }, timer);
};

const fetchSvc = async (url: string): Promise<ApiRes> =>
  await fetch("/api/ping?url=" + url).then((res) => res.json());

export const usePing = (service: ServiceType): UsePingType => {
  const [set, get] = useLocalStorage();

  // Set reset timeout manually by setting the ?reset=15 query param
  const searchParams = useSearchParams();
  const resetPingParam = searchParams.get("reset") as string;
  const resetPingNum = parseInt(resetPingParam);

  const baseStats = {
    status: StatusList.Loading,
    lastPinged: "--",
    retry: "--",
    reset: "--",
    pingData: { hasErrors: false, message: "", ping: {}, pingOk: false }
  };

  const [pingStatus, setPingStatus] = useState<StatusType>(baseStats);

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
    } else {
      setPingStatus({ ...baseStats, status: StatusList.Unknown });
    }
  }, []);

  let retries = 0;
  const pingSvc = async (service: ServiceType) => {
    const setStats = (res: ApiRes) => {
      const pingStatEnd = {
        ...pingStatStart,
        reset: inXMins(!isNaN(resetPingNum) ? resetPingNum : resetPingIn), // OVDJE
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

      if (res.pingOk) {
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
      setStats({
        hasErrors: true,
        pingOk: false,
        message: error as string,
        ping: {}
      });
      if (retries < maxRetries) {
        retries++;
        setTimeout(async () => {
          await pingSvc(service);
        }, 60 * 1000);
      }
    }
  };

  return [pingStatus, pingSvc];
};
