import clsx from 'clsx';
import s from './ManagePage.module.scss';
import { ReactFCC } from '../../utils/ReactFCC';
import { Heading, HeadingSize } from '../../components/Heading';
import { Link } from '../../components/Link';
import { Link as RouterLink } from 'react-router-dom';
import { PathBuilder } from '../../app/routes';
import format from 'date-fns/format';
import { ReactComponent as ClockIcon } from '../home/components/TypesTable/assets/clock.svg';
import { ReactComponent as CheckIcon } from '../home/components/TypesTable/assets/check.svg';
import { ReactComponent as ExpandIcon } from '../home/components/TypesTable/assets/expand.svg';
import { useFlattenErrorTypes } from '../../api/errors';
import { FilterSelect } from '../home/components/FilterSelect';
import { useState } from 'react';
import { orderBy } from 'lodash-es';
import { ResolveModal } from '../_shared/ResolveModal';
import { Checkbox } from '../../components/Checkbox';

const enOrdinalRules = new Intl.PluralRules('ru-RU');

const filePluralWords = new Map([
  ['one', 'вариант решения'],
  ['few', 'варианта решения'],
  ['many', 'вариантов решения']
]);

const formatWordsPlural = (n: number) => {
  const rule = enOrdinalRules.select(n);
  const pluralWord = filePluralWords.get(rule);
  return `${n} ${pluralWord}`;
};

export interface ManagePageProps {
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

export const ManagePage: ReactFCC<ManagePageProps> = (props) => {
  const { className } = props;

  const [sortVariant, setSortVariant] = useState(SortVariant.last_entry_desc);
  const [checked, setChecked] = useState(false);

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

  if (checked) {
    sortedData = sortedData.filter((i) => !i.type.resolved);
  }

  return (
    <div className={clsx(s.ManagePage, className)}>
      <Heading className={s.ManagePage__heading} size={HeadingSize.H4}>
        Настройки пользовательских ошибок
      </Heading>

      <div className={s.ManagePage__header}>
        <FilterSelect
          className={s.ManagePage__sortFilter}
          label={'Сортировка'}
          value={sortVariant}
          onChange={(e) => setSortVariant(e.target.value as SortVariant)}>
          <option value={SortVariant.last_entry_asc}>По дате последней ошибки ↑</option>
          <option value={SortVariant.last_entry_desc}>По дате последней ошибки ↓</option>
          <option value={SortVariant.amount_asc}>По количеству ошибок ↑</option>
          <option value={SortVariant.amount_desc}>По количеству ошибок ↓</option>
        </FilterSelect>

        <Checkbox
          className={s.ManagePage__checkbox}
          label={'Не отображать обработанные ошибки'}
          checked={checked}
          onChange={(value) => setChecked(value)}
        />
      </div>

      <div className={s.ManagePage__list}>
        {sortedData.map((item) => (
          <Card
            id={item.type.id}
            name={item.name}
            last_entry={item.last_entry}
            solutions_count={item.solutions}
            amount={item.amount}
            resolved={item.type.resolved}
            onClick={() => setActive(item.type.id)}
          />
        ))}
      </div>

      <ResolveModal
        typeId={active ?? undefined}
        isOpen={!!active}
        onClose={() => setActive(null)}
        allowEditDesc={false}
      />
    </div>
  );
};

type CardProps = {
  id: number;
  name: string;
  last_entry: string;
  solutions_count: number;
  amount: number;
  resolved: boolean;
  onClick: () => void;
};

function Card({ id, name, solutions_count, last_entry, amount, resolved, onClick }: CardProps) {
  return (
    <div className={s.ManagePage__row}>
      <div className={s.ManagePage__rowMain}>
        <Link className={s.ManagePage__name} component={RouterLink} to={PathBuilder.getErrorsLogByType(id)}>
          {name}
        </Link>
        <span className={s.ManagePage__rowMainText}>{formatWordsPlural(solutions_count)}</span>
        <div className={s.ManagePage__date}>
          <ClockIcon />
          <span>{format(new Date(last_entry), 'dd.MM.yyyy HH:mm')}</span>
        </div>
      </div>

      <div className={s.ManagePage__rowItem}>
        <span>Ошибок</span>
        <span>{amount}</span>
      </div>
      <div className={s.ManagePage__rowItem}>{resolved && <CheckIcon className={s.ManagePage__check} />}</div>
      <div className={s.ManagePage__rowItem}>
        <ExpandIcon className={s.ManagePage__expand} onClick={() => onClick()} />
      </div>
    </div>
  );
}
