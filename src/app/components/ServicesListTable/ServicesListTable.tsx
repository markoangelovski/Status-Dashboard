import { tableHeadItems } from "@/app/constants/constants";
import Service from "../Service/Service";
import { ServiceType } from "@/app/types/types";

var services: ServiceType[] = require("../../../config/services.json");

const ServicesListTable = () => {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          {tableHeadItems.map((item) => (
            <th
              key={item}
              className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500"
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="bg-white">
        {services.map((service) => (
          <Service key={service.url} service={service} />
        ))}
      </tbody>
    </table>
  );
};

export default ServicesListTable;
