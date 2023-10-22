import { useQuery } from '@tanstack/react-query';
import { axios } from '../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../lib/react-query';
import { ErrorTypeResponse } from './types';
import { ERRORS_DATE_URL, ERRORS_TYPES_URL } from './urlKeys';
import { QUERY_KEY_ERRORS_DATE, QUERY_KEY_ERRORS_TYPES } from './queryKeys';

export type GetErrorsDateResponse = {
  date: string;
  type: string;
  amount: number;
}[];

export type GetErrorsDateInput = {
  date?: Date;
  date_range_after?: Date;
  date_range_before?: Date;
  error?: number;
};

export const getErrorsDate = (params: GetErrorsDateInput): Promise<GetErrorsDateResponse> => {
  return axios.get(`${ERRORS_DATE_URL}`, {
    params
  });
};

type QueryFnType = typeof getErrorsDate;

type UseErrorsDateOptions = GetErrorsDateInput & {
  config?: QueryConfig<QueryFnType>;
};

export const useErrorsDate = ({ config, ...params }: UseErrorsDateOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_ERRORS_DATE, ...Object.values(params)],
    queryFn: async () => {
      return await getErrorsDate(params);
    }
  });
};
