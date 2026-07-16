export interface StateBase {
  stateabbr: string;
  statedesc: string;
}

export interface State extends StateBase {
  locationname: string;
  category: string;
  short_question_text: string;
  data_value: string;
  totalpopulation: string;
}
