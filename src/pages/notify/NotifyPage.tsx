import clsx from 'clsx';
import s from './Notify.module.scss';
import { ReactFCC } from '../../utils/ReactFCC';
import { Heading, HeadingSize } from '../../components/Heading';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Button } from '../../components/Button';
import { Radio } from '../../components/Radio';
import { useId, useState } from 'react';
import { useResolve } from '../../api/errors/resolve';
import { useQueryParam } from '../../hooks/useQueryParam';
import { URL_KEY_ID } from '../../app/routes/urlKeys';
import { useNavigate } from 'react-router-dom';
import { MANAGE_PAGE_ROUTE } from '../../app/routes';

export interface NotifyPageProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
}

enum NotifyMethod {
  site = 'site',
  email = 'email',
  telegram = 'telegram'
}

export const NotifyPage: ReactFCC<NotifyPageProps> = (props) => {
  const { className } = props;

  const [errorId] = useQueryParam(URL_KEY_ID);
  const errorIdInt = Number(errorId);

  const [method, setMethod] = useState(NotifyMethod.site);
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const id = useId();

  const { mutateAsync, isLoading } = useResolve();

  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!email || !body) {
      return;
    }

    await mutateAsync({
      options: ['email'],
      error: errorIdInt,
      email,
      body
    });

    navigate(MANAGE_PAGE_ROUTE);

    setEmail('');
    setBody('');
  };

  return (
    <div className={clsx(s.Notify, className)}>
      <Heading className={s.Notify__heading} size={HeadingSize.H4}>
        Уведомление пользователя
      </Heading>

      <div className={s.Notify__content}>
        <div className={s.Notify__radios}>
          <Radio
            name={id}
            label={'Сайт'}
            checked={method === NotifyMethod.site}
            onClick={() => setMethod(NotifyMethod.site)}
          />
          <Radio
            name={id}
            label={'Почта'}
            checked={method === NotifyMethod.email}
            onClick={() => setMethod(NotifyMethod.email)}
          />
          <Radio
            name={id}
            label={'телеграм'}
            checked={method === NotifyMethod.telegram}
            onClick={() => setMethod(NotifyMethod.telegram)}
          />
        </div>

        {method === NotifyMethod.email && (
          <>
            <Input
              type={'email'}
              placeholder={'Почта пользователя'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Textarea placeholder={'Сообщение'} value={body} onChange={(e) => setBody(e.target.value)} />

            <Button onClick={() => onSubmit()} isLoading={isLoading}>
              Отправить
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
