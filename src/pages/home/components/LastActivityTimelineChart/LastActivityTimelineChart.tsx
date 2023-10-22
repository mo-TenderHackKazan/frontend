import clsx from 'clsx';
import s from './LastActivityTimelineChart.module.scss';
import { ReactFCC } from '../../../../utils/ReactFCC';
import { DataLayout } from '../DataLayout';
import { LineChart } from '../_charts/LineChart';
import { FilterSelect } from '../FilterSelect';
import { useErrorsDate } from '../../../../api/errors/getErrorsDate';
import subDays from 'date-fns/subDays';
import format from 'date-fns/format';
import { useMemo, useState } from 'react';
import { groupBy } from 'lodash-es';
import { baseColors } from '../_charts/utils';
import { ChartDataset } from 'chart.js/dist/types';
import { Link, LinkVariant } from '../../../../components/Link';

export interface LastActivityTimelineChartProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
}

enum DateVariant {
  week = 'week',
  two_weeks = 'two_weeks',
  month = 'month'
}

const dateRanges: { [key in DateVariant]: [Date, Date] } = {
  [DateVariant.week]: [subDays(new Date(), 7), new Date()],
  [DateVariant.two_weeks]: [subDays(new Date(), 14), new Date()],
  [DateVariant.month]: [subDays(new Date(), 30), new Date()]
};

export const LastActivityTimelineChart: ReactFCC<LastActivityTimelineChartProps> = (props) => {
  const { className } = props;

  const [dateVariant, setDateVariant] = useState(DateVariant.month);
  const dateRange = dateRanges[dateVariant];

  const [active, setActive] = useState<{ type: string; id: number; amount: number } | undefined>(undefined);

  const { data: dateData } = useErrorsDate({
    parent: active?.id ?? undefined,
    date_range_after: format(new Date(dateRange[0]), 'yyyy-MM-dd'),
    date_range_before: format(new Date(dateRange[1]), 'yyyy-MM-dd')
  });

  const groups = useMemo(() => {
    return groupBy(dateData, (v) => v.type);
  }, [dateData]);

  const chartData = useMemo(() => {
    if (!dateData || dateData.length === 0) {
      return null;
    }

    const labels = getDaysArray(...dateRange).map((date) => format(date, 'dd.MM.yyyy'));

    const datasets: ChartDataset<'line', number[]>[] = Object.entries(groups).map(([type, entries], index) => {
      const data: number[] = Array(labels.length).fill(NaN);

      if (isNaN(data[0])) {
        data[0] = 0;
      }

      if (isNaN(data[data.length - 1])) {
        data[data.length - 1] = 0;
      }

      entries.forEach((entry) => {
        const date = format(new Date(entry.date), 'dd.MM.yyyy');
        const index = labels.indexOf(date);
        data[index] = entry.amount;
      });

      return {
        label: type,
        data: data,
        backgroundColor: baseColors[index],
        borderColor: baseColors[index],
        spanGaps: true,
        parent_id: entries[0].error_id,
        amount: entries[0].amount,
        has_children: entries[0].has_children
      };
    });

    return {
      labels,
      datasets
    };
  }, [dateData, groups]);

  const totalAmount = chartData?.datasets
    .flatMap((i) => i.data)
    .filter(Boolean)
    .reduce((acc, item) => acc + item, 0);

  return (
    <DataLayout
      className={clsx(s.LastActivityTimelineChart, className)}
      classes={{ content: s.LastActivityTimelineChart__content }}
      title={'Последняя активность'}
      description={
        <>
          {!!active && (
            <>
              <Link
                className={s.LastActivityTimelineChart__reset}
                variant={LinkVariant.SECONDARY}
                onClick={() => {
                  setActive(undefined);
                }}>
                Сбросить
              </Link>
              <br />
            </>
          )}
          <span>Всего ошибок: {totalAmount}</span>
        </>
      }
      headerContent={
        <div className={s.LastActivityTimelineChart__header}>
          <FilterSelect
            placeholder={'Выбрать время'}
            value={dateVariant}
            onChange={(e) => setDateVariant(e.target.value as DateVariant)}>
            <option value={DateVariant.week}>Неделя</option>
            <option value={DateVariant.two_weeks}>2 недели</option>
            <option value={DateVariant.month}>Месяц</option>
          </FilterSelect>
        </div>
      }>
      {!!chartData && (
        <LineChart
          data={chartData}
          onClick={(index) => {
            const data = chartData?.datasets[index] as any;
            if (data.has_children) {
              setActive({ type: data.label, id: data.parent_id, amount: data.amount });
            }
          }}
        />
      )}
    </DataLayout>
  );
};

function getDaysArray(start: Date, end: Date) {
  const arr = [];
  for (let dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }

  return arr.slice(1);
}
