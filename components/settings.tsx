import React from "react";
import InputTag from "./input_tag";
import { STATES } from "../data/states";
import { DataSource, ALL_SOURCES } from "../data/data_sources";

interface SettingsProps {
  open: boolean;
  close: () => void;
  selectedStates: string[];
  addState: (state: string) => void;
  removeState: (index: number) => void;
  selectedSources: DataSource[];
  addSource: (source: DataSource) => void;
  removeSource: (index: number) => void;
}

interface State {
  code: string;
  name: string;
}

const ALL_STATES: State[] = Object.entries(STATES).map(([code, name]) => ({
  code,
  name,
}));

/**
 * The settings dialog.
 */
export default function Settings(props: SettingsProps): JSX.Element | null {
  if (!props.open) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-30">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75" />
      </div>

      <div
        className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg leading-6 font-medium text-gray-900 pb-4"
                id="modal-headline"
              >
                Settings
              </h3>
              <InputTag<State>
                selectedValues={props.selectedStates.map((code) => ({
                  code,
                  name: STATES[code],
                }))}
                allValues={ALL_STATES}
                addValue={(state) => props.addState(state.code)}
                removeValue={props.removeState}
                placeholder="Select a new State"
                getChipLabel={(state) => state.code}
                getKey={(state) => state.code}
                getSearchLabel={(state) => `${state.name} (${state.code})`}
              />
              <InputTag<DataSource>
                selectedValues={props.selectedSources}
                allValues={ALL_SOURCES}
                addValue={props.addSource}
                removeValue={props.removeSource}
                placeholder="Select more data"
                getChipLabel={(source) => source.name}
                getSearchLabel={(source) => source.name}
                getKey={(source) => source.source}
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-red-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              onClick={props.close}
            >
              Save
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
