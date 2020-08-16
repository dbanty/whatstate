import React from "react";
import InputTag from "./input_tag";

interface SettingsProps {
  open: boolean;
  selectedStates: string[];
  closeSettings: () => void;
  addState: (state: string) => void;
  removeState: (index: number) => void;
}

/**
 * The settings dialog.
 */
export default function Settings(props: SettingsProps): JSX.Element | null {
  if (!props.open) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
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
                Select States
              </h3>
              <InputTag
                values={props.selectedStates}
                addValue={props.addState}
                removeValue={props.removeState}
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-red-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              onClick={props.closeSettings}
            >
              Save
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
