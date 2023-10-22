import { useQuery } from '@tanstack/react-query';
import { axios } from '../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../lib/react-query';
import { ERRORS_DATE_URL } from './urlKeys';
import { QUERY_KEY_ERRORS_DATE } from './queryKeys';

export type GetErrorsDateResponse = {
  date: string;
  type: string;
  amount: number;
  error_id: number;
  has_children: number;
}[];

export type GetErrorsDateInput = {
  date?: string;
  date_range_after?: string;
  date_range_before?: string;
  error?: number;
  parent?: number;
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
