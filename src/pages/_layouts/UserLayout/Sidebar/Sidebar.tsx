import { Transition } from 'react-transition-group';
import clsx from 'clsx';
import { EXITED } from 'react-transition-group/Transition';
import { ReactFCC } from '../../../../utils/ReactFCC';
import { useIsMobile } from '../../../../hooks/useIsMobile';
import { SidebarItem, SidebarItemProps } from './SidebarItem';
import portalLogoSrc from './assets/portal-logo.svg';
import { ReactComponent as CancelIcon } from '../Header/assets/cancel.svg';
import s from './Sidebar.module.scss';

export interface SidebarProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  /**
   * Состояние открытости сайдбара
   */
  isOpen: boolean;
  /**
   * Сеттер состояния открытости сайдбара
   */
  setOpen: (open: boolean) => void;
}

const menu: SidebarItemProps[] = [
  {
    to: '/',
    children: 'Администрирование'
  },
  {
    to: '/logs',
    children: 'Журнал ошибок'
  },
  {
    to: '/manage',
    children: 'Пользовательские ошибки'
  }
  // {
  //   to: '/notify',
  //   children: 'Уведомление пользователя'
  // }
];

export const Sidebar: ReactFCC<SidebarProps> = (props) => {
  const { className, isOpen, setOpen } = props;

  const isMobile = useIsMobile();

  const onClickLink = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  return (
    <Transition timeout={150} in={isOpen}>
      {(state) => {
        const openState = state !== EXITED || isMobile;
        return (
          <div
            className={clsx(
              s.Sidebar,
              {
                [s.Sidebar_open]: isOpen
              },
              className
            )}>
            <div
              className={clsx(s.Sidebar__header, {
                [s.Sidebar__header_open]: openState
              })}>
              <img className={clsx(s.Header__logo)} src={portalLogoSrc} alt={''} />
              {isMobile && <CancelIcon className={s.Sidebar__toggleIcon} onClick={() => setOpen(!isOpen)} />}
            </div>

            <div className={s.Sidebar__menu}>
              {menu.map((item, index) => (
                <SidebarItem {...item} isOpen={openState} onClick={onClickLink} key={index} />
              ))}
            </div>
          </div>
        );
      }}
    </Transition>
  );
};
