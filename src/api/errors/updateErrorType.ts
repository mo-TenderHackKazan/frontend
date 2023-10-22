import { useMutation } from '@tanstack/react-query';
import { omit } from 'lodash-es';
import { axios } from '../../lib/axios';
import { MutationConfig, queryClient } from '../../lib/react-query';
import { ERRORS_TYPES_URL } from './urlKeys';
import { QUERY_KEY_ERRORS_TYPES } from './queryKeys';

export type UpdateErrorTypeDTO = {
  id: number;
  name?: string;
  error_description?: string;
  resolved?: boolean;
  solutions?: string[];
};

export const updateErrorType = (data: UpdateErrorTypeDTO) => {
  return axios.patch(`${ERRORS_TYPES_URL}/${data.id}`, omit(data, 'id'));
};

type UseUpdateErrorTypeOptions = {
  config?: MutationConfig<typeof updateErrorType>;
};

export const useUpdateErrorType = ({ config }: UseUpdateErrorTypeOptions = {}) => {
  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries([QUERY_KEY_ERRORS_TYPES]);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries([QUERY_KEY_ERRORS_TYPES]);
    },
    ...config,
    mutationFn: updateErrorType
  });
};
