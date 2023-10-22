import clsx from 'clsx';
import s from './DataLayout.module.scss';
import { ReactFCC } from '../../../../utils/ReactFCC';
import { ETextVariants, Text } from '../../../../components/Text';
import { ReactNode } from 'react';

export interface ChartLayoutProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  classes?: {
    content?: string;
    inner?: string;
    title?: string;
  };
  title?: string;
  description?: string | ReactNode;
  bigNumber?: number;
  headerContent?: ReactNode | string;
}

const numberFormatter = new Intl.NumberFormat('ru-RU');

export const DataLayout: ReactFCC<ChartLayoutProps> = (props) => {
  const { children, className, classes, title, bigNumber, description, headerContent } = props;

  return (
    <div className={clsx(s.DataLayout, className)}>
      {headerContent && <div className={s.DataLayout__header}>{headerContent}</div>}

      <div className={clsx(s.DataLayout__inner, classes?.inner)}>
        {title && (
          <Text className={clsx(s.DataLayout__heading, classes?.title)} variant={ETextVariants.BODY_M_REGULAR}>
            {title}
          </Text>
        )}

        {description && (
          <Text className={s.DataLayout__description} variant={ETextVariants.CAPTION_M_REGULAR}>
            {description}
          </Text>
        )}

        {typeof bigNumber === 'number' && (
          <Text className={s.DataLayout__bigNumber}>{numberFormatter.format(bigNumber)}</Text>
        )}

        <div className={clsx(s.DataLayout__content, classes?.content)}>{children}</div>
      </div>
    </div>
  );
};
