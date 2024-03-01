import Link from "next/link";
import styles from "./CustomLink.module.scss";
import { Icon } from "../Icon/Icon";
import { memo } from "react";
import clsx from "clsx";

interface CustomLinkProps {
  href: string;
  className?: string;
  Svg?: React.VFC<React.SVGProps<SVGSVGElement>>;
  text: string;
  onClick?: () => void;
}

export const CustomLink = memo((props: CustomLinkProps) => {
  const { href, className, Svg, text, onClick } = props;
  return (
    <Link href={href} className={clsx(styles.link, [className])} onClick={onClick}>
      {Svg && <Icon Svg={Svg} className={clsx(styles.icon, [className])} />}
      <p>{text}</p>
    </Link>
  );
});
