import clsx from 'clsx';
import s from './LastActivityTimelineChart.module.scss';
import { ReactFCC } from '../../../../utils/ReactFCC';
import { DataLayout } from '../DataLayout';
import { LineChart } from '../_charts/LineChart';
import { FilterSelect } from '../FilterSelect';

export interface LastActivityTimelineChartProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
}

export const LastActivityTimelineChart: ReactFCC<LastActivityTimelineChartProps> = (props) => {
  const { className } = props;

  return (
    <DataLayout
      className={clsx(s.LastActivityTimelineChart, className)}
      title={'Последняя активность'}
      description={'Ошибок 16678'}
      headerContent={
        <div className={s.LastActivityTimelineChart__header}>
          <FilterSelect placeholder={'Выбрать время'}>
            <option value="1">Сегодня</option>
            <option value="1">Вчера</option>
            <option value="1">Неделя</option>
            <option value="1">Месяц</option>
          </FilterSelect>

          <FilterSelect placeholder={'Категория'}>
            <option value="1">Все</option>
            <option value="1">Категория 1</option>
            <option value="1">Категория 2</option>
            <option value="1">Категория 3</option>
          </FilterSelect>
        </div>
      }>
      <LineChart />
    </DataLayout>
  );
};
