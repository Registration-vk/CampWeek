import { ReactNode, useState } from "react";

import cls from "./NotifyPopup.module.scss";
import clsx from "clsx";

interface NotifyPopupProps {
  children: ReactNode;
  text: string;
  className?: string;
}

export const NotifyPopup = (props: NotifyPopupProps) => {
  const { children, text, className } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={clsx(cls.notifyContainer, className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && <div className={cls.notify}>{text}</div>}
    </div>
  );
};
