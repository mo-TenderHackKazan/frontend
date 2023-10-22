import clsx from 'clsx';
import s from './FilterSelect.module.scss';
import { ReactFCC } from '../../../../utils/ReactFCC';
import { IntrinsicPropsWithoutRef } from '../../../../utils/types';
import { useId } from 'react';

export interface FilterSelectProps extends IntrinsicPropsWithoutRef<'select'> {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  label?: string;
}

export const FilterSelect: ReactFCC<FilterSelectProps> = (props) => {
  const { children, className, label, ...selectProps } = props;

  const id = useId();

  return (
    <div className={s.FilterSelect__container}>
      <label htmlFor={id}>
        <span className={s.FilterInput__label}>{label}</span>
      </label>

      <div className={clsx(s.FilterSelect, className)}>
        <select className={s.FilterSelect__select} {...selectProps}>
          {children}
        </select>
      </div>
    </div>
  );
};
