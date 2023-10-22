import clsx from 'clsx';
import s from './HomePage.module.scss';
import { ReactFCC } from '../../utils/ReactFCC';
import { DataLayout, LastActivityTimelineChart, TotalByTypesChart } from './components';
import { useErrorsToday } from '../../api/errors/getErrorsToday';
import { TypesTable } from './components/TypesTable';
import { useErrorsAllTime } from '../../api/errors/getErrorsAllTime';

export interface HomePageProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
}

export const HomePage: ReactFCC<HomePageProps> = (props) => {
  const { className } = props;

  const { data: errorsAllTimeData } = useErrorsAllTime({});
  const { data: errorsTodayData } = useErrorsToday({});

  return (
    <div className={clsx(s.HomePage, className)}>
      <div className={s.HomePage__row}>
        <DataLayout
          classes={{ inner: s.HomePage__overviewData, title: s.HomePage__overviewTitle }}
          title={'Ошибок всего'}
          bigNumber={errorsAllTimeData?.amount ?? 0}
        />
        <DataLayout
          classes={{ inner: s.HomePage__overviewData, title: s.HomePage__overviewTitle }}
          title={'Ошибок за сегодня'}
          bigNumber={errorsTodayData?.amount ?? 0}
        />
      </div>

      <LastActivityTimelineChart />

      <TotalByTypesChart />

      <TypesTable />
    </div>
  );
};
