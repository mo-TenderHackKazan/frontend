export type ErrorType = {
  id: number;
  name: string;
  resolved: boolean;
  classes: any[];
  has_children: boolean;
};

export type ErrorTypeResponse = {
  name: string;
  type: ErrorType;
  first_entry: string;
  last_entry: string;
  amount: number;
  children: ErrorTypeResponse[];
};

export type CrmError = {
  id: number;
  eid: string;
  type: string;
  created: string;
  filtered: string;
  params: string[];
  body: string;
};
