import type { Metadata } from "next";

import React from "react";

import { Nunito } from "next/font/google";

import { QueryProvider } from "@/core/providers";

import styles from "./styles.module.scss";
import "./styles/global.scss";
import { Navbar } from "@/components/ui/Navbar/Navbar";
import { StoreProvider } from "../core/store/StoreProvider/StoreProvider";

const nunito = Nunito({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Неделя вожатых",
  description: "Описание недели вожатых",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <html lang="ru">
        <body className={nunito.className}>
          <Navbar />
          <QueryProvider>
            <div className={styles.Container}>{children}</div>
          </QueryProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
