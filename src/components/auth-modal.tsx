import { useEffect, useRef, useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AtSign, LoaderCircle, Lock, X as CloseIcon } from "lucide-react";
import { toast } from "sonner";
import { KadrMark } from "@/components/kadr-mark";
import { authClient, authEnabled, signIn } from "@/lib/auth/client";
import { UI_TEXT, useLanguage, type Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LAST_PROVIDER_KEY = "kadr.last-auth-provider";

type ProviderId = "grok-google" | "grok-x" | "grok-yandex";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.45a5.52 5.52 0 0 1-2.39 3.62v3.01h3.87c2.26-2.08 3.56-5.15 3.56-8.66Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.87-3.01c-1.07.72-2.44 1.15-4.06 1.15-3.12 0-5.77-2.11-6.72-4.95H1.28v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.28a7.21 7.21 0 0 1 0-4.56v-3.1H1.28a12 12 0 0 0 0 10.76l4-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.58 1.8l3.44-3.44C17.94 1.19 15.23 0 12 0A12 12 0 0 0 1.28 6.62l4 3.1c.95-2.84 3.6-4.95 6.72-4.95Z"
      />
    </svg>
  );
}

function XBrandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4.5 shrink-0 fill-current"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YandexIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#FC3F1D" />
      <path
        fill="#FFFFFF"
        d="M13.38 17.8V7.63h-1.08c-1.85 0-2.82.93-2.82 2.33 0 1.57.7 2.33 2.08 3.25l1.15.77-3.3 3.82H7.22l2.98-3.45c-1.7-1.17-2.64-2.37-2.64-4.27 0-2.46 1.72-4.14 4.76-4.14h3.01V17.8h-1.95Z"
      />
    </svg>
  );
}

function translateAuthError(lang: Language, message?: string | null): string {
  if (!message) {
    return lang === "en"
      ? "Could not sign in. Please try again."
      : "Не удалось выполнить вход. Попробуйте ещё раз.";
  }
  const lower = message.toLowerCase();
  if (lower.includes("invalid email or password")) {
    return lang === "en" ? "Invalid email or password." : "Неверная почта или пароль.";
  }
  if (lower.includes("already exists") || lower.includes("user already")) {
    return lang === "en"
      ? "An account with this email already exists — switch to Sign in."
      : "Аккаунт с такой почтой уже существует — переключитесь на «Войти».";
  }
  if (lower.includes("password") && lower.includes("short")) {
    return lang === "en"
      ? "Password must be at least 8 characters."
      : "Пароль должен содержать минимум 8 символов.";
  }
  if (lower.includes("pop-up blocked")) {
    return lang === "en"
      ? "Pop-up was blocked. Allow pop-ups or continue with email."
      : "Браузер заблокировал всплывающее окно. Разрешите поп-апы или войдите через почту.";
  }
  if (lower.includes("cancelled") || lower.includes("failed")) {
    return lang === "en"
      ? "External sign-in did not complete. You can sign in with email below."
      : "Вход через внешний сервис не завершён. Можно войти по почте ниже.";
  }
  return message;
}

