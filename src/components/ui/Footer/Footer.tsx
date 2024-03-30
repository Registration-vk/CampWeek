import { ROUTES } from "@/core/routes";
import { Icon } from "../Icon/Icon";
import BirdIconSmall from "./assets/smallBird.svg";
import Union from "./assets/union.svg";
import Link from "next/link";
import styles from "./Footer.module.scss";
import { Button } from "../Button/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { getUserIsAuth } from "@/core/store/slices/userAuthSlice";
import { NotifyPopup } from "../Notification/NotifyPopup";

export const Footer = () => {
  const isAuth = useSelector(getUserIsAuth);
  const router = useRouter();
  const onClick = () => {
    router.push(ROUTES.application.admin.path);
  };

  const adminButton = () => {
    if (!isAuth) {
      return (
        <NotifyPopup text="Авторизуйтесь">
          <Button variant="loadMore" onClick={onClick} disabled className={styles.adminButton}>
            <Icon Svg={Union} />
            Кабинет администратора
          </Button>
        </NotifyPopup>
      );
    } else {
      return (
        <Button variant="loadMore" onClick={onClick} className={styles.adminButton}>
          <Icon Svg={Union} />
          Кабинет администратора
        </Button>
      );
    }
  };
  return (
    <section className={styles.footer}>
      <div className={styles.firstSection}>
        <div className={styles.navbarLogo}>
          <Icon Svg={BirdIconSmall} />
          <Link href={ROUTES.application.path} className={styles.link}>
            Неделя вожатства
          </Link>
        </div>
        <div className={styles.socialWrapper}>Соцсети</div>
        {adminButton()}
      </div>
      <div className={styles.secondSection}>
        <div>Все права защищены.© 2019-2024</div>
        <div className={styles.politicWrapper}>
          <div>Соглашение</div>
          <div>Политика конфидициальности</div>
        </div>
      </div>
    </section>
  );
};
