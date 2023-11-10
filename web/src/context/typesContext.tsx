export type ToastMessageData = {
  message: string;
  status: string;
};

type RoleProps = "USER" | "ADMIN";

export type RouterRole = {
  path: string;
  role: RoleProps;
};

export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  annotations: [];
  role: RoleProps;
};

export type UserDTOProps = Omit<UserProps, "name" | "email" | "password">;

export type TokenUser = {
  token: string;
  user: UserProps;
};

export type EventLog = {
  id: string;
  user: UserProps;
  timestamp: Date;
  eventType: string;
  eventDetails: string;
};

export type AuthenticationDTO = {
  email: string;
  password: string;
};
