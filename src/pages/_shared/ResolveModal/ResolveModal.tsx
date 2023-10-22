import clsx from 'clsx';
import s from './ResolveModal.module.scss';
import { ReactFCC } from '../../../utils/ReactFCC';
import { ModalBody, ModalContainer } from '../../../components/Modal';
import { useErrorType } from '../../../api/errors/getErrorType';
import { ETextVariants, Text } from '../../../components/Text';
import { Input } from '../../../components/Input';
import { Textarea } from '../../../components/Textarea';
import { Button, ButtonSize, ButtonVariant } from '../../../components/Button';
import { Checkbox } from '../../../components/Checkbox';
import { useEffect, useState } from 'react';
import { useUpdateErrorType } from '../../../api/errors/updateErrorType';

export interface ResolveModalProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  typeId?: number;
  allowEditDesc?: boolean;
}

export const ResolveModal: ReactFCC<ResolveModalProps> = (props) => {
  const { className, isOpen, onClose, typeId, allowEditDesc = true } = props;

  const [description, setDescription] = useState('');
  const [checked, setChecked] = useState(false);
  const [solutions, setSolutions] = useState<string[]>([]);

  const { mutate, isLoading } = useUpdateErrorType();

  const { data } = useErrorType({
    id: typeId ?? 0,
    config: {
      enabled: !!typeId
    }
  });

  useEffect(() => {
    if (data) {
      setDescription(data.error_description);
      setChecked(data.resolved);
      setSolutions(data.solutions);
    }
  }, [data]);

  const onSubmit = () => {
    if (!typeId) {
      return;
    }

    mutate({
      id: typeId,
      error_description: allowEditDesc ? description : undefined,
      resolved: checked,
      solutions
    });
  };

  return (
    <ModalContainer className={clsx(s.ResolveModal, className)} isOpen={isOpen} onClose={onClose}>
      <ModalBody className={s.ResolveModal__body}>
        {data && (
          <>
            <Text variant={ETextVariants.BODY_L_MEDIUM}>Редактирование категории</Text>

            <Input placeholder={'Название'} value={data.name} disabled />

            <Textarea
              placeholder={'Описание'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={!allowEditDesc}
            />

            <Text className={s.ResolveModal__label} variant={ETextVariants.BODY_M_MEDIUM}>
              Решения
            </Text>

            {solutions.map((solution, index) => (
              <div key={index}>
                <Text className={s.ResolveModal__label} variant={ETextVariants.BODY_S_REGULAR}>
                  Решение {index + 1}
                </Text>
                <Textarea
                  placeholder={'Решение'}
                  value={solution}
                  onChange={(e) => {
                    setSolutions((solutions) => [
                      ...solutions.slice(0, index),
                      e.target.value,
                      ...solutions.slice(index + 1)
                    ]);
                  }}
                />
              </div>
            ))}

            <div className={s.ResolveModal__row}>
              <Button
                variant={ButtonVariant.secondary}
                size={ButtonSize.small_x}
                onClick={() => setSolutions((solutions) => [...solutions, ''])}>
                Добавить решение
              </Button>

              <Button
                variant={ButtonVariant.secondary}
                size={ButtonSize.small_x}
                onClick={() => setSolutions((solutions) => solutions.slice(0, -1))}>
                Удалить решение
              </Button>
            </div>

            <Checkbox
              className={s.ResolveModal__checkbox}
              label={'Отметить ошибку обработанной'}
              checked={checked}
              onChange={(value) => setChecked(value)}
            />

            <Button
              className={s.ResolveModal__button}
              variant={ButtonVariant.primary}
              size={ButtonSize.small}
              isLoading={isLoading}
              onClick={() => onSubmit()}>
              Сохранить
            </Button>
          </>
        )}
      </ModalBody>
    </ModalContainer>
  );
};
