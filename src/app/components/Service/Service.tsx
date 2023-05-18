import StatusPill from "../StatusPill/StatusPill";
import PingBtn from "../PingBtn/PingBtn";

import { timeDist, timeInHandMin } from "@/app/helpers/helpers";
import { ServiceType } from "@/config/types";

import { forTheNext, pingEvery } from "@/app/constants/constants";

interface Props {
  service: ServiceType;
}

const Service = ({ service }: Props) => {
  return (
    <tr>
      <td
        title={service.description}
        className="whitespace-no-wrap border-b border-gray-200 px-6 py-4"
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
          </div>
        </div>
      </td>

      <td className="whitespace-no-wrap border-b border-r border-gray-200 px-6 py-4">
        <div className="text-sm leading-5 text-gray-500">{service.url}</div>
      </td>

      <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
        <StatusPill />
      </td>

      <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
        <div className="whitespace-nowrap text-sm leading-5 text-gray-500">
          {timeDist("2023-05-18T21:34:51.241Z")}
        </div>
      </td>
      <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
        <div className="whitespace-nowrap text-sm leading-5 text-gray-500">
          {timeDist("2023-05-18T21:34:51.241Z")}
        </div>
      </td>
      <td className="whitespace-no-wrap border-b border-r border-gray-200 px-6 py-4">
        <div className="whitespace-nowrap text-sm leading-5 text-gray-500">
          {timeDist("2023-05-18T21:34:51.241Z")}
        </div>
      </td>
      <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
        <select className="h-full bg-transparent px-3 py-2.5 font-sans text-sm text-sm font-normal leading-5 text-gray-500 outline-none">
          {pingEvery.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </td>
      <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
        <select className="h-full bg-transparent px-3 py-2.5 font-sans text-sm text-sm font-normal leading-5 text-gray-500 outline-none">
          {forTheNext.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </td>
      <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
        <div className="whitespace-nowrap text-sm leading-5 text-gray-500">
          {timeDist("2023-05-18T21:34:51.241Z")}
        </div>
      </td>
      <td className="whitespace-no-wrap border-b border-r border-gray-200 px-6 py-4">
        <div className="whitespace-nowrap text-sm leading-5 text-gray-500">
          {timeInHandMin("2023-05-18T21:34:51.241Z")}
        </div>
      </td>
      <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
        <PingBtn />
      </td>
    </tr>
  );
};

export default Service;
