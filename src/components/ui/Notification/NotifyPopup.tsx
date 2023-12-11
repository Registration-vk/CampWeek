import { PropsWithChildren } from "react";

import styles from "./styles.module.scss";

const NotifyPopup = ({ children }: PropsWithChildren) => {
  return <div className={styles.notification}>{children}</div>;
};

export default NotifyPopup;
