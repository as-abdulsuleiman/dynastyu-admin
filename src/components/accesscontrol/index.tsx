/** @format */

import { useRootStore } from "@/mobx";
import { observer } from "mobx-react-lite";
import { FC } from "react";

interface AccessControlProps {
  name: string;
  children: React.ReactNode;
}

const AccessControl: FC<AccessControlProps> = ({ name, children }) => {
  const {
    permissionStore: { permissions },
  } = useRootStore();

  const permissionExists = permissions?.permissions?.some(
    (permission: any) => permission?.title === name
  );
  if (permissionExists) {
    return children;
  }
  return null;
};

export default observer(AccessControl);
