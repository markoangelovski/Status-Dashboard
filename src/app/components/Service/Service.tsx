"use client";

import StatusPill from "../StatusPill/StatusPill";
import PingBtn from "../PingBtn/PingBtn";

import { usePing } from "@/app/hooks/usePing";

import {
  addTime,
  lStorage,
  timeDist,
  timeInHandMin,
  timeInTitle
} from "@/app/helpers/helpers";

import { forTheNext, pingEvery } from "@/app/constants/constants";
import { useEffect, useState } from "react";
import { ServiceType } from "@/app/types/types";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

interface Props {
  service: ServiceType;
}

const Service = ({ service }: Props) => {
  const [set, get] = useLocalStorage();
  const [_, setReRender] = useState(false);

  const [pingEveryVal, setPingEveryVal] = useState<string>(pingEvery[0]);
  const [forNextVal, setForNextVal] = useState<string>(forTheNext[0]);
  const [nextPingVal, setNextPingVal] = useState<string>("--");
  const [intervalExpiresVal, setIntervalExpiresVal] = useState<string>("--");

  const [intervalActive, setIntervalActive] = useState<boolean>(false);

  const [pingStatus, pingSvc] = usePing(service);

  const { status, lastPinged, retry, reset } = pingStatus;

  useEffect(() => {
    // Activaces Interval when both ping-every and for-next are selected
    if (pingEveryVal.length > 2 && forNextVal.length > 2) {
      setIntervalActive(true);
      setNextPingVal(addTime(pingEveryVal) as string);
      setIntervalExpiresVal(addTime(forNextVal) as string);
    }

    // Sets values to local storage when values are selected in UI
    const currentSvc = get(service.url);
    console.log("currentSvc 1: ", service.title, currentSvc);

    set(service.url, {
      ...currentSvc,
      intervalActive: intervalActive,
      nextPing: addTime(pingEveryVal),
      intervalEnd: addTime(forNextVal),
      pingEvery: pingEveryVal,
      forNext: forNextVal
    });
    const currentSvc2 = get(service.url);
    console.log("currentSvc 1.1: ", service.title, currentSvc2);
  }, [pingEveryVal, forNextVal, intervalActive]);

  useEffect(() => {
    const currentSvc = lStorage.get(service.url);
    console.log("currentSvc 2: ", service.title, currentSvc);
    // Set values to state when page refreshes
    if (currentSvc?.intervalActive) {
      setIntervalActive(currentSvc?.intervalActive);
      setPingEveryVal(currentSvc?.pingEvery as string);
      setForNextVal(currentSvc?.forNext as string);
      setNextPingVal(currentSvc?.nextPing as string);
      setIntervalExpiresVal(currentSvc?.intervalEnd as string);
    }
  }, []);

  const handleCancelInterval = () => {
    setIntervalActive(false);
    setPingEveryVal(pingEvery[0]);
    setForNextVal(forTheNext[0]);
    setNextPingVal("--");
    setIntervalExpiresVal("--");

    const currentSvc = get(service.url);

    set(service.url, {
      ...currentSvc,
      intervalActive: false,
      nextPing: "--",
      intervalEnd: "--"
    });
  };

  useEffect(() => {
    // Re-render the UI to display the latest timings
    const id = setInterval(() => setReRender((prev) => !prev), 15 * 1000);

    return clearInterval(id);
  }, []);

  return (
    <tr>
      <td
        title={service.description}
        className="border-b border-gray-200 px-6 py-4"
      >
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={service.icon}
              alt={service.title}
            ></img>
          </div>

          <div className="ml-4">
            <div className="text-sm font-medium leading-5 text-gray-900">
              {service.title}
            </div>
            <div className="text-sm leading-5 text-gray-500">{service.url}</div>
          </div>
        </div>
      </td>

      <td className="border-b border-gray-200 px-6 py-4">
        <StatusPill type={status} />
      </td>

      <td className="border-b border-gray-200 px-6 py-4">
        <div
          title={lastPinged.length > 3 ? timeInTitle(lastPinged) : ""}
          className="whitespace-nowrap text-sm leading-5 text-gray-500"
        >
          {lastPinged.length > 2 ? timeDist(lastPinged) : lastPinged}
        </div>
      </td>
      <td className="border-b border-gray-200 px-6 py-4">
        <div
          title={retry.length > 3 ? timeInTitle(retry) : ""}
          className="whitespace-nowrap text-sm leading-5 text-gray-500"
        >
          {retry.length > 2 ? timeDist(retry) : retry}
        </div>
      </td>
      <td className="border-b border-r border-gray-200 px-6 py-4">
        <div
          title={reset.length > 3 ? timeInTitle(reset) : ""}
          className="whitespace-nowrap text-sm leading-5 text-gray-500"
        >
          {reset.length > 2 ? timeDist(reset) : reset}
        </div>
      </td>
      <td className="border-b border-gray-200 px-6 py-4">
        <select
          name="ping-every"
          value={pingEveryVal}
          onChange={(e) => {
            // If user selects "--", cancel interval
            if (e.target.value.length == 2) return handleCancelInterval();
            setPingEveryVal(e.target.value);
          }}
          className="h-full bg-transparent px-3 py-2.5 font-sans text-sm text-sm font-normal leading-5 text-gray-500 outline-none"
        >
          {pingEvery.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </td>
      <td className="border-b border-gray-200 px-6 py-4">
        <select
          name="for-next"
          value={forNextVal}
          onChange={(e) => {
            // If user selects "--", cancel interval
            if (e.target.value.length == 2) return handleCancelInterval();
            setForNextVal(e.target.value);
          }}
          className="h-full bg-transparent px-3 py-2.5 font-sans text-sm text-sm font-normal leading-5 text-gray-500 outline-none"
        >
          {forTheNext.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </td>
      <td className="border-b border-gray-200 px-6 py-4">
        <div
          title={nextPingVal?.length > 3 ? timeInTitle(nextPingVal) : ""}
          className="whitespace-nowrap text-sm leading-5 text-gray-500"
        >
          {intervalActive ? timeDist(nextPingVal) : nextPingVal}
        </div>
      </td>
      <td className="relative border-b border-r border-gray-200 px-6 py-4">
        <div
          title={
            intervalExpiresVal?.length > 3
              ? timeInTitle(intervalExpiresVal)
              : ""
          }
          className="text-sm leading-5 text-gray-500"
        >
          {intervalActive && (
            <span
              onClick={handleCancelInterval}
              title={`Cancel interval for ${service.title}`}
              className="absolute right-1 top-0 cursor-pointer"
            >
              x
            </span>
          )}
          {intervalActive
            ? timeInHandMin(intervalExpiresVal)
            : intervalExpiresVal}
        </div>
      </td>
      <td className="border-b border-gray-200 px-6 py-4">
        <PingBtn
          title={`Ping service ${service.title}`}
          ping={() => pingSvc(service)}
        />
      </td>
    </tr>
  );
};

export default Service;
