import { useQuery } from '@tanstack/react-query';
import { axios } from '../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../lib/react-query';
import { ErrorTypeResponse } from './types';
import { ERRORS_TODAY_URL, ERRORS_TYPES_URL } from './urlKeys';
import { QUERY_KEY_ERRORS_TODAY, QUERY_KEY_ERRORS_TYPES } from './queryKeys';

export type GetErrorsTodayResponse = {
  amount: number;
};

export const getErrorsToday = (): Promise<GetErrorsTodayResponse> => {
  return axios.get(`${ERRORS_TODAY_URL}`);
};

type QueryFnType = typeof getErrorsToday;

type UseErrorsTodayOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useErrorsToday = ({ config }: UseErrorsTodayOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_ERRORS_TODAY],
    queryFn: async () => {
      return await getErrorsToday();
    }
  });
};
