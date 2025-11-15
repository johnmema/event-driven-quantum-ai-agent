export type AuthActionState = {
  status: "idle" | "success" | "error";
  message: string;
  redirectTo?: string | null;
};

export const defaultAuthActionState: AuthActionState = {
  status: "idle",
  message: "",
  redirectTo: null,
};
