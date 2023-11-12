import { createContext } from "react";
import { GetState, SetState, StoreApiWithPersist, create } from "zustand";
import { persist } from "zustand/middleware";
import { createEventLog } from "../api";
import { routesRole } from "../routes";
import { EventLog, RouterRole, UserDTOProps, UserProps } from "./typesContext";

export const UserValueDefault: UserProps = {
  id: "",
  name: "",
  email: "",
  password: "",
  level: 0,
  annotations: [],
  role: "USER",
};

const UserDTOValuesDefault: UserDTOProps = {
  id: "",
  role: "",
  annotations: [],
};

export type ContextProps = {
  user: UserDTOProps;
  setUser: (user: UserDTOProps) => void;
  EventLogRegister: (data: UserProps, eventTypeData: string, eventDetailsData: string) => void;
  verifyRoleUser: () => void;
};

const StoreContext = createContext<StoreApiWithPersist<ContextProps>>({} as StoreApiWithPersist<ContextProps>);

export const useNotionContext = create<
  ContextProps,
  SetState<ContextProps>,
  GetState<ContextProps>,
  StoreApiWithPersist<ContextProps>
>(
  persist<ContextProps>(
    (set: ContextProps) => ({
      user: UserDTOValuesDefault,
      setUser: (user: UserDTOProps) => set((state: ContextProps) => (state.user = user)),
      EventLogRegister: async (data: UserProps, eventTypeData: string, eventDetailsData: string) => {
        await createEventLogRegister(data, eventTypeData, eventDetailsData);
      },
      verifyRoleUser: () =>
        set((state: ContextProps) => {
          const pathName = window.location.pathname;
          if (pathName !== "/") {
            routesRole.forEach((route: RouterRole) => {
              if (pathName === route.path && route.role !== state.user.role) {
                window.location.href = "/";
              }
            });
          }
        }),
    }),
    {
      name: "user-notion",
      getStorage: () => localStorage,
    },
  ),
);

async function createEventLogRegister(data: UserProps, eventTypeData: string, eventDetailsData: string) {
  const dataLog: EventLog = {
    id: "0",
    user: data,
    timestamp: Date.now(),
    eventType: eventTypeData,
    eventDetails: eventDetailsData,
  };

  await createEventLog(dataLog);
}

function StoreProvider({ children }) {
  return <StoreContext.Provider value={useNotionContext}>{children}</StoreContext.Provider>;
}

export { StoreContext, StoreProvider };
