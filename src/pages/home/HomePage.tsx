import clsx from 'clsx';
import s from './HomePage.module.scss';
import { ReactFCC } from '../../utils/ReactFCC';
import { DataLayout, LastActivityTimelineChart, TotalByTypesChart } from './components';
import { useErrorsTypes } from '../../api/errors';
import { useMemo } from 'react';
import { useErrorsToday } from '../../api/errors/getErrorsToday';
import { TypesTable } from './components/TypesTable';

export interface HomePageProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
}

export const HomePage: ReactFCC<HomePageProps> = (props) => {
  const { className } = props;

  const { data: errorsTypesData } = useErrorsTypes({});
  const { data: errorsTodayData } = useErrorsToday({});

  const totalErrors = useMemo(
    () =>
      errorsTypesData?.reduce((acc, item) => {
        return acc + item.amount;
      }, 0) ?? 0,
    [errorsTypesData]
  );

  return (
    <div className={clsx(s.HomePage, className)}>
      <div className={s.HomePage__row}>
        <DataLayout
          classes={{ inner: s.HomePage__overviewData, title: s.HomePage__overviewTitle }}
          title={'Ошибок всего'}
          bigNumber={totalErrors}
        />
        <DataLayout
          classes={{ inner: s.HomePage__overviewData, title: s.HomePage__overviewTitle }}
          title={'Ошибок за сегодня'}
          bigNumber={errorsTodayData?.amount}
        />
      </div>

      <div className={clsx(s.HomePage__row, s.HomePage__row_half_one)}>
        <TotalByTypesChart />
      </div>

      <LastActivityTimelineChart />

      <TypesTable />
      {/*<TimelineChart />*/}
    </div>
  );
};
