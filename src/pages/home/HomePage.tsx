import clsx from 'clsx';
import s from './HomePage.module.scss';
import { ReactFCC } from '../../utils/ReactFCC';

export interface HomePageProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
}

export const HomePage: ReactFCC<HomePageProps> = (props) => {
  const { className } = props;

  return <div className={clsx(s.HomePage, className)}></div>;
};
