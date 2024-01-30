import React from "react";
import { PageWrapper } from "@/components/ui/PageWrapper/PageWrapper";
import styles from "./styles.module.scss";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper className={styles.profileWrapper}>
      <h2 className={styles.title}>Личный кабинет</h2>
      {children}
    </PageWrapper>
  );
}