export function AuthCardContent({
  onSuccess,
  showTitle = true,
}: {
  onSuccess?: () => void;
  showTitle?: boolean;
}) {
  const { lang } = useLanguage();
  const t = UI_TEXT[lang];
  const [lastUsed, setLastUsed] = useState<string | null>(null);
  const [busyProvider, setBusyProvider] = useState<ProviderId | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailExpanded, setEmailExpanded] = useState(false);
  const [emailMode, setEmailMode] = useState<"signin" | "signup">("signin");
  const [emailPending, setEmailPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      setLastUsed(window.localStorage.getItem(LAST_PROVIDER_KEY));
    } catch {
      /* ignore storage errors */
    }
  }, []);

  function rememberProvider(id: string) {
    try {
      window.localStorage.setItem(LAST_PROVIDER_KEY, id);
    } catch {
      /* ignore storage errors */
    }
  }

  async function handleOAuth(providerId: ProviderId) {
    if (!authEnabled || busyProvider || emailPending) return;
    setError(null);
    setBusyProvider(providerId);
    try {
      await signIn(providerId, { callbackURL: window.location.pathname || "/" });
      rememberProvider(providerId);
      await authClient.getSession().catch(() => null);
      toast.success(lang === "en" ? "Signed in." : "Вы вошли в аккаунт.");
      onSuccess?.();
    } catch (err) {
      setError(translateAuthError(lang, err instanceof Error ? err.message : null));
    } finally {
      setBusyProvider(null);
    }
  }

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!authEnabled || emailPending || busyProvider) return;
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailExpanded(true);
      emailInputRef.current?.focus();
      setError(lang === "en" ? "Enter your email address." : "Введите электронную почту.");
      return;
    }

    if (!emailExpanded) {
      setEmailExpanded(true);
      window.setTimeout(() => passwordInputRef.current?.focus(), 0);
      return;
    }

    if (!password) {
      passwordInputRef.current?.focus();
      setError(lang === "en" ? "Enter your password." : "Введите пароль.");
      return;
    }

    if (emailMode === "signup" && password.length < 8) {
      passwordInputRef.current?.focus();
      setError(
        lang === "en"
          ? "Password must be at least 8 characters."
          : "Пароль должен быть не короче 8 символов.",
      );
      return;
    }

    setEmailPending(true);
    try {
      if (emailMode === "signin") {
        const { error: signInError } = await authClient.signIn.email({
          email: trimmedEmail,
          password,
        });
        if (signInError) {
          setError(translateAuthError(lang, signInError.message));
          return;
        }
      } else {
        const fallbackName =
          trimmedEmail.split("@")[0]?.slice(0, 40) ||
          (lang === "en" ? "User" : "Пользователь");
        const { error: signUpError } = await authClient.signUp.email({
          email: trimmedEmail,
          password,
          name: fallbackName,
        });
        if (signUpError) {
          setError(translateAuthError(lang, signUpError.message));
          return;
        }
      }

      rememberProvider("email");
      await authClient.getSession().catch(() => null);
      toast.success(
        emailMode === "signup"
          ? lang === "en"
            ? "Account created and signed in."
            : "Аккаунт создан, вы вошли."
          : lang === "en"
            ? "Signed in."
            : "Вы вошли в аккаунт.",
      );
      onSuccess?.();
    } catch (err) {
      setError(translateAuthError(lang, err instanceof Error ? err.message : null));
    } finally {
      setEmailPending(false);
    }
  }

  const busy = busyProvider !== null || emailPending;

  return (
    <div className="w-full">
      {showTitle ? (
        <div className="mb-6 flex flex-col items-center text-center">
          <h2 className="font-display text-2xl leading-tight font-semibold tracking-display text-foreground sm:text-[28px]">
            {t.authModalTitle}
            <span className="mt-1 flex items-center justify-center gap-2">
              <span>{t.authModalPrep}</span>
              <span className="inline-flex items-center gap-2 rounded-xl bg-black px-2.5 py-0.5 dark:bg-transparent dark:p-0">
                <KadrMark tone="accent" className="size-7 shrink-0" />
                <span className="font-bold tracking-display text-[#ccff00]">
                  KADR
                </span>
              </span>
            </span>
          </h2>
        </div>
      ) : null}

      {!authEnabled ? (
        <p className="py-4 text-center text-sm text-muted-foreground">
          {t.authDisabled}
        </p>
      ) : (
        <>
          <div className="space-y-2.5">
            <button
              type="button"
              disabled={busy}
              onClick={() => void handleOAuth("grok-google")}
              className="relative flex h-12 w-full items-center justify-center rounded-xl bg-foreground px-4 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <span className="absolute left-4 flex items-center">
                {busyProvider === "grok-google" ? (
                  <LoaderCircle className="size-5 animate-spin" />
                ) : (
                  <GoogleIcon />
                )}
              </span>
              <span>{t.authContinueGoogle}</span>
              {lastUsed === "grok-google" ? (
                <span className="absolute -top-2 right-2 rounded-md border border-[#ccff00]/40 bg-black px-2 py-0.5 text-[10px] leading-none font-bold tracking-wide text-[#ccff00]">
                  {t.authLastUsed}
                </span>
              ) : null}
            </button>

            <button
              type="button"
              disabled={busy}
              onClick={() => void handleOAuth("grok-x")}
              className="relative flex h-12 w-full items-center justify-center rounded-xl border border-border bg-surface-2 px-4 text-sm font-medium text-foreground transition-colors hover:bg-surface-3 disabled:opacity-50"
            >
              <span className="absolute left-4 flex items-center">
                {busyProvider === "grok-x" ? (
                  <LoaderCircle className="size-5 animate-spin" />
                ) : (
                  <XBrandIcon />
                )}
              </span>
              <span>{t.authContinueX}</span>
            </button>

            <button
              type="button"
              disabled={busy}
              onClick={() => void handleOAuth("grok-yandex")}
              className="relative flex h-12 w-full items-center justify-center rounded-xl border border-border bg-surface-2 px-4 text-sm font-medium text-foreground transition-colors hover:bg-surface-3 disabled:opacity-50"
            >
              <span className="absolute left-4 flex items-center">
                {busyProvider === "grok-yandex" ? (
                  <LoaderCircle className="size-5 animate-spin" />
                ) : (
                  <YandexIcon />
                )}
              </span>
              <span>{t.authContinueYandex}</span>
            </button>
          </div>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">{t.authOrEmail}</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={(e) => void handleEmailSubmit(e)} noValidate className="space-y-2.5">
            <div className="relative flex items-center">
              <AtSign className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground" />
              <input
                ref={emailInputRef}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (!emailExpanded && e.target.value.trim().length > 0) {
                    setEmailExpanded(true);
                  }
                }}
                placeholder={t.authEmailPlaceholder}
                autoComplete="email"
                aria-label={t.authEmailAria}
                disabled={busy}
                className="h-12 w-full rounded-xl border border-border bg-surface-2 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:opacity-50"
              />
            </div>

            {emailExpanded ? (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="relative flex items-center">
                  <Lock className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground" />
                  <input
                    ref={passwordInputRef}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={
                      emailMode === "signup"
                        ? t.authPasswordNewPlaceholder
                        : t.authPasswordPlaceholder
                    }
                    autoComplete={
                      emailMode === "signup" ? "new-password" : "current-password"
                    }
                    aria-label={t.authPasswordAria}
                    disabled={busy}
                    className="h-12 w-full rounded-xl border border-border bg-surface-2 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:opacity-50"
                  />
                </div>
                <div className="flex items-center justify-between px-1 text-xs text-muted-foreground">
                  <span>
                    {emailMode === "signin" ? t.authNoAccount : t.authHaveAccount}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setEmailMode((m) => (m === "signin" ? "signup" : "signin"));
                    }}
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    {emailMode === "signin"
                      ? t.authCreateAccount
                      : t.authSignInWithPassword}
                  </button>
                </div>
              </div>
            ) : null}

            {error ? (
              <p role="alert" className="px-1 text-xs leading-relaxed text-destructive">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={busy}
              className={cn(
                "flex h-12 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-all disabled:opacity-50",
                emailExpanded
                  ? "border border-[#ccff00]/30 bg-black font-semibold text-[#ccff00] hover:opacity-90"
                  : "border border-border bg-surface-2 text-foreground hover:bg-surface-3",
              )}
            >
              {emailPending ? <LoaderCircle className="size-4 animate-spin" /> : null}
              <span>
                {emailExpanded && emailMode === "signup"
                  ? t.authCreateEmail
                  : t.authContinueEmail}
              </span>
            </button>
          </form>

          <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
            {t.authFooterNote}
          </p>
        </>
      )}
    </div>
  );
}

export function AuthModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { lang } = useLanguage();
  const t = UI_TEXT[lang];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-surface p-6 text-foreground shadow-2xl outline-none sm:p-8 animate-in fade-in zoom-in-95 duration-200"
        >
          <Dialog.Close
            aria-label={t.authCloseAria}
            className="absolute top-4 right-4 grid size-9 place-items-center rounded-full border border-border bg-surface-2 text-muted-foreground transition-colors hover:bg-surface-3 hover:text-foreground"
          >
            <CloseIcon className="size-4" />
          </Dialog.Close>

          <Dialog.Title className="sr-only">KADR</Dialog.Title>
          <AuthCardContent onSuccess={() => onOpenChange(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
