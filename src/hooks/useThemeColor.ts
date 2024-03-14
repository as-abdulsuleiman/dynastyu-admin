/** @format */

import { FC } from "react";
import { useTheme } from "next-themes";

const UseThemeColor = () => {
  const { theme, setTheme } = useTheme();

  return theme;
};

export default UseThemeColor;
