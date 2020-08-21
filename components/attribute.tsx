import React, { useEffect, useState } from "react";
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

/**
 * For a single attribute, this Component renders the data for each provided state.
 */
export default function Attribute(props: AttrProps): JSX.Element | null {
  const [data, setData] = useState<Record<string, string | number> | undefined>(
    undefined
  );

  useEffect(() => {
    loadDataSource(props.source.source).then((dataByState) => {
      setData(dataByState);
    });
  }, [props.source]);

  function format(value: string | number | null): string {
    if (!props.source) return "";
    if (value === null) return "-";
    switch (props.source.data_type) {
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

  if (!data) return null;
  const cols = props.states.map((state) => {
    if (!data) return null;
    const value = data[state];
    const valueString = format(value);
    return (
      <div className="table-cell text-right" key={state}>
        {valueString}
      </div>
    );
  });
  return <>{cols}</>;
}
