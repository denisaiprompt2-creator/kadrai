import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as KadrMark, c as UI_TEXT, o as LanguageToggle, r as AuthCardContent, s as ThemeToggle, u as useLanguage } from "./router-DHbE7PKI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-nv_SfDFP.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const navigate = useNavigate();
	const { lang } = useLanguage();
	const t = UI_TEXT[lang];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-dvh overflow-x-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": "true",
			className: "hero-wash pointer-events-none absolute inset-x-0 top-0 h-72"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-5 py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KadrMark, { className: "size-9" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg leading-none font-semibold tracking-display text-foreground",
							children: "KADR"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 font-[family-name:var(--font-editorial)] text-[14px] leading-none font-medium italic text-muted-foreground",
							children: t.brandSubtitle
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow-border)] sm:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthCardContent, { onSuccess: () => void navigate({ to: "/" }) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex h-11 items-center justify-center text-sm text-muted-foreground transition-colors duration-[var(--motion-quick)] hover:text-foreground",
					children: t.authBackHome
				})
			]
		})]
	});
}
//#endregion
export { Login as component };
