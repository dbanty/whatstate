import React, { useState } from "react";

interface InputTagProps<T> {
  selectedValues: T[];
  allValues: T[];
  getChipLabel: (value: T) => string;
  getSearchLabel: (value: T) => string;
  getKey: (value: T) => string;
  addValue: (value: T) => void;
  removeValue: (index: number) => void;
  placeholder: string;
}

/**
 * Contains a text input field which creates tags. Calls out to an update function each time
 * a tag is added or removed.
 */
export default function InputTag<T>(
  props: InputTagProps<T>
): JSX.Element | null {
  const [showCompletion, setShowCompletion] = useState(false);
  const [inputText, setInputText] = useState("");

  const lowerInputText = inputText.toLocaleLowerCase();
  const filteredValues = props.allValues
    .filter(
      (value) =>
        !props.selectedValues.includes(value) &&
        (!lowerInputText ||
          props
            .getSearchLabel(value)
            .toLocaleLowerCase()
            .includes(lowerInputText))
    )
    .sort((first, second): number => {
      const firstLabel = props.getSearchLabel(first);
      const secondLabel = props.getSearchLabel(second);
      if (!lowerInputText) return firstLabel.localeCompare(secondLabel);
      if (firstLabel.startsWith(lowerInputText)) {
        return -1;
      }
      if (secondLabel.startsWith(lowerInputText)) {
        return 1;
      }
      return (
        firstLabel.indexOf(lowerInputText) - secondLabel.indexOf(lowerInputText)
      );
    });

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setInputText(value);
  };

  const addValue = (value: T): void => {
    props.addValue(value);
    setInputText("");
  };

  const inputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== "Enter") {
      return;
    }
    if (filteredValues.length === 0) {
      // eslint-disable-next-line no-alert
      alert("Invalid value!");
    } else {
      addValue(filteredValues[0]);
    }
  };

  let autocomplete;
  if (showCompletion) {
    autocomplete = (
      <div className="h-40 overflow-auto shadow p-3 rounded">
        {filteredValues.map((value) => {
          return (
            <button
              type="submit"
              style={{ cursor: "pointer" }}
              onMouseDown={() => addValue(value)}
              key={props.getKey(value)}
              className="block"
            >
              {props.getSearchLabel(value)}
            </button>
          );
        })}
      </div>
    );
  } else {
    autocomplete = null;
  }

  return (
    <div className="flex flex-col">
      <ul>
        {props.selectedValues.map((value, i) => {
          const chipLabel = props.getChipLabel(value);
          return (
            <li
              key={chipLabel}
              className="border rounded-full w-auto inline-block m-1 py-1 px-3"
            >
              {chipLabel}
              <button
                type="button"
                className="ml-4"
                onClick={() => props.removeValue(i)}
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
      <input
        type="text"
        onKeyDown={inputKeyDown}
        onChange={inputChange}
        onFocus={() => setShowCompletion(true)}
        onBlur={() => setShowCompletion(false)}
        value={inputText}
        placeholder={props.placeholder}
        className="bg-gray-200 w-40 mt-2 rounded p-1"
      />
      {autocomplete}
    </div>
  );
}
