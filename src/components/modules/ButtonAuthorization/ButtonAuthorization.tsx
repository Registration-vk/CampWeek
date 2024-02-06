"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui";
import { API_BASE_URL, API_VERSION } from "@/core/constants";
import VKIcon from "./assets/vk-icon.svg";

import { Icon } from "@/components/ui/Icon/Icon";

interface ButtonAuthorizationProps {
  text?: string;
}

export const ButtonAuthorization = ({ text = "Войти через VK ID" }: ButtonAuthorizationProps) => {
  const router = useRouter();

  const redirectAuthorization = async () => {
    router.push(`${API_BASE_URL}/api/${API_VERSION}/user/vk_auth_start`);
  };

  return (
    <Button onClick={redirectAuthorization} variant="vk">
      <Icon Svg={VKIcon}></Icon>
      <p>{text}</p>
    </Button>
  );
};
