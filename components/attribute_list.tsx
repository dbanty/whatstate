import React, { memo } from "react";
import { DataSource } from "../data/data_sources";
import Attribute from "./attribute";

interface AttrListProps {
  states: string[];
  sources: DataSource[];
  openDetails: (source: DataSource) => void;
}

const INFO_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-5 mr-2"
  >
    <path
      className="icon-primary"
      d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z"
    />
    <path
      className="icon-secondary"
      d="M11 12a1 1 0 0 1 0-2h2a1 1 0 0 1 .96 1.27L12.33 17H13a1 1 0 0 1 0 2h-2a1 1 0 0 1-.96-1.27L11.67 12H11zm2-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
    />
  </svg>
);

function AttributeList(props: AttrListProps): JSX.Element {
  const rows = props.sources.map((source) => (
    <tr key={source.name}>
      <th className="cell sticky-column text-left border-r">
        <button
          type="button"
          className="inline-flex items-center text-gray-700"
          onClick={() => props.openDetails(source)}
        >
          {INFO_ICON}
          {source.name}
          {source.units ? `(${source.units})` : null}
        </button>
      </th>
      <Attribute states={props.states} source={source} />
    </tr>
  ));
  return <>{rows}</>;
}

export default React.memo(AttributeList);
