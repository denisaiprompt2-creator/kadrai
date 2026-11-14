import { createContext, useContext } from "react";

export type AuthModalContextValue = {
  open: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

export const AuthModalContext = createContext<AuthModalContextValue>({
  open: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
});

export function useAuthModal() {
  return useContext(AuthModalContext);
}
