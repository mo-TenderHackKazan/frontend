import { ErrorTypeResponse } from '../types';
import { uniqBy } from 'lodash-es';

export function flatErrorTree(errors: ErrorTypeResponse[]) {
  const results: ErrorTypeResponse[] = [];
  errors.map((validationOrIntegrationErrorType) => {
    validationOrIntegrationErrorType.children.map((dbOrSystemErrorType) => {
      dbOrSystemErrorType.children.map((errorType) => {
        results.push({
          ...errorType,
          name: `${validationOrIntegrationErrorType.name} / ${dbOrSystemErrorType.name} / ${errorType.name}`
        });
      });
    });
  });

  return uniqBy(
    results.map((error) => ({
      name: error.name,
      type: error.type,
      first_entry: error.first_entry,
      last_entry: error.last_entry,
      amount: error.amount
    })),
    (i) => i.name
  );
}
