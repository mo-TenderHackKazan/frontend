export type ErrorType = {
  id: number;
  name: string;
  resolved: boolean;
  classes: any[];
  has_children: boolean;
  solutions: number;
};

export type ErrorTypeResponse = {
  name: string;
  type: ErrorType;
  first_entry: string;
  last_entry: string;
  last_error_text: string;
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

export type DetailedErrorType = {
  id: number;
  total: number;
  name: string;
  error_description: string;
  resolved: boolean;
  solutions: string[];
  entries: CrmError[];
};
