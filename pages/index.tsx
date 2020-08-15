import React, { Component } from "react";
import Head from "next/head";
import { DataSource, getDataSources } from "../data/data_sources";
import Settings from "../components/settings";
import SourceDetails from "../components/source_details";
import AttributeList from "../components/attribute_list";

const States = (props: { states: string[] }) => {
  const headers = props.states.map((state) => (
    <th className="cell border-b" key={state}>
      {state}
    </th>
  ));
  return <>{headers}</>;
};

interface ComparisonTableProps {
  states: string[];
  openSettings: () => void;
  openDetails: (source: DataSource) => void;
}

const ComparisonTable = (props: ComparisonTableProps) => (
  <div className="overflow-auto shadow rounded bg-white w-full">
    <table className="table-auto">
      <thead>
        <tr>
          <th
            className="cell sticky-column text-left"
            onClick={props.openSettings}
          >
            <button
              type="button"
              className="clickable rounded border p-2 bg-gray-200"
            >
              Change Data
            </button>
          </th>
          <States states={props.states} />
        </tr>
      </thead>
      <tbody>
        <AttributeList
          states={props.states}
          sources={getDataSources()}
          openDetails={props.openDetails}
        />
      </tbody>
    </table>
  </div>
);

interface AppState {
  selectedStates: string[];
  selectedAttributes: DataSource[];
  settingsOpen: boolean;
  selectedSource: DataSource | null;
}

export default class App extends Component<null, AppState> {
  constructor(props: null) {
    super(props);
    this.state = {
      selectedStates: [],
      selectedAttributes: [],
      settingsOpen: false,
      selectedSource: null,
    };
  }

  openSettings = (): void => {
    this.setState((previousState) => ({
      ...previousState,
      settingsOpen: true,
    }));
  };

  closeSettings = (newStates: string[]): void => {
    this.setState((previousState) => ({
      ...previousState,
      selectedStates: newStates,
      settingsOpen: false,
    }));
  };

  openDetails = (source: DataSource): void => {
    this.setState((previousState) => ({
      ...previousState,
      selectedSource: source,
    }));
  };

  closeDetails = (): void => {
    this.setState((previousState) => ({
      ...previousState,
      selectedSource: null,
    }));
  };

  render(): JSX.Element {
    return (
      <>
        <Head>
          <title>What State Should I Live In?</title>
          <meta
            name="description"
            content="Compare US States and decide where to move."
          />
        </Head>
        <div className="container mx-auto">
          <ComparisonTable
            states={this.state.selectedStates}
            openSettings={this.openSettings}
            openDetails={this.openDetails}
          />
          <Settings
            open={this.state.settingsOpen}
            closeSettings={this.closeSettings}
            selectedStates={this.state.selectedStates}
          />
          <SourceDetails
            source={this.state.selectedSource}
            closeDetails={this.closeDetails}
          />
          <div id="footer" className="flex flex-row-reverse">
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
  }
}
