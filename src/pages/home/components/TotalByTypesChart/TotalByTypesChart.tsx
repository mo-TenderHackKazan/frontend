import clsx from 'clsx';
import s from './TotalByTypes.module.scss';
import { ReactFCC } from '../../../../utils/ReactFCC';
import { DataLayout } from '../DataLayout';
import { PieChart } from '../_charts';
import { baseColors } from '../_charts/utils';
import { useErrorsTypes } from '../../../../api/errors';
import { useMemo, useState } from 'react';
import { FilterInput } from '../FilterInput';
import { useErrorsDate } from '../../../../api/errors/getErrorsDate';
import { groupBy, sortBy } from 'lodash-es';

export interface TotalByTypesProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
}

export const TotalByTypesChart: ReactFCC<TotalByTypesProps> = (props) => {
  const { className } = props;

  const [date, setDate] = useState<string>('');
  const [dateLeft, setDateLeft] = useState<string>('');
  const [dateRight, setDateRight] = useState<string>('');

  const { data: dateData } = useErrorsDate({
    date: date ? new Date(date) : undefined,
    date_range_after: dateLeft ? new Date(dateLeft) : undefined,
    date_range_before: dateRight ? new Date(dateRight) : undefined
  });

  const totalAmount = dateData ? dateData.reduce((acc, item) => acc + item.amount, 0) : undefined;

  const chartData = useMemo(() => {
    if (!dateData || dateData.length === 0) {
      return null;
    }

    const groups = groupBy(dateData, (v) => v.type);
    const typesAmounts = sortBy(
      Object.entries(groups).map(([type, entries]) => ({
        type,
        amount: entries.reduce((acc, item) => acc + item.amount, 0)
      })),
      (i) => i.amount
    );

    const labels = typesAmounts.map((type) => type.type);

    return {
      labels,
      datasets: [
        {
          label: 'Количество ошибок',
          data: typesAmounts.map((entry) => entry.amount),
          backgroundColor: baseColors.slice(3, typesAmounts.length),
          borderColor: baseColors.slice(3, typesAmounts.length),
          borderWidth: 1
        }
      ]
    };
  }, [dateData]);

  return (
    <DataLayout
      className={clsx(s.TotalByTypes, className)}
      classes={{ content: s.TotalByTypes__content }}
      title={'Общие число ошибок по категориям'}
      description={
        <>
          Всего категорий: {chartData?.labels.length ?? '–'} <br />
          Всего ошибок: {totalAmount ?? '–'}
        </>
      }
      headerContent={
        <div className={s.TotalByTypes__header}>
          <FilterInput label={'Дата'} type={'date'} value={date} onChange={(e) => setDate(e.target.value)} />
          <FilterInput
            label={'Дата начала'}
            type={'date'}
            value={dateLeft}
            onChange={(e) => setDateLeft(e.target.value)}
          />
          <FilterInput
            label={'Дата окончания'}
            type={'date'}
            value={dateRight}
            onChange={(e) => setDateRight(e.target.value)}
          />
        </div>
      }>
      {chartData && <PieChart className={s.TotalByTypes__chart} data={chartData} />}
    </DataLayout>
  );
};
