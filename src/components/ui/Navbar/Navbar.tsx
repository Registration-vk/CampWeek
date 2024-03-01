"use client";
import { Icon } from "../Icon/Icon";
import styles from "./Navbar.module.scss";
import BirdIcon from "./assets/Bird.svg";
import BirdIconSmall from "./assets/smallBird.svg";
import ProfileIcon from "./assets/profile.svg";
import MeetingsIcon from "./assets/meetings.svg";
import MeetingCreateIcon from "./assets/createMeeting.svg";
import menuProfileIcon from "./assets/menuProfile.svg";
import menuLogOut from "./assets/menuLogOut.svg";
import closeButtonIcon from "./assets/closeButton.svg";
import Link from "next/link";
import { ROUTES } from "@/core/routes";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown } from "../Dropdown/ui/Dropdown";
import { useUserId } from "@/app/context/context";
import Cookies from "js-cookie";
// import { useResize } from "@/core/hooks/useResize";
import { memo, useCallback, useState } from "react";
// import { Drawer } from "../Drawer/ui/Drawer/Drawer";
import { CustomLink } from "../CustomLink/CustomLink";
import { ButtonAuthorization } from "@/components/modules/ButtonAuthorization/ButtonAuthorization";
import { Button } from "../Button/Button";
import axios from "axios";
import { API_BASE_URL, API_VERSION } from "@/core/constants";

export const Navbar = memo(() => {
  const { isAuth, setUserId, setIsAuth, isLoading } = useUserId();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const { width } = useResize();
  const width = 1200;
  const currentPathname = usePathname();
  const router = useRouter();

  //TODO: решить баг с переходом на страницу при выходе из личного кабинета
  //TODO: убрать перерисовки при изменении ширина окна

  const onLogout = useCallback(() => {
    router.replace("/");
    setUserId(null);
    setIsAuth(false);
    setIsOpen(false);
    localStorage.removeItem("token");
    Cookies.remove("access_token");
  }, [router, setIsAuth, setUserId]);

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const meetingsLink = (
    <CustomLink
      href={ROUTES.application.path}
      className={currentPathname === ROUTES.application.path ? styles.activePath : styles.path}
      Svg={MeetingsIcon}
      text="Мероприятия"
      onClick={onCloseDrawer}
    />
  );

  const meetingCreateLink = (
    <CustomLink
      href={ROUTES.application.meetingCreate.path}
      className={
        currentPathname === ROUTES.application.meetingCreate.path ? styles.activePath : styles.path
      }
      Svg={MeetingCreateIcon}
      text="Создать мероприятие"
      onClick={onCloseDrawer}
    />
  );

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Icon Svg={width <= 360 ? BirdIconSmall : BirdIcon} />
        <Link href={ROUTES.application.path} className={styles.link}>
          Неделя вожатства
        </Link>
      </div>
      {isAuth === false && isLoading === false && (
        <ButtonAuthorization text={width <= 546 ? "Войти" : "Войти через VK ID"} />
      )}
      {isAuth && width > 768 && (
        <>
          <div className={styles.navbarMeetings}>
            {meetingsLink}
            {meetingCreateLink}
          </div>
          <Dropdown
            trigger={<Icon Svg={ProfileIcon} />}
            items={[
              {
                content: (
                  <>
                    <Icon Svg={menuProfileIcon} />
                    <p>Личный кабинет</p>
                  </>
                ),
                href: "/account",
              },
              {
                content: (
                  <>
                    <Icon Svg={menuLogOut} />
                    <p>Выход</p>
                  </>
                ),
                onClick: onLogout,
                variant: "clear",
              },
            ]}
          />
        </>
      )}
      {isAuth && width <= 768 && (
        <>
          <Button onClick={onOpenDrawer} variant="burger">
            <span></span>
            <span></span>
            <span></span>
          </Button>
          {/* <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
            <Icon Svg={closeButtonIcon} className={styles.closeButton} onClick={onCloseDrawer} />
            <div className={styles.contentWrapper}>
              <div className={styles.navbarMeetings}>
                {meetingsLink}
                {meetingCreateLink}
              </div>
              <div className={styles.profileMobile}>
                <CustomLink
                  href={ROUTES.application.profile.path}
                  Svg={ProfileIcon}
                  text="Личный кабинет"
                  onClick={onCloseDrawer}
                />
                <CustomLink
                  href={ROUTES.application.path}
                  Svg={menuLogOut}
                  text="Выход"
                  onClick={onLogout}
                />
              </div>
            </div>
          </Drawer> */}
        </>
      )}
    </div>
  );
});
