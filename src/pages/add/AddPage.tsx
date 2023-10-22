import clsx from 'clsx';
import s from './AddPage.module.scss';
import { ReactFCC } from '../../utils/ReactFCC';
import { Heading, HeadingSize } from '../../components/Heading';
import { Textarea } from '../../components/Textarea';
import { Button } from '../../components/Button';
import { useState } from 'react';
import { useReport } from '../../api/errors/report';
import { formatJson } from '../log/utils';

export const AddPage: ReactFCC = () => {
  const [body, setBody] = useState('');

  const { data, mutateAsync, isLoading } = useReport();

  const onSubmit = async () => {
    if (!body) {
      return;
    }

    await mutateAsync({
      body
    });

    setBody('');
  };

  const output = data ? formatJson(data) : '';

  return (
    <div className={clsx(s.AddPage)}>
      <Heading className={s.AddPage__heading} size={HeadingSize.H4}>
        Отправить ошибку
      </Heading>

      <div className={s.AddPage__content}>
        <Textarea rows={10} placeholder={'Тело ошибки'} value={body} onChange={(e) => setBody(e.target.value)} />

        <Button onClick={() => onSubmit()} isLoading={isLoading}>
          Отправить
        </Button>
      </div>

      {output && (
        <>
          <Heading className={s.AddPage__heading} size={HeadingSize.H4}>
            Результат запроса
          </Heading>

          <pre className={s.AddPage__json} dangerouslySetInnerHTML={{ __html: output }} />
        </>
      )}
    </div>
  );
};
