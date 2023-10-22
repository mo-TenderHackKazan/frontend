import clsx from 'clsx';
import s from './TypesTable.module.scss';
import { ReactFCC } from '../../../../utils/ReactFCC';
import { FilterSelect } from '../FilterSelect';
import { Link } from '../../../../components/Link';
import { ReactComponent as ClockIcon } from './assets/clock.svg';
import { ReactComponent as CheckIcon } from './assets/check.svg';
import { ReactComponent as ExpandIcon } from './assets/expand.svg';
import format from 'date-fns/format';
import { ETextVariants, Text } from '../../../../components/Text';
import { useFlattenErrorTypes } from '../../../../api/errors';
import { Link as RouterLink } from 'react-router-dom';
import { PathBuilder } from '../../../../app/routes';
import { useState } from 'react';
import { orderBy } from 'lodash-es';
import { ResolveModal } from '../../../_shared/ResolveModal';

export interface TypesTableProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
}

enum SortVariant {
  last_entry_asc = 'last_entry_asc',
  last_entry_desc = 'last_entry_desc',
  amount_asc = 'amount_asc',
  amount_desc = 'amount_desc'
}

export const TypesTable: ReactFCC<TypesTableProps> = (props) => {
  const { className } = props;

  const [sortVariant, setSortVariant] = useState(SortVariant.last_entry_desc);
  const [expanded, setExpanded] = useState(false);

  const [active, setActive] = useState<number | null>(null);

  const { data } = useFlattenErrorTypes({});

  let sortedData = orderBy(
    data,
    (item) => {
      if (sortVariant === SortVariant.last_entry_asc || sortVariant === SortVariant.last_entry_desc) {
        return new Date(item.last_entry);
      }

      return item.amount;
    },
    sortVariant === SortVariant.amount_asc || sortVariant === SortVariant.last_entry_asc ? 'asc' : 'desc'
  );

  sortedData = expanded ? sortedData : sortedData.slice(0, 5);

  return (
    <div>
      <Text className={s.TypesTable__heading} variant={ETextVariants.BODY_M_REGULAR}>
        Журнал событий
      </Text>

      <div className={clsx(s.TypesTable, className)}>
        <div className={s.TypesTable__header}>
          <div className={s.TypesTable__headerActions}>
            <FilterSelect
              className={s.TypesTable__sortFilter}
              label={'Сортировка'}
              value={sortVariant}
              onChange={(e) => setSortVariant(e.target.value as SortVariant)}>
              <option value={SortVariant.last_entry_asc}>По дате последней ошибки ↑</option>
              <option value={SortVariant.last_entry_desc}>По дате последней ошибки ↓</option>
              <option value={SortVariant.amount_asc}>По количеству ↑</option>
              <option value={SortVariant.amount_desc}>По количеству ↓</option>
            </FilterSelect>
          </div>

          <div className={s.TypesTable__headerItem}>Ошибки</div>
          <div className={s.TypesTable__headerItem}>Статус</div>
          <div className={s.TypesTable__headerItem}></div>
        </div>

        {sortedData.map((item, index) => (
          <TableRow
            id={item.type.id}
            name={item.name}
            amount={item.amount}
            last_entry={item.last_entry}
            last_error_text={item.last_error_text}
            resolved={item.type.resolved}
            onClick={() => setActive(item.type.id)}
            key={index}
          />
        ))}
      </div>

      <Link className={s.TypesTable__more} onClick={() => setExpanded((expanded) => !expanded)}>
        {expanded ? 'Свернуть' : 'Показать все'}
      </Link>

      <ResolveModal typeId={active ?? undefined} isOpen={!!active} onClose={() => setActive(null)} />
    </div>
  );
};

type TableRowProps = {
  id: number;
  name: string;
  last_entry: string;
  last_error_text: string;
  amount: number;
  resolved: boolean;
  onClick: () => void;
};

function TableRow({ id, name, last_entry, last_error_text, amount, resolved, onClick }: TableRowProps) {
  return (
    <div className={s.TypesTable__row}>
      <div className={s.TypesTable__rowMain}>
        <Link className={s.TypesTable__name} component={RouterLink} to={PathBuilder.getErrorsLogByType(id)}>
          {name}
        </Link>
        <span className={s.TypesTable__rowMainText}>{last_error_text}</span>
        <div className={s.TypesTable__date}>
          <ClockIcon />
          <span>{format(new Date(last_entry), 'dd.MM.yyyy HH:mm')}</span>
        </div>
      </div>

      <div className={s.TypesTable__rowItem}>{amount}</div>
      <div className={s.TypesTable__rowItem}>{resolved && <CheckIcon className={s.TypesTable__check} />}</div>
      <div className={s.TypesTable__rowItem}>
        <ExpandIcon className={s.TypesTable__expand} onClick={() => onClick()} />
      </div>
    </div>
  );
}
