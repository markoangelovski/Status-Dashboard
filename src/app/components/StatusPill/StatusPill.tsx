interface Props {
  type?: string;
}

const StatusPill = ({ type }: Props) => {
  switch (type) {
    case "active":
      return (
        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
          Active
        </span>
      );
    case "inactive":
      return (
        <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
          Inactive
        </span>
      );
    case "inprogress":
      return (
        <span className="inline-flex whitespace-nowrap rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
          In Progress
        </span>
      );

    default:
      return (
        <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
          Unknown
        </span>
      );
  }
};

export default StatusPill;
