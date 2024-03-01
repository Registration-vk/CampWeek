import Image from "next/image";
import Link from "next/link";

import headerImg from "../../../assets/images/header.png";

import styles from "./MainBanner.module.scss";

export const MainBanner = () => {
  return (
    <div className={styles.mainBanner}>
      <Link href="/">
        <Image src={headerImg} alt="Баннер неделя вожатства" priority={true} />
      </Link>
    </div>
  );
};
