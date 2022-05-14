import { FC, FunctionComponent } from "react";
import style from './content.module.css';

interface Props { }

const Content: FC<Props> = ({ children }) => {
  return (
    <section className={style[`main-page`]}>
      {children}
    </section>
  );
}

export default Content;