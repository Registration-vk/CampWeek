import { ComponentProps } from "react";

import Link from "next/link";

import styles from "./styles.module.scss";

type Props = {
  link: string;
  isDisabled?: boolean;
} & ComponentProps<"a">;

export const LinkItem = (props: Props) => {
  const { children, link } = props;
  return (
    <Link className={[styles.Link, props.isDisabled && styles.Link_disabled].join(" ")} href={link}>
      {children}
    </Link>
  );
};
