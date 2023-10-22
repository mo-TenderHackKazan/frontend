import { useQuery } from '@tanstack/react-query';
import { axios } from '../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../lib/react-query';
import { DetailedErrorType } from './types';
import { ERRORS_TYPES_URL } from './urlKeys';
import { QUERY_KEY_ERROR } from './queryKeys';

export type GetErrorTypeInput = {
  id: number;
};

export const getErrorType = ({ id }: GetErrorTypeInput): Promise<DetailedErrorType> => {
  return axios.get(`${ERRORS_TYPES_URL}/${id}`);
};

type QueryFnType = typeof getErrorType;

type UseErrorTypeOptions = GetErrorTypeInput & {
  config?: QueryConfig<QueryFnType>;
};

export const useErrorType = ({ config, id }: UseErrorTypeOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_ERROR, id],
    queryFn: async () => {
      return await getErrorType({ id });
    }
  });
};
