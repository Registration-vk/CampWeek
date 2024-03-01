import { PropsWithChildren } from "react";

import { Icon } from "@/assets/icons/Icon";

import styles from "./SmallCard.module.scss";

type SmallCardProps = {
  subtitle?: string;
  title?: string;
  fullName?: string;
  typeEvent?: string;
  date?: string;
  timeStart?: string;
  timeEnd?: string;
  description?: string;
  region?: string;
};

export const SmallCard = (props: SmallCardProps) => {
  const {
    date,
    timeStart,
    timeEnd,
    description,
    title,
    fullName,
    typeEvent,
    region = "Онлайн",
  } = props;

  return (
    <section className={styles.Banner}>
      {title && <div className={styles.Banner__title}>{title}</div>}
      <div className={styles.Banner__description}>{description}</div>
      <div>
        <div>{date}</div>
        <div>{`${timeStart} - ${timeEnd}`}</div>
        <div>{region}</div>
      </div>
      <div className={styles.Banner__footer}>
        {fullName && (
          <div className={styles.Banner__item}>
            <div className={styles.Banner__item_icon}>
              <Icon variant={"user"} />
            </div>
            <div className={styles.Banner__item_text}>{fullName}</div>
          </div>
        )}
        {typeEvent && (
          <div className={styles.Banner__item}>
            <div className={styles.Banner__item_icon}>
              <Icon variant={"users"} />
            </div>
            <div className={styles.Banner__item_text}>{typeEvent}</div>
          </div>
        )}
      </div>
    </section>
  );
};
