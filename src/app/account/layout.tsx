"use client";
import React, { useEffect } from "react";
import { PageWrapper } from "@/components/ui/PageWrapper/PageWrapper";
import styles from "./styles.module.scss";
import { FiltersProfileWrapper } from "../../components/ui/FiltersProfileWrapper/ui/FiltersProfileWrapper";
import { useAppDispatch } from "@/core/store/hooks/typingHooks";
import { fetchUserAuth } from "@/core/store/services/fetchUserAuth";
import { userActions } from "@/core/store/slices/userAuthSlice";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.getUserIdFromCookie());
    dispatch(fetchUserAuth());
  }, [dispatch]);

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
