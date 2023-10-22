import clsx from 'clsx';
import { ReactFCC } from '../../../../utils/ReactFCC';
import s from './Header.module.scss';
import { ReactComponent as BurgerIcon } from './assets/burger.svg';
import { useIsMobile } from '../../../../hooks/useIsMobile';

export interface HeaderProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
  /**
   * Обработчик закрытия сайдбара
   */
  onOpenSidebar: () => void;
}

export const Header: ReactFCC<HeaderProps> = (props) => {
  const { children, className, onOpenSidebar } = props;

  const isMobile = useIsMobile();

  return (
    <div className={clsx(s.Header, className)}>
      <div className={s.Header__main}>
        <button className={s.Header__user}>
          <div className={s.Header__name}>Иванов Иван Петрович</div>
          <div className={s.Header__email}>ivan.ivanov.gmail.com</div>
        </button>

        {isMobile && <BurgerIcon className={s.Header__burger} onClick={onOpenSidebar} />}

        {/*{isMobile && <IconButton icon={Icons.BURGER} variant={IconButtonVariant.ghost} onClick={onOpenSidebar} />}*/}

        {/*<ContextMenu {...contextMenuProps} />*/}
      </div>

      <div className={s.Header__additional}>{children}</div>
    </div>
  );
};
