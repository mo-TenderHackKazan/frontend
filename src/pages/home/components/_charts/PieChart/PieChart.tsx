import clsx from 'clsx';
import s from './PieChart.module.scss';
import { ReactFCC } from '../../../../../utils/ReactFCC';
import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, ChartData, Legend, Tooltip } from 'chart.js';
import { useRef } from 'react';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';

export interface PieChartProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  data: ChartData<'pie', number[], string>;
  onClick?: (index: number) => void;
}

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart: ReactFCC<PieChartProps> = (props) => {
  const { className, data, onClick } = props;

  const chartRef = useRef<ChartJSOrUndefined<'pie', number[], string> | null>(null);

  return (
    <div className={clsx(s.PieChart, className)}>
      <Pie
        onClick={(e) => {
          const points = chartRef.current?.getElementsAtEventForMode(
            e.nativeEvent,
            'nearest',
            { intersect: true },
            true
          );

          if (points?.length) {
            onClick?.(points[0].index);
          }
        }}
        ref={chartRef}
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              // display: false,
              position: 'bottom'
            }
          }
        }}
      />
    </div>
  );
};
