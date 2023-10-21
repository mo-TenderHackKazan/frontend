import { MouseEvent, ReactNode } from 'react';
import { NavLink, To } from 'react-router-dom';
import clsx from 'clsx';
import { ReactFCC } from '../../../../../utils/ReactFCC';
import { Text } from '../../../../../components/Text';
import s from './SidebarItem.module.scss';

export interface SidebarItemProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  /**
   * Ссылка
   */
  to: To;
  /**
   * Состояние открытости
   */
  isOpen?: boolean;
  /**
   * Обработчик нажатия на элемент
   */
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  /**
   * Содержимое элемента
   */
  children?: ReactNode | string;
}

export const SidebarItem: ReactFCC<SidebarItemProps> = (props) => {
  const { children, className, to, isOpen, onClick } = props;

  return (
    <NavLink
      className={({ isActive }) =>
        clsx(s.SidebarItem, className, {
          [s.SidebarItem_open]: isOpen,
          [s.SidebarItem_active]: isActive
        })
      }
      to={to}
      onClick={onClick}>
      {isOpen && (
        <Text className={s.SidebarItem__text} noStyle>
          {children}
        </Text>
      )}
    </NavLink>
  );
};
