import React, { Component } from "react";
import Head from "next/head";
import { DataSource, getDataSources } from "../data/data_sources";
import Attribute from "../components/attribute";
import Settings from "../components/settings";

const States = (props: { states: string[] }) => {
  const headers = props.states.map((state) => (
    <th className="cell" key={state}>
      {state}
    </th>
  ));
  return <>{headers}</>;
};

interface AttrListProps {
  states: string[];
  sources: DataSource[];
}

const AttributeList = (props: AttrListProps) => {
  const rows = props.sources.map((source) => (
    <tr key={source.name}>
      <th className="cell sticky-column text-left">{source.name}</th>
      <Attribute states={props.states} source={source} />
    </tr>
  ));
  return <>{rows}</>;
};

interface ComparisonTableProps {
  states: string[];
  openSettings: () => void;
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
        <AttributeList states={props.states} sources={getDataSources()} />
      </tbody>
    </table>
  </div>
);

interface AppState {
  selectedStates: string[];
  selectedAttributes: DataSource[];
  settingsOpen: boolean;
}

export default class App extends Component<null, AppState> {
  constructor(props: null) {
    super(props);
    this.state = {
      selectedStates: [],
      selectedAttributes: [],
      settingsOpen: false,
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

  render(): JSX.Element {
    return (
      <>
        <Head>
          <title>What State Should I Live In?</title>
        </Head>
        <div className="container mx-auto">
          <ComparisonTable
            states={this.state.selectedStates}
            openSettings={this.openSettings}
          />
          <Settings
            open={this.state.settingsOpen}
            closeSettings={this.closeSettings}
            selectedStates={this.state.selectedStates}
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
