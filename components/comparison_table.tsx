import React from "react";
import { DataSource } from "../data/data_sources";
import AttributeList from "./attribute_list";

const States = (props: { states: string[] }) => {
  const headers = props.states.map((state) => (
    <div className="table-cell cell border-b text-center" key={state}>
      {state}
    </div>
  ));
  return <>{headers}</>;
};

interface ComparisonTableProps {
  states: string[];
  sources: DataSource[];
  openSettings: () => void;
  openDetails: (source: DataSource) => void;
}

const ComparisonTable = (props: ComparisonTableProps): JSX.Element => (
  <div className="table-container">
    <div className="table shadow rounded bg-white">
      <div className="table-header-group overflow-scroll">
        <div className="table-row sticky top-0 bg-white z-10">
          <div className="table-cell cell sticky-column bg-white z-20">
            <button
              type="button"
              className="clickable rounded border p-2 bg-gray-200"
              onClick={props.openSettings}
            >
              Change Data
            </button>
          </div>
          <States states={props.states} />
        </div>
      </div>
      <div className="table-row-group overflow-scroll bg-white">
        <AttributeList
          states={props.states}
          sources={props.sources}
          openDetails={props.openDetails}
        />
      </div>
    </div>
  </div>
);

export default ComparisonTable;
