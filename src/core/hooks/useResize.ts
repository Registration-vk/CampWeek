"use client";
import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

const SCREEN_XS = 360;
const SCREEN_MD = 768;
const SCREEN_LG = 1024;
const SCREEN_XL = 1280;

interface ResizeResult {
  width: number;
  height: number;
  isScreenSm: boolean;
  isScreenMd: boolean;
  isScreenLg: boolean;
  isScreenXl: boolean;
}

export const useResize = (): ResizeResult => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);
  const handleResize = useDebounce((event: UIEvent) => {
    setWidth((event.target as Window).innerWidth);
    setHeight((event.target as Window).innerHeight);
  }, 500);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return {
    width,
    height,
    isScreenSm: width >= SCREEN_XS,
    isScreenMd: width >= SCREEN_MD,
    isScreenLg: width >= SCREEN_LG,
    isScreenXl: width >= SCREEN_XL,
  };
};
