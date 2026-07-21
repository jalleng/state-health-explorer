export interface StateApiRow {
  stateabbr: string;
  statedesc: string;
  locationname: string;
  category: string;
  short_question_text: string;
  data_value: string; //Returned from the API as a string, but it is actually a number.
  totalpopulation: string; //Returned from the API as a string, but it is actually a number.
}

export interface StateBase {
  stateabbr: string;
  statedesc: string;
}

export interface State extends StateBase {
  locationname: string;
  category: string;
  short_question_text: string;
  data_value: number;
  totalpopulation: number;
}

export interface ChartRow {
  measure: string;
  value: number;
}

export type StateAbbreviations =
  | "AL"
  | "AK"
  | "AZ"
  | "AR"
  | "CA"
  | "CO"
  | "CT"
  | "DE"
  | "FL"
  | "GA"
  | "HI"
  | "ID"
  | "IL"
  | "IN"
  | "IA"
  | "KS"
  | "KY"
  | "LA"
  | "ME"
  | "MD"
  | "MA"
  | "MI"
  | "MN"
  | "MS"
  | "MO"
  | "MT"
  | "NE"
  | "NV"
  | "NH"
  | "NJ"
  | "NM"
  | "NY"
  | "NC"
  | "ND"
  | "OH"
  | "OK"
  | "OR"
  | "PA"
  | "RI"
  | "SC"
  | "SD"
  | "TN"
  | "TX"
  | "UT"
  | "VT"
  | "VA"
  | "WA"
  | "WV"
  | "WI"
  | "WY";
