"use client";
import React, { useEffect } from "react";
import { PageWrapper } from "@/components/ui/PageWrapper/PageWrapper";
import styles from "./styles.module.scss";
import { FiltersProfileWrapper } from "../../components/ui/FiltersProfileWrapper/ui/FiltersProfileWrapper";
import { useSelector } from "react-redux";
import { getUserIsAuth } from "../store/slices/userAuthSlice";
import { fetchUserAuth } from "../store/services/fetchUserAuth";
import { useAppDispatch } from "../store/hooks/typingHooks";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(getUserIsAuth);
  useEffect(() => {
    dispatch(fetchUserAuth());
  }, [dispatch, isAuth]);
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
