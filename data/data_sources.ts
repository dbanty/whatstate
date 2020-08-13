import sources from "./json/sources.json";

export enum DataType {
  PERCENT = "percent",
  NUMBER = "number",
  MONEY = "money",
}

export interface DataSource {
  source: string;
  name: string;
  // eslint-disable-next-line camelcase
  data_type: DataType;
  // eslint-disable-next-line camelcase
  source_url: string;
  description: string;
  units?: string;
}

export function getDataSources(): DataSource[] {
  return sources as DataSource[];
}

export function loadDataSource(
  source: string
): Promise<Record<string, string | number>> {
  return import(`./json/${source}`);
}

/**
 * Format a number as a string.
 * @param value The number to be formatted.
 * @param min The minimum number of desired decimals.
 */
export function numToString(value: number, min = 0): string {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: min,
    maximumFractionDigits: 2,
  });
}
