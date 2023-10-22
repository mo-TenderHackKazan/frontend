import clsx from 'clsx';
import s from './TypesTable.module.scss';
import { ReactFCC } from '../../../../utils/ReactFCC';
import { FilterSelect } from '../FilterSelect';
import { Link } from '../../../../components/Link';
import { ReactComponent as ClockIcon } from './assets/clock.svg';
import { ReactComponent as CheckIcon } from './assets/check.svg';
import format from 'date-fns/format';
import { ETextVariants, Text } from '../../../../components/Text';

export interface TypesTableProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
}

export const TypesTable: ReactFCC<TypesTableProps> = (props) => {
  const { className } = props;

  return (
    <div>
      <Text className={s.TypesTable__heading} variant={ETextVariants.BODY_M_REGULAR}>
        Журнал событий
      </Text>

      <div className={clsx(s.TypesTable, className)}>
        <div className={s.TypesTable__header}>
          <div className={s.TypesTable__headerActions}>
            <FilterSelect>
              <option value="1">Категория</option>
            </FilterSelect>

            <FilterSelect>
              <option value="1">По новизне ошибки</option>
            </FilterSelect>
          </div>

          <div className={s.TypesTable__headerItem}>Ошибки</div>
          <div className={s.TypesTable__headerItem}>Статус</div>
        </div>

        <TableRow />
        <TableRow />
      </div>
    </div>
  );
};

function TableRow() {
  return (
    <div className={s.TypesTable__row}>
      <div className={s.TypesTable__rowMain}>
        <Link className={s.TypesTable__name}>Integration</Link>
        <span className={s.TypesTable__rowMainText}>
          No URL to redirect to. Either provide a url or define a get_absolute_url method on the Model.
        </span>
        <div className={s.TypesTable__date}>
          <ClockIcon />
          <span>{format(new Date(), 'dd.MM.yyyy HH:mm')}</span>
        </div>
      </div>

      <div className={s.TypesTable__rowItem}>12</div>
      <div className={s.TypesTable__rowItem}>
        <CheckIcon className={s.TypesTable__check} />
      </div>
    </div>
  );
}
