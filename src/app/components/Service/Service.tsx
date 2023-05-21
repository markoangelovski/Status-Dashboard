"use client";

import StatusPill from "../StatusPill/StatusPill";
import PingBtn from "../PingBtn/PingBtn";

import { usePing } from "@/app/hooks/usePing";

import { timeDist, timeInHandMin, timeInTitle } from "@/app/helpers/helpers";

import { forTheNext, pingEvery } from "@/app/constants/constants";
import { useEffect, useState } from "react";
import { ServiceType } from "@/app/types/types";

interface Props {
  service: ServiceType;
}

const Service = ({ service }: Props) => {
  const [_, setReRender] = useState(false);

  const [pingStatus, pingSvc] = usePing(service);

  const { status, lastPinged, retry, reset } = pingStatus;

  useEffect(() => {
    // Re-render the UI to display the latest timings
    const id = setInterval(() => setReRender((prev) => !prev), 30 * 1000);

    return () => clearInterval(id);
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
        <select className="h-full bg-transparent px-3 py-2.5 font-sans text-sm text-sm font-normal leading-5 text-gray-500 outline-none">
          {pingEvery.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </td>
      <td className="border-b border-gray-200 px-6 py-4">
        <select className="h-full bg-transparent px-3 py-2.5 font-sans text-sm text-sm font-normal leading-5 text-gray-500 outline-none">
          {forTheNext.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </td>
      <td className="border-b border-gray-200 px-6 py-4">
        <div className="whitespace-nowrap text-sm leading-5 text-gray-500">
          {true ? "--" : timeDist("2023-05-18T21:34:51.241Z")}
        </div>
      </td>
      <td className="border-b border-r border-gray-200 px-6 py-4">
        <div className="text-sm leading-5 text-gray-500">
          {timeInHandMin("2023-05-18T21:34:51.241Z")}
        </div>
      </td>
      <td className="border-b border-gray-200 px-6 py-4">
        <PingBtn ping={() => pingSvc(service)} />
      </td>
    </tr>
  );
};

export default Service;
