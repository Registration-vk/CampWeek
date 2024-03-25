import { memo, useCallback, useState } from "react";
import cls from "./Tabs.module.scss";
import clsx from "clsx";

export interface Tab {
  title: string;
}

interface TabsProps {
  tabs: Tab[];
  selected: string;
  numberSelected: number[];
  onTabClick: (title: string) => void;
}

export const Tabs = memo((props: TabsProps) => {
  const { tabs, selected, numberSelected, onTabClick } = props;

  const clickHandle = useCallback(
    (title: string) => () => {
      onTabClick(title);
    },
    [onTabClick],
  );
  return (
    <div>
      {tabs.map((tab, index) => (
        <button
          className={clsx(cls.tabsButton, {
            [cls.active]: tab.title === selected,
          })}
          onClick={clickHandle(tab.title)}
          key={tab.title}
        >
          <span className={cls.tabsTitle}>{tab.title}</span>
          <span className={cls.tabsNumber}>{numberSelected && numberSelected[index]}</span>
        </button>
      ))}
    </div>
  );
});
