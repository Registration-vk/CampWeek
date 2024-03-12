import { ReactNode } from "react";
import styles from "./styles.module.scss";
import { PageWrapper } from "@/components/ui/PageWrapper/PageWrapper";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <PageWrapper>
      <h2 className={styles.title}>Мероприятия</h2>
      {children}
    </PageWrapper>
  );
}
