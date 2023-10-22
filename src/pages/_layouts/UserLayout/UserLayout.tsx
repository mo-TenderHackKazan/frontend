import { ReactNode, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { ReactFCC } from '../../../utils/ReactFCC';
import { useToggle } from '../../../hooks/useToggle';
import { useIsDesktop } from '../../../hooks/useIsDesktop';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import s from './UserLayout.module.scss';

export interface UserLayoutProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  /**
   * Контент для хедера
   */
  header?: ReactNode | string;
}

export const UserLayout: ReactFCC<UserLayoutProps> = (props) => {
  const { className, header } = props;

  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();

  const [isOpenSidebar, { set, change }] = useToggle(isDesktop);

  useEffect(() => {
    if (isMobile) {
      change(false);
    }

    if (isDesktop) {
      change(true);
    }
  }, [change, isMobile, isDesktop]);

  const isOpen = isOpenSidebar || isDesktop;
  console.log(isOpen);

  return (
    <div className={clsx(s.UserLayout, className)}>
      <Sidebar className={s.UserLayout__sidebar} isOpen={isOpen} setOpen={change} />

      <div className={clsx(s.UserLayout__main, isOpen && s.UserLayout__main_shrink)}>
        <Header className={s.UserLayout__header} onOpenSidebar={set}>
          {header}
        </Header>

        <div className={s.UserLayout__content}>
          <Outlet />
        </div>

        {/*<Footer className={s.UserLayout__footer} />*/}
      </div>
    </div>
  );
};
