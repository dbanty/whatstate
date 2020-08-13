import React, { Component } from "react";
import {
  DataSource,
  DataType,
  loadDataSource,
  numToString,
} from "../data/data_sources";

interface AttrProps {
  states: string[];
  source: DataSource;
}

interface AttrState {
  data?: Record<string, string | number>;
}

/**
 * For a single attribute, this Component renders the data for each provided state.
 */
export default class Attribute extends Component<AttrProps, AttrState> {
  constructor(props: AttrProps) {
    super(props);
    this.state = {};
    loadDataSource(props.source.source).then((dataByState) => {
      this.setState({ data: dataByState });
    });
  }

  format(value: string | number | null): string {
    if (!this.props.source) return "";
    if (value === null) return "-";
    switch (this.props.source.data_type) {
      case DataType.PERCENT:
        return `${numToString((value as number) * 100)}%`;
      case DataType.MONEY:
        return `$${numToString(value as number, 2)}`;
      case DataType.NUMBER:
        return numToString(value as number);
      default:
        return "";
    }
  }

  render(): JSX.Element | null {
    if (!this.state.data) return null;
    const cols = this.props.states.map((state) => {
      if (!this.state.data) return null;
      const value = this.state.data[state];
      const valueString = this.format(value);
      return (
        <td className="cell text-right" key={state}>
          {valueString}
        </td>
      );
    });
    return <>{cols}</>;
  }
}
