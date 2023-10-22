import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { axios } from '../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../lib/react-query';
import { CrmError } from './types';
import { ERRORS_URL } from './urlKeys';
import { QUERY_KEY_ERRORS_DATE } from './queryKeys';

export type GetErrorsResponse = {
  next: string;
  previous: string;
  count: number;
  results: CrmError[];
};

export type GetErrorsInput = {
  page_size: number;
  pageParam?: number;
  type?: number;
  reversed?: true;
};

export const getErrors = ({ pageParam = 1, ...params }: GetErrorsInput): Promise<GetErrorsResponse> => {
  return axios.get(`${ERRORS_URL}`, {
    params: {
      ...params,
      page: pageParam
    }
  });
};

type QueryFnType = typeof getErrors;

type UseErrorsOptions = GetErrorsInput & {
  config?: QueryConfig<QueryFnType>;
};

export const useErrors = ({ config, ...params }: UseErrorsOptions) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: [QUERY_KEY_ERRORS_DATE, ...Object.values(params)],
    queryFn: async () => {
      return await getErrors(params);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) {
        return;
      }

      const params = new URLSearchParams(lastPage.next.split('?')[1] || '');

      if (params) {
        return Number(params.get('page'));
      }

      return 1;
    }
  });
};
