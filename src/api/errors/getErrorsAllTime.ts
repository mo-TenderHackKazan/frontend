import { useQuery } from '@tanstack/react-query';
import { axios } from '../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../lib/react-query';
import { ERRORS_ALL_TIME_URL } from './urlKeys';
import { QUERY_KEY_ERRORS_ALL_TIME } from './queryKeys';

export type GetErrorsAllTimeResponse = {
  amount: number;
};

export const getErrorsAllTime = (): Promise<GetErrorsAllTimeResponse> => {
  return axios.get(`${ERRORS_ALL_TIME_URL}`);
};

type QueryFnType = typeof getErrorsAllTime;

type UseErrorsAllTimeOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useErrorsAllTime = ({ config }: UseErrorsAllTimeOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_ERRORS_ALL_TIME],
    queryFn: async () => {
      return await getErrorsAllTime();
    }
  });
};
