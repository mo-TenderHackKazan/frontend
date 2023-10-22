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
  Legend
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { baseColors, createFromRange, randomColor } from '../utils';

export interface PieChartProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const
    },
    title: {
      display: false
    }
  }
};

const length = 7;

const fromRange = createFromRange(length);

const labels = fromRange((x) => `Label ${x + 1}`);

export const data = {
  labels,
  datasets: [
    {
      label: `Last activity`,
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: baseColors[5],
      backgroundColor: baseColors[5]
    }
  ]
};

export const LineChart: ReactFCC<PieChartProps> = (props) => {
  const { className } = props;

  return (
    <div className={clsx(s.LineChart, className)}>
      <Line options={options} data={data} />
    </div>
  );
};
