"use client";
import Loading from "@/app/account/loading";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { ButtonAuthorization } from "@/components/modules/ButtonAuthorization/ButtonAuthorization";

import { Button } from "../Button/Button";

import classes from "./styles.module.scss";
import { useSelector } from "react-redux";
import { getUser, getUserIsAuth, userActions } from "@/core/store/slices/userAuthSlice";
import { useAppDispatch } from "@/core/store/hooks/typingHooks";

type Props = {
  isSignedIn: boolean;
};

// TODO: удалить компонент полностью

export default function AuthBlock(props: Props) {
  const { isAuth, isLoading } = useSelector(getUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onLogin = () => {
    router.push("/account");
  };

  const onLogout = () => {
    router.push("/");
    dispatch(userActions.logout());
    localStorage.removeItem("token");
    Cookies.remove("access_token");
  };

  if (isLoading || isLoading === null) {
    return <Loading />;
  }

  if (isAuth) {
    return (
      <aside className={classes.authorization}>
        <div className={classes.infoAuth}>
          <Button className={classes.buttonLogin} onClick={onLogin}>
            Личный кабинет
          </Button>
        </div>
        <div className={classes.checkLinkBox}>
          <Button className={classes.buttonLogout} onClick={onLogout}>
            Выход
          </Button>
        </div>
      </aside>
    );
  } else {
    return (
      <aside className={classes.authorization}>
        <div className={classes.infoNoAuth}>
          <p className={classes.infoText}>
            Чтобы зарегистрироваться на мероприятия необходимо авторизоваться через ВКонтакте
          </p>
          <ButtonAuthorization />
        </div>
        <div className={classes.checkLinkBox}>
          <a className={classes.orgAuthLink} href="#">
            Вход для админов
          </a>
        </div>
      </aside>
    );
  }
  // AuthText = (
  //   <div className={classes.infoAuth}>
  //     <p className={classes.infoText}>
  //       Проверьте, что можете получать принимать сообщения от <a href="#">чат-бота группы</a> для
  //       получения уведомлений
  //     </p>
  //     <a className={classes.checkLink} href="#">
  //       Проверить
  //     </a>
  //   </div>
  // );
}
