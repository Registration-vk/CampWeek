import type { Metadata } from "next";

import React from "react";

import { Manrope } from "next/font/google";

import { Aside } from "@/components/ui/Aside/Aside";
import { QueryProvider } from "@/core/providers";

import styles from "./styles.module.scss";
import "@/assets/styles/global.scss";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Неделя вожатых",
  description: "Описание недели вожатых",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={manrope.className}>
        <QueryProvider>
          <div className={styles.Container}>
            {children}
            <Aside />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
