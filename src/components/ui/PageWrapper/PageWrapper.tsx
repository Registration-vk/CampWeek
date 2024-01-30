import { ReactNode } from "react";
import clsx from "clsx";

import styles from "./PageWrapper.module.scss";

interface PageWrapper {
  children: ReactNode;
  className?: string;
}

export const PageWrapper = ({ children, className }: PageWrapper) => {
  return <main className={clsx(styles.container, [className])}>{children}</main>;
};
