import { Link as LinkRouter } from 'react-router-dom';
import clsx from 'clsx';
import { ReactFCC } from '../../../../utils/ReactFCC';
import { Link, LinkSize, LinkVariant } from '../../../../components/Link';
import s from './Footer.module.scss';

export interface FooterProps {
  /**
   * Дополнительный css-класс
   */
  className?: string;
}

export const Footer: ReactFCC<FooterProps> = (props) => {
  const { className } = props;

  return (
    <div className={clsx(s.Footer, className)}>
      <span className={s.Footer__name}>© Tender Hack Dashboard. 2023</span>

      <div className={s.Footer__links}>
        {/*<Link*/}
        {/*  className={s.Footer__link}*/}
        {/*  component={LinkRouter}*/}
        {/*  to={'/'}*/}
        {/*  variant={LinkVariant.SECONDARY}*/}
        {/*  size={LinkSize.MEDIUM}*/}
        {/*  underlined={false}*/}
        {/*  standalone>*/}
        {/*  Политика конфиденциальности*/}
        {/*</Link>*/}
      </div>
    </div>
  );
};
