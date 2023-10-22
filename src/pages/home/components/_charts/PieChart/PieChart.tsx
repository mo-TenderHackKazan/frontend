import clsx from 'clsx';
import s from './PieChart.module.scss';
import { ReactFCC } from '../../../../../utils/ReactFCC';
import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, ChartData, Legend, Tooltip } from 'chart.js';

export interface PieChartProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  data: ChartData<'pie', number[], string>;
}

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart: ReactFCC<PieChartProps> = (props) => {
  const { className, data } = props;

  return (
    <div className={clsx(s.PieChart, className)}>
      <Pie
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
              position: 'bottom'
            }
          }
        }}
      />
    </div>
  );
};
