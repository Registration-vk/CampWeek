import Image from "next/image";
import Link from "next/link";

import headerImg from "../../../assets/images/header.jpg"

import styles from "./styles.module.scss";

export const Header = () => {

  return (
    <header
      className={styles.header}
    >	
	<Link href="/">
		<Image src={headerImg} alt="Баннер неделя вожатства" priority={true}/>
	</Link>		
    </header>
  );
};
