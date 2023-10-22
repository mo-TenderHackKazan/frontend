export type ErrorType = {
  id: number;
  name: string;
  resolved: boolean;
  classes: any[];
};

export type ErrorTypeResponse = {
  type: ErrorType;
  first_entry: string;
  last_entry: string;
  amount: number;
};
