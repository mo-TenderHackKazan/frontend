import clsx from 'clsx';
import s from './LogPage.module.scss';
import { ReactFCC } from '../../utils/ReactFCC';
import { Heading, HeadingSize } from '../../components/Heading';
import format from 'date-fns/format';
import { useErrors } from '../../api/errors/getErrors';
import { InfiniteScroll } from '../../components/InfiniteScroll';
import { useErrorsTypes } from '../../api/errors';
import { ETextVariants, Text } from '../../components/Text';
import { URL_KEY_TYPE } from '../../app/routes/urlKeys';
import { useEffect, useState } from 'react';
import { useQueryParam } from '../../hooks/useQueryParam';
import { ModalBody, ModalContainer } from '../../components/Modal';
import { CrmError } from '../../api/errors/types';

export interface LogPageProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
}

export const LogPage: ReactFCC<LogPageProps> = (props) => {
  const { className } = props;

  const [typeId] = useQueryParam(URL_KEY_TYPE);

  const [isOpen, setIsOpen] = useState(false);
  const [activeError, setActiveError] = useState<CrmError | null>(null);

  useErrorsTypes({});

  const { data, fetchNextPage, hasNextPage, refetch } = useErrors({
    page_size: 100,
    type: typeId ? Number(typeId) : undefined
  });

  useEffect(() => {
    refetch();
  }, [typeId, refetch]);

  const count = data?.pages[0].count ?? 0;
  const errors = data?.pages.flatMap((page) => page.results || []) || [];

  return (
    <div className={clsx(s.LogPage, className)}>
      <Heading className={s.LogPage__heading} size={HeadingSize.H4}>
        Журнал ошибок
      </Heading>

      <Text className={s.LogPage__text} variant={ETextVariants.BODY_S_REGULAR}>
        Выборка из{' '}
        <Text component={'span'} variant={ETextVariants.BODY_S_MEDIUM}>
          {count}
        </Text>{' '}
        записей{' '}
        {!!typeId && errors[0] && (
          <>
            по категории{' '}
            <Text component={'span'} variant={ETextVariants.BODY_S_MEDIUM}>
              "{errors[0].type}"
            </Text>
          </>
        )}
      </Text>

      <InfiniteScroll className={s.LogPage__table} fetchMore={fetchNextPage} hasMore={!!hasNextPage} scrollOffset={100}>
        <div className={s.LogPage__header}>
          <div className={s.LogPage__headerItem}>Информация об ошибке</div>
          <div className={s.LogPage__headerItem}>Дата</div>
        </div>

        {errors.map((error, index) => (
          <TableRow
            eid={error.eid}
            body={error.body}
            date={error.created}
            type={error.type}
            key={index}
            onClick={() => {
              setIsOpen(true);
              setActiveError(error);
            }}
          />
        ))}
      </InfiniteScroll>

      <ModalContainer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setActiveError(null);
        }}>
        {activeError && (
          <ModalBody>
            <p className={s.LogPage__modalTitle}>ID</p>
            <p className={s.LogPage__modalValue}>{activeError.eid}</p>

            <p className={s.LogPage__modalTitle}>Тело ошибки</p>
            <p className={s.LogPage__modalValue}>{activeError.body}</p>

            <p className={s.LogPage__modalTitle}>Дата и время</p>
            <p className={s.LogPage__modalValue}>{format(new Date(activeError.created), 'dd.MM.yyyy HH:mm')}</p>

            <p className={s.LogPage__modalTitle}>Категория</p>
            <p className={s.LogPage__modalValue}>{activeError.type}</p>
          </ModalBody>
        )}
      </ModalContainer>
    </div>
  );
};

type TableRowProps = {
  eid: string;
  body: string;
  date: string;
  type: string;
  onClick: () => void;
};

function TableRow({ eid, body, date, type, onClick }: TableRowProps) {
  return (
    <div className={s.LogPage__row} onClick={() => onClick()}>
      <div className={s.LogPage__rowItem}>{eid}</div>
      <div className={clsx(s.LogPage__rowItem, s.LogPage__rowItem_indicated)} title={type}>
        {type}
      </div>
      <div className={s.LogPage__rowItem}>{body}</div>
      <div className={s.LogPage__rowItem}>{format(new Date(date), 'dd.MM.yyyy')}</div>
    </div>
  );
}
