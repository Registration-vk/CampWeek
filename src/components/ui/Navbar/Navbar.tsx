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

export const Navbar = () => {
  const { setUserId, setIsAuth } = useUserId();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { width } = useResize();
  const currentPathname = usePathname();
  const router = useRouter();
  const onLogout = () => {
    router.push(`/`);
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

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Icon Svg={BirdIcon}></Icon>
        <Link href={ROUTES.application.path} className={styles.link}>
          Неделя вожатства
        </Link>
      </div>
      {width > 768 && (
        <>
          <div className={styles.navbarMeetings}>
            <Link
              href={ROUTES.application.path}
              className={
                currentPathname === ROUTES.application.path ? styles.activePath : styles.path
              }
            >
              <div className={styles.navbarMeeting}>
                <Icon
                  Svg={MeetingsIcon}
                  className={
                    currentPathname === ROUTES.application.path ? styles.activePath : styles.path
                  }
                ></Icon>
                <p>Мероприятия</p>
              </div>
            </Link>
            <Link
              href={ROUTES.application.meetingCreate.path}
              className={
                currentPathname === ROUTES.application.meetingCreate.path
                  ? styles.activePath
                  : styles.path
              }
            >
              <div className={styles.navbarMeetingCreate}>
                <Icon
                  Svg={MeetingCreateIcon}
                  className={
                    currentPathname === ROUTES.application.meetingCreate.path
                      ? styles.activePath
                      : styles.path
                  }
                ></Icon>
                <p>Создать мероприятие</p>
              </div>
            </Link>
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
                },
              ]}
            />
          </div>
        </>
      )}
      {width <= 768 && (
        <>
          <Burger onClick={onOpenDrawer} />
          <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
            <Icon Svg={closeButtonIcon} className={styles.closeButton} onClick={onCloseDrawer} />
            <div className={styles.contentWrapper}>
              <div className={styles.navbarMeetings}>
                <Link
                  href={ROUTES.application.path}
                  className={
                    currentPathname === ROUTES.application.path ? styles.activePath : styles.path
                  }
                >
                  <div className={styles.navbarMeeting}>
                    <Icon
                      Svg={MeetingsIcon}
                      className={
                        currentPathname === ROUTES.application.path
                          ? styles.activePath
                          : styles.path
                      }
                    ></Icon>
                    <p>Мероприятия</p>
                  </div>
                </Link>
                <Link
                  href={ROUTES.application.meetingCreate.path}
                  className={
                    currentPathname === ROUTES.application.meetingCreate.path
                      ? styles.activePath
                      : styles.path
                  }
                >
                  <div className={styles.navbarMeetingCreate}>
                    <Icon
                      Svg={MeetingCreateIcon}
                      className={
                        currentPathname === ROUTES.application.meetingCreate.path
                          ? styles.activePath
                          : styles.path
                      }
                    ></Icon>
                    <p>Создать мероприятие</p>
                  </div>
                </Link>
              </div>
              <div className={styles.profileMobile}>
                <div onClick={() => router.push("/account")}>
                  <Icon Svg={ProfileIcon} className={styles.icons} />
                  <p>Личный кабинет</p>
                </div>
                <div onClick={onLogout}>
                  <Icon Svg={menuLogOut} className={styles.icons} />
                  <p>Выход</p>
                </div>
              </div>
            </div>
          </Drawer>
        </>
      )}
    </div>
  );
};
