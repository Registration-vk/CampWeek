import { memo } from "react";
import clsx from "clsx";
import styles from "./Icon.module.scss";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = memo(({ className, Svg, ...otherProps }: IconProps) => {
  return <Svg className={clsx(styles.icon, [className])} {...otherProps} />;
});
