import clsx from 'clsx';
import s from './TotalByTypes.module.scss';
import { ReactFCC } from '../../../../utils/ReactFCC';
import { DataLayout } from '../DataLayout';
import { PieChart } from '../_charts';
import { baseColors } from '../_charts/utils';
import { useEffect, useMemo, useState } from 'react';
import { FilterInput } from '../FilterInput';
import { useErrorsDate } from '../../../../api/errors/getErrorsDate';
import { groupBy, sortBy } from 'lodash-es';
import { Link, LinkVariant } from '../../../../components/Link';
import format from 'date-fns/format';

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

  const [active, setActive] = useState<{ type: string; id: number; amount: number } | undefined>(undefined);

  useEffect(() => {
    setDate('');
    setDateLeft('');
    setDateRight('');
  }, [active]);

  const { data: dateData } = useErrorsDate({
    parent: active?.id ?? undefined,
    date: date ? format(new Date(date), 'yyyy-MM-dd') : undefined,
    date_range_after: dateLeft ? format(new Date(dateLeft), 'yyyy-MM-dd') : undefined,
    date_range_before: dateRight ? format(new Date(dateRight), 'yyyy-MM-dd') : undefined
  });

  const entries = useMemo(() => {
    const groups = groupBy(dateData, (v) => v.type);
    return sortBy(
      Object.entries(groups).map(([type, entries]) => ({
        type,
        id: entries[0].error_id,
        has_children: entries[0].has_children,
        amount: entries.reduce((acc, item) => acc + item.amount, 0)
      })),
      (i) => i.amount
    );
  }, [dateData]);

  const totalAmount = entries.reduce((acc, item) => acc + item.amount, 0);

  const chartData = useMemo(() => {
    if (!dateData || dateData.length === 0) {
      return null;
    }

    const labels = entries.map((type) => type.type);

    return {
      labels,
      datasets: [
        {
          label: 'Количество ошибок',
          data: entries.map((entry) => entry.amount),
          backgroundColor: baseColors.slice(0, entries.length),
          borderColor: baseColors.slice(0, entries.length),
          borderWidth: 1
        }
      ]
    };
  }, [dateData, entries]);

  return (
    <DataLayout
      className={clsx(s.TotalByTypes, className)}
      classes={{ content: s.TotalByTypes__content }}
      title={active ? `Количество ошибок по категории "${active.type}"` : 'Количество ошибок по категориям'}
      description={
        <>
          {(!!active || !!date || !!dateLeft || !!dateRight) && (
            <Link
              className={s.TotalByTypes__reset}
              variant={LinkVariant.SECONDARY}
              onClick={() => {
                setActive(undefined);
                setDate('');
                setDateLeft('');
                setDateRight('');
              }}>
              Сбросить
            </Link>
          )}

          <div>Всего ошибок: {totalAmount ?? '–'}</div>
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
      {chartData && (
        <PieChart
          className={s.TotalByTypes__chart}
          data={chartData}
          onClick={(index) => {
            if (entries[index].has_children) {
              setActive(entries[index]);
            }
          }}
        />
      )}
    </DataLayout>
  );
};
