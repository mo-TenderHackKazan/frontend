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
import { Footer } from './Footer';

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

  const isMobile = useIsMobile();

  return (
    <div className={clsx(s.UserLayout, className)}>
      <Sidebar className={s.UserLayout__sidebar} isOpen={!isMobile} />

      <div className={clsx(s.UserLayout__main, !isMobile && s.UserLayout__main_shrink)}>
        <Header className={s.UserLayout__header}>{header}</Header>

        <div className={s.UserLayout__content}>
          <Outlet />
        </div>

        {/*<Footer className={s.UserLayout__footer} />*/}
      </div>
    </div>
  );
};
