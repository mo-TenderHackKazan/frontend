import clsx from 'clsx';
import s from './LineChart.module.scss';
import { ReactFCC } from '../../../../../utils/ReactFCC';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import { useRef } from 'react';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';

export interface LineChartProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  data: ChartData<'line', number[], string>;
  onClick?: (index: number) => void;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      // display: false,
      position: 'top' as const
    },
    title: {
      display: false
    }
  }
};

export const LineChart: ReactFCC<LineChartProps> = (props) => {
  const { className, data, onClick } = props;

  const chartRef = useRef<ChartJSOrUndefined<'line', number[], string> | null>(null);

  return (
    <div className={clsx(s.LineChart, className)}>
      <Line
        onClick={(e) => {
          const points = chartRef.current?.getElementsAtEventForMode(
            e.nativeEvent,
            'nearest',
            { intersect: true },
            true
          );

          if (points?.length) {
            onClick?.(points[0].datasetIndex);
          }
        }}
        ref={chartRef}
        options={options}
        data={data}
      />
    </div>
  );
};
