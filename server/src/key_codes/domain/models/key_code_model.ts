export interface KeyCodeProps {
  readonly _id: string;
  readonly date: Date;
  readonly createdBy: string;
  readonly keyCode: string;
  readonly series: string;
  readonly target: string;
}

export interface KeyCodeSeriesProps {
  readonly date: Date;
  readonly createdBy: string;
  readonly keyCode: string;
  readonly series: string;
  readonly target: string;
  readonly count: number;
}
