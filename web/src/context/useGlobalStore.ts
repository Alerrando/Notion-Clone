import { useContext } from "react";
import { ContextProps, StoreContext } from ".";

export const useGlobalStore = () => {
  const useStore = useContext(StoreContext);

  return {
    user: useStore((state: ContextProps) => state.user),
    setUser: useStore((state: ContextProps) => state.setUser),
    EventLogRegister: useStore((state: ContextProps) => state.EventLogRegister),
    verifyRoleUser: useStore((state: ContextProps) => state.verifyRoleUser),
  };
};
