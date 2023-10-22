import { useMutation } from '@tanstack/react-query';
import { MutationConfig } from '../../lib/react-query';
import { axios } from '../../lib/axios';
import { REPORT_URL } from './urlKeys';

export type ReportDTO = {
  body: string;
};

export const report = (data: ReportDTO): Promise<any> => {
  return axios.post(`${REPORT_URL}/`, data, {});
};

type UseReportOptions = {
  config?: MutationConfig<typeof report>;
};

export const useReport = ({ config }: UseReportOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: report
  });
};
