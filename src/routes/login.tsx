import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthCardContent } from "@/components/auth-modal";
import { KadrMark } from "@/components/kadr-mark";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { UI_TEXT, useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = UI_TEXT[lang];

  return (
    <main className="relative min-h-dvh overflow-x-hidden">
      <div aria-hidden="true" className="hero-wash pointer-events-none absolute inset-x-0 top-0 h-72" />
      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-5 py-12">
        <div className="mb-8 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-3">
            <KadrMark className="size-9" />
            <div>
              <p className="font-display text-lg leading-none font-semibold tracking-display text-foreground">
                KADR
              </p>
              <p className="mt-0.5 font-[family-name:var(--font-editorial)] text-[14px] leading-none font-medium italic text-muted-foreground">
                {t.brandSubtitle}
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow-border)] sm:p-8">
          <AuthCardContent onSuccess={() => void navigate({ to: "/" })} />
        </div>

        <Link
          to="/"
          className="mt-6 inline-flex h-11 items-center justify-center text-sm text-muted-foreground transition-colors duration-[var(--motion-quick)] hover:text-foreground"
        >
          {t.authBackHome}
        </Link>
      </div>
    </main>
  );
}
