"use client";
import { ButtonAuthorization } from "@/components/modules/ButtonAuthorization/ButtonAuthorization";
import BottomLeftIcon from "./assets/bottomLeft.svg";
import BottomRightIcon from "./assets/bottomRight.svg";
import TopLeftIcon from "./assets/topLeft.svg";
import TopTightIcon from "./assets/topRight.svg";

import cls from "./Title.module.scss";
import { Icon } from "../Icon/Icon";
import { useSelector } from "react-redux";
import { getUser } from "@/core/store/slices/userAuthSlice";

export const Title = () => {
  const { isAuth } = useSelector(getUser);
  return (
    <div className={cls.titleWrapper}>
      <div className={cls.titleWrapperContent}>
        <div className={cls.titleHeadWrapper}>
          <h1 className={cls.titleHead}>НЕДЕЛЯ ВОЖАТСТВА</h1>
          <div className={cls.titleCall}>Присоединяйся!</div>
        </div>
        <p className={cls.titleText}>
          Мероприятия для работников и организаторов лагерей в разных городах.
        </p>
        {!isAuth && <ButtonAuthorization />}
        <Icon Svg={TopLeftIcon} className={cls.titleTopLeftIcon}></Icon>
        <Icon Svg={TopTightIcon} className={cls.titleTopRightIcon}></Icon>
        <Icon Svg={BottomLeftIcon} className={cls.titleBottomLeftIcon}></Icon>
        <Icon Svg={BottomRightIcon} className={cls.titleBottomRightIcon}></Icon>
      </div>
    </div>
  );
};
