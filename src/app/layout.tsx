import type { Metadata } from "next";

import React from "react";

import { Manrope } from "next/font/google";

import { Header } from "@/components/ui/Header/Header";
import { Aside } from "@/components/ui/index";
import { QueryProvider } from "@/core/providers";

import { UserProvider } from "./context/context";

import styles from "./styles.module.scss";
import "./styles/global.scss";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Неделя вожатых",
  description: "Описание недели вожатых",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="ru">
      <body className={manrope.className}>
        <Header />
        <UserProvider>
          <QueryProvider>
            <div className={styles.Container}>
              {children}
              <Aside />
            </div>
          </QueryProvider>
        </UserProvider>       
      </body>
    </html>
  );
}
