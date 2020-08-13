import React, { Component } from "react";
import { STATES } from "../data/states";

interface InputTagProps {
  values: string[];
  addValue: (value: string) => void;
  removeValue: (index: number) => void;
}

interface State {
  code: string;
  name: string;
}

interface InputTagState {
  showCompletion: boolean;
  inputText: string;
}

/**
 * Contains a text input field which creates tags. Calls out to an update function each time
 * a tag is added or removed.
 */
export default class InputTag extends Component<InputTagProps, InputTagState> {
  constructor(props: InputTagProps) {
    super(props);

    this.state = {
      showCompletion: false,
      inputText: "",
    };
  }

  allStates = (): State[] => {
    return Object.entries(STATES).map(([code, name]) => ({
      code,
      name,
    }));
  };

  filteredStates = (): State[] => {
    let filteredStates = this.allStates().filter(
      (state) => !this.props.values.includes(state.code)
    );
    filteredStates = filteredStates.filter((state) => {
      const value = this.state.inputText.toLocaleLowerCase();
      return (
        !value ||
        state.code.toLocaleLowerCase().includes(value) ||
        state.name.toLocaleLowerCase().includes(value)
      );
    });
    return filteredStates;
  };

  inputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== "Enter") {
      return;
    }
    const filteredStates = this.filteredStates();
    if (filteredStates.length === 0) {
      alert("Invalid state!");
    } else {
      this.addValue(filteredStates[0].code);
    }
  };

  inputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    this.setState((prevState) => {
      return {
        ...prevState,
        inputText: value,
      };
    });
  };

  addValue = (value: string): void => {
    this.props.addValue(value);
    this.setState((prevState) => ({
      ...prevState,
      inputText: "",
    }));
  };

  render(): JSX.Element {
    let autocomplete;
    if (this.state.showCompletion) {
      autocomplete = (
        <div className="h-40 overflow-auto shadow p-3 rounded">
          {this.filteredStates().map((state) => {
            return (
              <button
                type="submit"
                style={{ cursor: "pointer" }}
                onMouseDown={() => this.addValue(state.code)}
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
          {this.props.values.map((value, i) => (
            <li
              key={value}
              className="border rounded-full w-auto inline-block m-1 py-1 px-3"
            >
              {value}
              <button
                type="button"
                className="ml-4"
                onClick={() => this.props.removeValue(i)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          onKeyDown={this.inputKeyDown}
          onChange={this.inputChange}
          onFocus={() => this.setState({ showCompletion: true })}
          onBlur={() => this.setState({ showCompletion: false })}
          value={this.state.inputText}
          placeholder="Enter new state"
          className="bg-gray-200 w-40 mt-2 rounded p-1"
        />
        {autocomplete}
      </div>
    );
  }
}
