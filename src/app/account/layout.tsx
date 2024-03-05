"use client";
import React from "react";
import { PageWrapper } from "@/components/ui/PageWrapper/PageWrapper";
import styles from "./styles.module.scss";
import { FiltersProfileWrapper } from "../../components/ui/FiltersProfileWrapper/ui/FiltersProfileWrapper";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles.pageWrapper}>
      <PageWrapper className={styles.profileWrapper}>
        <h2 className={styles.title}>Личный кабинет</h2>
        {children}
      </PageWrapper>
      <FiltersProfileWrapper />
    </section>
  );
}
