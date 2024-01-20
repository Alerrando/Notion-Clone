export type ToastMessageData = {
  message: string;
  status: string;
};

type RoleProps = "USER" | "ADMIN";

export type RouterRole = {
  path: string;
  role: RoleProps;
};

export type AnnotationType = {
  id: string;
  title: string;
  content: string;
  lastUpdate: Date;
  createdBy: Date;
};

export type UserProps = {
  name: string;
  email: string;
  password: string;
  annotations: AnnotationType[];
  role: RoleProps;
};

export type AuthenticationDTO = {
  email: string;
  password: string;
};

export type UserDTOProps = Omit<UserProps, "name" | "email" | "password">;

export type ResponseUser = {
  annotation: AnnotationType[];
  role: RoleProps;
};

export type EventLog = {
  id: string;
  user: UserProps;
  timestamp: Date;
  eventType: string;
  eventDetails: string;
};
