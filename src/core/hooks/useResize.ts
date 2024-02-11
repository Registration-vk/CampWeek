// import { useState, useEffect } from "react";

// const SCREEN_XS = 360;
// const SCREEN_MD = 768;
// const SCREEN_LG = 1024;
// const SCREEN_XL = 1280;

// interface ResizeResult {
//   width: number;
//   height: number;
//   isScreenSm: boolean;
//   isScreenMd: boolean;
//   isScreenLg: boolean;
//   isScreenXl: boolean;
// }

// export const useResize = (): ResizeResult => {
//   const [width, setWidth] = useState<number>(window.innerWidth);
//   const [height, setHeight] = useState<number>(window.innerHeight);

//   useEffect(() => {
//     const handleResize = (event: UIEvent) => {
//       setWidth((event.target as Window).innerWidth);
//       setHeight((event.target as Window).innerHeight);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return {
//     width,
//     height,
//     isScreenSm: width >= SCREEN_XS,
//     isScreenMd: width >= SCREEN_MD,
//     isScreenLg: width >= SCREEN_LG,
//     isScreenXl: width >= SCREEN_XL,
//   };
// };
