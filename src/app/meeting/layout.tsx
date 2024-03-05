import { ReactNode } from "react";
import styles from "./styles.module.scss";
import { PageWrapper } from "@/components/ui/PageWrapper/PageWrapper";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <PageWrapper>
      <h2 className={styles.title}>Мероприятие</h2>
      {children}
    </PageWrapper>
  );
}
