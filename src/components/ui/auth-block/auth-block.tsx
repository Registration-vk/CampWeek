"use client"
import Loading from "@/app/account/loading";
import { useUserId } from "@/app/context/context";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";

import { ButtonAuthorization } from "@/components/modules/ButtonAuthorization/ButtonAuthorization";

import { Button } from "../Button/Button";

import classes from "./styles.module.scss";

type Props = {
  isSignedIn: boolean;
};

export default function AuthBlock(props: Props) {
  const { setUserId, isLoading, isAuth, setIsAuth } = useUserId()
  const router = useRouter();

  const onLogin = () => {
    router.push(`/account`);   
  }

  const onLogout = () => {
    router.push(`/`); 
    setUserId(null);
    setIsAuth(false)
    localStorage.removeItem('token')
    Cookies.remove('access_token')
  }

  if(isLoading) {
    <Loading/>
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
    )
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
  )
}
