import clsx from 'clsx';
import s from './FilterInput.module.scss';
import { ReactFCC } from '../../../../utils/ReactFCC';
import { Input, InputProps } from '../../../../components/Input';
import { useId } from 'react';

export interface FilterInputProps extends InputProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  label?: string;
}

export const FilterInput: ReactFCC<FilterInputProps> = (props) => {
  const { className, label, ...inputProps } = props;

  const id = useId();

  return (
    <div className={clsx(s.FilterInput, className)}>
      <label htmlFor={id}>
        <span className={s.FilterInput__label}>{label}</span>
      </label>

      <Input id={id} className={s.FilterInput__input} {...inputProps} />
    </div>
  );
};
