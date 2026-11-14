import { useState } from "react";
import { signOut } from "@/lib/auth/client";
import { useAuthModal } from "@/lib/auth/modal-context";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { UI_TEXT, useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function AccountSlot() {
  const { user, isPending } = useCurrentUserState();
  const { openAuthModal } = useAuthModal();
  const { lang } = useLanguage();
  const t = UI_TEXT[lang];
  const [signingOut, setSigningOut] = useState(false);

  if (isPending) {
    return (
      <div
        className="bg-surface-2 size-11 shrink-0 animate-pulse rounded-full"
        aria-hidden="true"
      />
    );
  }

  if (!user) {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-11 px-4"
        onClick={openAuthModal}
      >
        {t.signIn}
      </Button>
    );
  }

  const label = user.displayName ?? user.primaryEmail ?? "Аккаунт";

  return (
    <div className="flex min-w-0 items-center gap-2">
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt=""
          className="size-8 shrink-0 rounded-full object-cover outline outline-1 -outline-offset-1 outline-foreground/10"
        />
      ) : (
        <span className="bg-surface-2 text-foreground grid size-8 shrink-0 place-items-center rounded-full text-xs font-medium">
          {label.charAt(0).toUpperCase()}
        </span>
      )}
      <span className="hidden max-w-28 truncate text-sm text-foreground sm:inline">
        {label}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-11 shrink-0"
        disabled={signingOut}
        onClick={() => {
          setSigningOut(true);
          void signOut().catch(() => setSigningOut(false));
        }}
      >
        {signingOut ? t.signingOut : t.signOut}
      </Button>
    </div>
  );
}
