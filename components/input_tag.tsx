import React, { useState } from "react";
import { STATES } from "../data/states";

interface InputTagProps {
  values: string[];
  addValue: (value: string) => void;
  removeValue: (index: number) => void;
}

const ALL_STATES = Object.entries(STATES).map(([code, name]) => ({
  code,
  name,
}));

/**
 * Contains a text input field which creates tags. Calls out to an update function each time
 * a tag is added or removed.
 */
export default function InputTag(props: InputTagProps): JSX.Element | null {
  const [showCompletion, setShowCompletion] = useState(false);
  const [inputText, setInputText] = useState("");

  const lowerInputText = inputText.toLocaleLowerCase();
  const filteredStates = ALL_STATES.filter(
    (state) =>
      !props.values.includes(state.code) &&
      (!lowerInputText ||
        state.code.toLocaleLowerCase().includes(lowerInputText) ||
        state.name.toLocaleLowerCase().includes(lowerInputText))
  );

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setInputText(value);
  };

  const addValue = (value: string): void => {
    props.addValue(value);
    setInputText("");
  };

  const inputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== "Enter") {
      return;
    }
    if (filteredStates.length === 0) {
      alert("Invalid state!");
    } else {
      addValue(filteredStates[0].code);
    }
  };

  let autocomplete;
  if (showCompletion) {
    autocomplete = (
      <div className="h-40 overflow-auto shadow p-3 rounded">
        {filteredStates.map((state) => {
          return (
            <button
              type="submit"
              style={{ cursor: "pointer" }}
              onMouseDown={() => addValue(state.code)}
              key={state.code}
              className="block"
            >
              {state.name} ({state.code})
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
        {props.values.map((value, i) => (
          <li
            key={value}
            className="border rounded-full w-auto inline-block m-1 py-1 px-3"
          >
            {value}
            <button
              type="button"
              className="ml-4"
              onClick={() => props.removeValue(i)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyDown={inputKeyDown}
        onChange={inputChange}
        onFocus={() => setShowCompletion(true)}
        onBlur={() => setShowCompletion(false)}
        value={inputText}
        placeholder="Enter new state"
        className="bg-gray-200 w-40 mt-2 rounded p-1"
      />
      {autocomplete}
    </div>
  );
}
