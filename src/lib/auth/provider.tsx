import { useCallback, useMemo, useState, type ReactNode } from "react";
import { AuthModal } from "@/components/auth-modal";
import { AuthModalContext } from "@/lib/auth/modal-context";

/**
 * App-wide client provider mounted once near the root (in `src/routes/__root.tsx`).
 * Hosts the global sign-in modal so any component can open it without navigating.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openAuthModal = useCallback(() => setOpen(true), []);
  const closeAuthModal = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openAuthModal, closeAuthModal }),
    [open, openAuthModal, closeAuthModal],
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      <AuthModal open={open} onOpenChange={setOpen} />
    </AuthModalContext.Provider>
  );
}
