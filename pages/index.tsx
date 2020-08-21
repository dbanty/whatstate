import React, { useEffect, useState } from "react";
import Head from "next/head";
import { DataSource, getDataSources } from "../data/data_sources";
import Settings from "../components/settings";
import SourceDetails from "../components/source_details";
import AttributeList from "../components/attribute_list";

const SELECTED_STATES = "SELECTED_STATES";

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
  openSettings: () => void;
  openDetails: (source: DataSource) => void;
}

const ComparisonTable = (props: ComparisonTableProps) => (
  <div className="table-container">
    <div className="table shadow rounded bg-white w-full">
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
          sources={getDataSources()}
          openDetails={props.openDetails}
        />
      </div>
    </div>
  </div>
);

function loadStates(): string[] {
  const storedValue = localStorage.getItem(SELECTED_STATES);
  if (!storedValue) {
    return ["CO", "WA", "VA", "PA"];
  }
  return JSON.parse(storedValue);
}

const App: React.FC = () => {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);

  useEffect(() => {
    setSelectedStates(loadStates());
  }, []);

  const openSettings = (): void => {
    setSettingsOpen(true);
  };

  const updateStates = (newStates: string[]): void => {
    localStorage.setItem(SELECTED_STATES, JSON.stringify(newStates));
    setSelectedStates(newStates);
  };

  const addState = (newState: string): void => {
    updateStates([...selectedStates, newState]);
  };

  const removeState = (index: number): void => {
    const newStates = [...selectedStates];
    newStates.splice(index, 1);
    updateStates(newStates);
  };

  const closeSettings = (): void => {
    setSettingsOpen(false);
  };

  const openDetails = (source: DataSource): void => {
    setSelectedSource(source);
  };

  const closeDetails = (): void => {
    setSelectedSource(null);
  };

  return (
    <>
      <Head>
        <title>What State Should I Live In?</title>
        <meta
          name="description"
          content="Compare US States and decide where to move."
        />
      </Head>
      <div className="container m-auto">
        <ComparisonTable
          states={selectedStates}
          openSettings={openSettings}
          openDetails={openDetails}
        />
        <Settings
          open={settingsOpen}
          closeSettings={closeSettings}
          selectedStates={selectedStates}
          addState={addState}
          removeState={removeState}
        />
        <SourceDetails source={selectedSource} closeDetails={closeDetails} />
        <div id="footer" className="flex flex-row-reverse h-10">
          <a
            href="https://github.com/dbanty/whatstate"
            className="p-2 underline"
            target="_blank"
            rel="noreferrer noopener"
          >
            Contact Us
          </a>
        </div>
      </div>
    </>
  );
};

export default App;
