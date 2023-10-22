import { ErrorTypeResponse } from '../types';
import { uniqBy } from 'lodash-es';

export function flatErrorTree(errors: ErrorTypeResponse[]) {
  const results: ErrorTypeResponse[] = [];
  errors.forEach((validationOrIntegrationErrorType) => {
    validationOrIntegrationErrorType.children.forEach((dbOrSystemErrorType) => {
      dbOrSystemErrorType.children.forEach((errorType) => {
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
      last_error_text: error.last_error_text,
      amount: error.amount,
      solutions: error.type.solutions
    })),
    (i) => i.name
  );
}
