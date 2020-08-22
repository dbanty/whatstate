import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ALL_SOURCES, DataSource } from "../data/data_sources";
import Settings from "../components/settings";
import SourceDetails from "../components/source_details";
import ComparisonTable from "../components/comparison_table";

const SELECTED_STATES = "SELECTED_STATES";
const SELECTED_SOURCES = "SELECTED_SOURCES";

function loadStates(): string[] {
  const storedValue = localStorage.getItem(SELECTED_STATES);
  if (!storedValue) {
    return ["CO", "WA", "VA", "PA"];
  }
  return JSON.parse(storedValue);
}

function loadSources(): DataSource[] {
  const storedValue = localStorage.getItem(SELECTED_SOURCES);
  const sources: string[] = (storedValue && JSON.parse(storedValue)) ?? [
    "income_tax.json",
    "national_parks.json",
    "percaptia_personal_income.json",
    "percent_renewable.json",
    "pop_density.json",
  ];
  const dataSources: DataSource[] = [];
  ALL_SOURCES.forEach((source) => {
    if (sources.includes(source.source)) {
      dataSources.push(source);
    }
  });
  return dataSources;
}

const App: React.FC = () => {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<DataSource[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);

  useEffect(() => {
    setSelectedStates(loadStates());
    setSelectedSources(loadSources());
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

  const updateSources = (newSources: DataSource[]): void => {
    localStorage.setItem(
      SELECTED_SOURCES,
      JSON.stringify(newSources.map((source) => source.source))
    );
    setSelectedSources(newSources);
  };

  const addSource = (newSource: DataSource): void => {
    updateSources([...selectedSources, newSource]);
  };

  const removeSource = (index: number): void => {
    const newSources = [...selectedSources];
    newSources.splice(index, 1);
    updateSources(newSources);
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
      <div className="container m-auto flex flex-col items-center">
        <ComparisonTable
          states={selectedStates}
          sources={selectedSources}
          openSettings={openSettings}
          openDetails={openDetails}
        />
        <Settings
          open={settingsOpen}
          close={closeSettings}
          selectedStates={selectedStates}
          addState={addState}
          removeState={removeState}
          selectedSources={selectedSources}
          addSource={addSource}
          removeSource={removeSource}
        />
        <SourceDetails source={selectedSource} closeDetails={closeDetails} />
        <div id="footer" className="flex flex-row-reverse h-10 w-full">
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
