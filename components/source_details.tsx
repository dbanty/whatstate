import React, { useEffect } from "react";
import { DataSource } from "../data/data_sources";

interface Props {
  source: DataSource | null;
  closeDetails: () => void;
}

const CLOSE_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon-close"
  >
    <path
      className="icon-secondary"
      fillRule="evenodd"
      d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
    />
  </svg>
);

/**
 * The settings dialog.
 */
export default function SourceDetails(props: Props): JSX.Element | null {
  if (!props.source) return null;

  useEffect(() => {
    document.addEventListener("keydown", props.closeDetails, false);

    return () => {
      document.removeEventListener("keydown", props.closeDetails, false);
    };
  });

  return (
    <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className="fixed inset-0 transition-opacity"
        id="modal-background"
        onClick={props.closeDetails}
      >
        <div className="absolute inset-0 bg-gray-500 opacity-75" />
      </div>
      <div
        className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div className="flex flex-row items-center mb-4" id="header-row">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  {props.source.name}
                </h3>
                <div className="flex-grow" id="header-spacer" />
                <button
                  type="button"
                  aria-label="Close dialog"
                  className="w-6 clickable"
                  onClick={props.closeDetails}
                >
                  {CLOSE_ICON}
                </button>
              </div>

              <p className="mb-4">{props.source.description}</p>

              <a
                href={props.source.source_url}
                className="text-xs text-blue-700 underline"
                target="_blank"
                rel="noreferrer noopener"
              >
                {" "}
                {props.source.source_url}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
