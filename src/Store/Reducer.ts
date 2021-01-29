import { AuthUserData } from "../API/types";

export type TAction = {
  type: "AuthUserData" | "Token" | "Auth";
  payload: any;
};

export type Tstate = {
  Token: string;
  Auth: string;
  AuthUserData: AuthUserData | null;
};

const initialState: Tstate = {
  Token: "",
  Auth: "",
  AuthUserData: null,
};

export const Reducer = (state: Tstate = initialState, action: TAction) => {
  switch (action.type) {
    case "Token":
      return { ...state, Token: action.payload };
    case "Auth":
      return { ...state, Auth: action.payload };
    case "AuthUserData":
      return { ...state, AuthUserData: action.payload };
    default:
      return state;
  }
};
