import { create } from "zustand";
import { createEventLog } from "../api";
import { routesRole } from "../routes";
import { EventLog, RouterRole, UserDTOProps, UserProps } from "./typesContext";

export const UserValueDefault: UserProps = {
  id: "0",
  name: "",
  email: "",
  password: "",
  level: 0,
  annotations: [],
  role: "USER",
};

const UserDTOValuesDefault: UserDTOProps = {
  id: "0",
  role: "",
  annotations: [],
};

type ContextProps = {
  user: UserDTOProps;
  addUser: (user: UserDTOProps) => void;
  EventLogRegister: (data: UserProps, eventTypeData: string, eventDetailsData: string) => void;
  verifyRoleUser: () => void;
};

export const useNotionContext = create<ContextProps>((set) => {
  return {
    user: UserDTOValuesDefault,
    addUser: (user: UserDTOProps) => set((state: ContextProps) => (state.user = user)),
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
  };
});

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
