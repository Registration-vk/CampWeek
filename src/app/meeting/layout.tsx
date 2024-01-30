import React from "react";

import styles from "./styles.module.scss";
import { PageWrapper } from "@/components/ui/PageWrapper/PageWrapper";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper className={styles.container}>
      <h2 className={styles.title}>Мероприятие</h2>
      {children}
    </PageWrapper>
  );
}
