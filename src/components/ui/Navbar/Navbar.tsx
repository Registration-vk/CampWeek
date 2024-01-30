"use client";
import { Icon } from "../Icon/Icon";
import styles from "./Navbar.module.scss";
import BirdIcon from "./assets/Bird.svg";
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
import { useResize } from "@/core/hooks/useResize";
import { Burger } from "../Burger/Burger";
import { useCallback, useState } from "react";
import { Drawer } from "../Drawer/ui/Drawer/Drawer";
import { CustomLink } from "../CustomLink/CustomLink";
import { ButtonAuthorization } from "@/components/modules/ButtonAuthorization/ButtonAuthorization";

export const Navbar = () => {
  const { isAuth, setUserId, setIsAuth } = useUserId();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { width } = useResize();
  const currentPathname = usePathname();
  const router = useRouter();

  //TODO: решить баг с переходом на страницу при выходе из личного кабинета

  const onLogout = () => {
    router.replace("/");
    setUserId(null);
    setIsAuth(false);
    setIsOpen(false);
    localStorage.removeItem("token");
    Cookies.remove("access_token");
  };

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
        <Icon Svg={BirdIcon} />
        <Link href={ROUTES.application.path} className={styles.link}>
          Неделя вожатства
        </Link>
      </div>
      {!isAuth && <ButtonAuthorization />}
      {width > 768 && isAuth && (
        <>
          <div className={styles.navbarMeetings}>
            {meetingsLink}
            {meetingCreateLink}
          </div>
          <div className={styles.profileIcon}>
            <Dropdown
              trigger={<Icon Svg={ProfileIcon} className={styles.profileIcon} />}
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
          </div>
        </>
      )}
      {width <= 768 && isAuth && (
        <>
          <Burger onClick={onOpenDrawer} />
          <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
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
          </Drawer>
        </>
      )}
    </div>
  );
};
