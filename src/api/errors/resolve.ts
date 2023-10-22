import { useMutation } from '@tanstack/react-query';
import { MutationConfig } from '../../lib/react-query';
import { axios } from '../../lib/axios';
import { RESOLVE_URL } from './urlKeys';

export type ResolveDTO = {
  options: string[];
  error: number;
  body: string;
  email: string;
};

export const resolve = (data: ResolveDTO): Promise<void> => {
  return axios.post(`${RESOLVE_URL}/`, data, {});
};

type UseResolveOptions = {
  config?: MutationConfig<typeof resolve>;
};

export const useResolve = ({ config }: UseResolveOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: resolve
  });
};
