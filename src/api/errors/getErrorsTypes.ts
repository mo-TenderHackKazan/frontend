import { useQuery } from '@tanstack/react-query';
import { axios } from '../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../lib/react-query';
import { ErrorTypeResponse } from './types';
import { ERRORS_TYPES_URL } from './urlKeys';
import { QUERY_KEY_ERRORS_TYPES } from './queryKeys';
import { flatErrorTree } from './utils/flatErrorTree';

export type GetErrorsTypesResponse = ErrorTypeResponse[];

export const getErrorsTypes = (): Promise<GetErrorsTypesResponse> => {
  return axios.get(`${ERRORS_TYPES_URL}`);
};

type QueryFnType = typeof getErrorsTypes;

type UseErrorsTypesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useErrorsTypes = ({ config }: UseErrorsTypesOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_ERRORS_TYPES],
    queryFn: async () => {
      return await getErrorsTypes();
    }
  });
};

export const useFlattenErrorTypes = ({ config }: UseErrorsTypesOptions) => {
  const { data: typesData, ...queryResult } = useErrorsTypes({ config });
  const data = flatErrorTree(typesData || []);

  return {
    data,
    ...queryResult
  };
};
