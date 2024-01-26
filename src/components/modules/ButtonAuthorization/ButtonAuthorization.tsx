"use client"
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui";
import { API_BASE_URL, API_VERSION } from "@/core/constants";
import VKIcon from './assets/vk-icon.svg'

import styles from "./styles.module.scss";
import { Icon } from "@/components/ui/Icon/Icon";

export const ButtonAuthorization = () => {
  const router = useRouter();

  const redirectAuthorization = async () => {
    router.push(`${API_BASE_URL}/api/${API_VERSION}/user/vk_auth_start`);   
  }

  return (
    <Button className={styles.authorization} onClick={redirectAuthorization}>
      <Icon Svg={VKIcon}></Icon>
      <p>Войти через VK ID</p>
    </Button>
  );
};
