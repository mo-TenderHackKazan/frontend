import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { ReactFCC } from '../../../../utils/ReactFCC';
import { useIsMobile } from '../../../../hooks/useIsMobile';
import s from './Header.module.scss';
import { HOME_PAGE_ROUTE } from '../../../../app/routes';

export interface HeaderProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
}

export const Header: ReactFCC<HeaderProps> = (props) => {
  const { children, className } = props;

  return (
    <div className={clsx(s.Header, className)}>
      <div className={s.Header__main}>
        <button className={s.Header__user}>
          <div className={s.Header__name}>Иванов Иван Петрович</div>
          <div className={s.Header__email}>ivan.ivanov.gmail.com</div>
        </button>

        {/*{isMobile && <IconButton icon={Icons.BURGER} variant={IconButtonVariant.ghost} onClick={onOpenSidebar} />}*/}

        {/*<ContextMenu {...contextMenuProps} />*/}
      </div>

      <div className={s.Header__additional}>{children}</div>
    </div>
  );
};
