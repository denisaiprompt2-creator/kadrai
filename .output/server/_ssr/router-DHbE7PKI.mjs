import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, s as Slot, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { c as __exportAll } from "./ssr.mjs";
import { $t as union, Jt as number, Kt as literal, Qt as string, Yt as object } from "../_libs/@better-auth/core+[...].mjs";
import { r as signIn, t as authClient } from "./client-BoM2aqE1.mjs";
import { u as isMediaSource } from "./source-Cs9ZLiNi.mjs";
import { c as Sun, g as LoaderCircle, h as Lock, k as AtSign, n as X, o as TriangleAlert, p as Moon, v as Globe } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as auth } from "./server-BHvFZZyY.mjs";
import { t as contentDisposition } from "./disposition-cFkjd5Bs.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-toggle-COL-I5Mt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function KadrMark({ className, tone = "default" }) {
	const outerFill = tone === "accent" ? "fill-[#ccff00]" : "fill-foreground";
	const midFill = tone === "accent" ? "fill-[#ccff00]" : "fill-primary";
	const holeFill = tone === "accent" ? "fill-[#09090b]" : "fill-foreground";
	const windowFill = tone === "accent" ? "fill-[#09090b]" : "fill-background";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-8", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "6",
				className: outerFill
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "5",
				width: "26",
				height: "22",
				rx: "2",
				className: midFill
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "5",
				y: "8",
				width: "3",
				height: "3",
				className: holeFill
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "5",
				y: "14.5",
				width: "3",
				height: "3",
				className: holeFill
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "5",
				y: "21",
				width: "3",
				height: "3",
				className: holeFill
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "24",
				y: "8",
				width: "3",
				height: "3",
				className: holeFill
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "24",
				y: "14.5",
				width: "3",
				height: "3",
				className: holeFill
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "24",
				y: "21",
				width: "3",
				height: "3",
				className: holeFill
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "10",
				y: "8",
				width: "12",
				height: "16",
				className: holeFill
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "11",
				y: "9",
				width: "10",
				height: "14",
				className: windowFill
			})
		]
	});
}
var LanguageContext = (0, import_react.createContext)({
	lang: "ru",
	setLang: () => {},
	toggleLang: () => {}
});
function useLanguage() {
	return (0, import_react.useContext)(LanguageContext);
}
var UI_TEXT = {
	ru: {
		brandSubtitle: "видео с твоих любимых сайтов",
		themeLight: "Дневная",
		themeDark: "Ночная",
		themeToLightAria: "Включить дневную тему",
		themeToDarkAria: "Включить ночную тему",
		langToggleAria: "Switch language to English",
		langLabel: "EN",
		signIn: "Войти",
		signOut: "Выйти",
		signingOut: "Выходим",
		heroPrefix: "Сохрани",
		heroWords: [
			"видео",
			"аудио",
			"фото",
			"историю"
		],
		heroWidestWord: "историю",
		heroDescription: "KADR помогает сохранять что угодно с твоих любимых сайтов: видео, истории, аудио, фото или гифки. просто вставь ссылку и вперёд!",
		inputPlaceholder: "youtube, vimeo, instagram (пост, reel, история), x.com, tiktok, threads, rutube…",
		inputAria: "Ссылка на ролик",
		pasteAria: "Вставить из буфера",
		searchButton: "Найти",
		searchingButton: "Ищем",
		sampleIgStory: "IG История",
		loadingPrefix: "Достаём карточку с",
		emptyInputError: "Вставьте ссылку на ролик.",
		invalidUrlError: "Не похоже на ссылку YouTube, Vimeo, Instagram, X, Threads, TikTok или RuTube. Подойдёт watch, Shorts, история, Reel, пост, ролик или видео.",
		fetchTimeoutError: "Запрос занял слишком много времени. Попробуйте ещё раз.",
		fetchNetworkError: "Не удалось связаться с сервером. Попробуйте ещё раз.",
		clipboardReadError: "Не получилось прочитать буфер. Вставьте ссылку вручную.",
		clipboardEmpty: "В буфере пусто.",
		downloadStartToast: "Файл уходит в загрузки.",
		downloadLinkError: "Не удалось получить ссылку на файл.",
		bulkSuccessPrefix: "Отправлено в загрузки:",
		bulkOf: "из",
		bulkEmptyError: "Не удалось скачать файлы.",
		bulkCrashError: "Произошла ошибка при пакетном скачивании.",
		clearHistoryError: "Не получилось очистить историю в аккаунте.",
		historyTitle: "История",
		historySynced: "Сохраняется в аккаунте",
		historyGuest: "Войдите, чтобы история не пропала с другого устройства",
		historyClear: "Очистить",
		historyEmptySignedIn: "Здесь появятся ролики, которые вы уже разбирали.",
		historyEmptyGuestBefore: "Разберите ссылку — она останется здесь. Чтобы не потерять список,",
		historyEmptyGuestAction: "войдите",
		footerDisclaimer: "Скачивайте только ролики, на которые у вас есть права: свои публикации, материалы с открытой лицензией или с разрешения автора. KADR не связан с YouTube, Vimeo, Instagram, X, Threads, TikTok и RuTube и не обходит защиту авторских прав.",
		liveBadge: "эфир",
		copyLink: "Скопировать ссылку на результат",
		copySuccess: "Ссылка скопирована в буфер обмена.",
		copyError: "Не удалось скопировать ссылку.",
		shareButton: "Поделиться",
		shareAria: "Поделиться ссылкой",
		unavailableFallback: "Для этой публикации файлы недоступны.",
		retryButton: "Найти ещё раз",
		bundleTitle: "Полный комплект",
		bundleFilesWord: "файла",
		downloadingProgress: "Скачиваем",
		downloadAll: "Скачать всё сразу",
		groupFiles: "Файлы публикации",
		groupFile: "Файл",
		groupMuxed: "Видео со звуком",
		groupVideoOnly: "Только видео",
		groupAudio: "Звук",
		groupImages: "Фото и обложка",
		splitStreamsNote: "Потоки высокого разрешения отдаются раздельно. Скачайте видео и аудиодорожку отдельно или нажмите «Скачать всё сразу».",
		downloadButton: "Скачать",
		downloadingMoment: "Секунда",
		bundleCover: "обложка",
		bundleAudio: "звук",
		bundleVideo: "видео",
		authModalTitle: "Войти",
		authModalPrep: "в",
		authDisabled: "Вход сейчас недоступен.",
		authContinueGoogle: "Продолжить через Google",
		authContinueX: "Продолжить через X",
		authContinueYandex: "Продолжить через Яндекс",
		authLastUsed: "Недавний",
		authOrEmail: "или через почту",
		authEmailPlaceholder: "Почта",
		authEmailAria: "Электронная почта",
		authPasswordPlaceholder: "Пароль",
		authPasswordNewPlaceholder: "Придумайте пароль (от 8 символов)",
		authPasswordAria: "Пароль",
		authNoAccount: "Нет аккаунта?",
		authHaveAccount: "Уже есть аккаунт?",
		authCreateAccount: "Создать аккаунт",
		authSignInWithPassword: "Войти по паролю",
		authContinueEmail: "Продолжить через почту",
		authCreateEmail: "Создать аккаунт через почту",
		authFooterNote: "История сохранится в аккаунте — откроешь с телефона или компьютера.",
		authCloseAria: "Закрыть окно входа",
		authBackHome: "Назад на главную",
		assistantButton: "Помощник",
		assistantOpenAria: "Открыть помощник",
		assistantTitle: "Медиа-помощник",
		assistantSeeingCard: "Видит карточку:",
		assistantDefaultSub: "Помощь по форматам и ссылкам",
		assistantModeSmart: "Точный",
		assistantModeFast: "Быстрый",
		assistantClearAria: "Очистить диалог",
		assistantCloseAria: "Закрыть чат",
		assistantTyping: "Печатает ответ…",
		assistantQuickTitle: "Быстрые вопросы:",
		assistantPlaceholder: "Спросите про скачивание или форматы…",
		assistantInputAria: "Сообщение для помощника",
		assistantSendAria: "Отправить сообщение",
		assistantGreeting: "Привет! Я медиа-помощник. Подскажу, какой формат выбрать, как скачать всё сразу (видео + обложку) или как сохранить историю из Instagram и ролик с Vimeo.",
		assistantCleared: "История диалога очищена. Спрашивайте о скачивании видео, обложек, аудио или историй!",
		assistantQuickPrompts: [
			"Какой формат лучше выбрать для телефона?",
			"Как скачать видео и обложку одним кликом?",
			"Как сохранить историю из Instagram по ссылке?",
			"Почему видео 1080p иногда идёт без звука?"
		]
	},
	en: {
		brandSubtitle: "videos from your favorite sites",
		themeLight: "Light",
		themeDark: "Dark",
		themeToLightAria: "Switch to light theme",
		themeToDarkAria: "Switch to dark theme",
		langToggleAria: "Переключить язык на русский",
		langLabel: "RU",
		signIn: "Sign in",
		signOut: "Sign out",
		signingOut: "Signing out",
		heroPrefix: "Save",
		heroWords: [
			"video",
			"audio",
			"photo",
			"stories"
		],
		heroWidestWord: "stories",
		heroDescription: "KADR helps you save anything from your favorite sites: videos, stories, audio, photos, or GIFs. Just paste a link and go!",
		inputPlaceholder: "youtube, vimeo, instagram (post, reel, story), x.com, tiktok, threads, rutube…",
		inputAria: "Media link",
		pasteAria: "Paste from clipboard",
		searchButton: "Find",
		searchingButton: "Finding",
		sampleIgStory: "IG Story",
		loadingPrefix: "Fetching details from",
		emptyInputError: "Paste a media link first.",
		invalidUrlError: "Doesn't look like a YouTube, Vimeo, Instagram, X, Threads, TikTok, or RuTube link.",
		fetchTimeoutError: "The request took too long. Please try again.",
		fetchNetworkError: "Could not reach the server. Please try again.",
		clipboardReadError: "Could not read clipboard. Paste the link manually.",
		clipboardEmpty: "Clipboard is empty.",
		downloadStartToast: "Starting file download.",
		downloadLinkError: "Could not get the download link.",
		bulkSuccessPrefix: "Started downloads:",
		bulkOf: "of",
		bulkEmptyError: "Could not download files.",
		bulkCrashError: "An error occurred during batch download.",
		clearHistoryError: "Could not clear account history.",
		historyTitle: "History",
		historySynced: "Synced to your account",
		historyGuest: "Sign in so your history stays synced across devices",
		historyClear: "Clear",
		historyEmptySignedIn: "Links you inspect will appear here.",
		historyEmptyGuestBefore: "Inspect a link and it will stay here. To keep your list,",
		historyEmptyGuestAction: "sign in",
		footerDisclaimer: "Only download content you have rights to: your own posts, open-licensed media, or with the author's permission. KADR is not affiliated with YouTube, Vimeo, Instagram, X, Threads, TikTok, or RuTube.",
		liveBadge: "live",
		copyLink: "Copy result link",
		copySuccess: "Link copied to clipboard.",
		copyError: "Could not copy link.",
		shareButton: "Share",
		shareAria: "Share link",
		unavailableFallback: "No downloadable files are available for this post.",
		retryButton: "Try again",
		bundleTitle: "Complete bundle",
		bundleFilesWord: "files",
		downloadingProgress: "Downloading",
		downloadAll: "Download all",
		groupFiles: "Post files",
		groupFile: "File",
		groupMuxed: "Video with audio",
		groupVideoOnly: "Video only",
		groupAudio: "Audio",
		groupImages: "Photos & cover",
		splitStreamsNote: "High-resolution streams are delivered separately. Download video and audio individually or click «Download all».",
		downloadButton: "Download",
		downloadingMoment: "Wait",
		bundleCover: "cover",
		bundleAudio: "audio",
		bundleVideo: "video",
		authModalTitle: "Sign in",
		authModalPrep: "to",
		authDisabled: "Sign-in is currently unavailable.",
		authContinueGoogle: "Continue with Google",
		authContinueX: "Continue with X",
		authContinueYandex: "Continue with Yandex",
		authLastUsed: "Last used",
		authOrEmail: "or continue with email",
		authEmailPlaceholder: "Email",
		authEmailAria: "Email address",
		authPasswordPlaceholder: "Password",
		authPasswordNewPlaceholder: "Create a password (min 8 chars)",
		authPasswordAria: "Password",
		authNoAccount: "No account?",
		authHaveAccount: "Already have an account?",
		authCreateAccount: "Create account",
		authSignInWithPassword: "Sign in with password",
		authContinueEmail: "Continue with email",
		authCreateEmail: "Create account with email",
		authFooterNote: "Your history stays synced to your account across devices.",
		authCloseAria: "Close sign-in window",
		authBackHome: "Back to home",
		assistantButton: "Assistant",
		assistantOpenAria: "Open assistant",
		assistantTitle: "Media Assistant",
		assistantSeeingCard: "Viewing:",
		assistantDefaultSub: "Help with formats & links",
		assistantModeSmart: "Smart",
		assistantModeFast: "Fast",
		assistantClearAria: "Clear chat",
		assistantCloseAria: "Close chat",
		assistantTyping: "Thinking…",
		assistantQuickTitle: "Quick questions:",
		assistantPlaceholder: "Ask about downloads or formats…",
		assistantInputAria: "Message for assistant",
		assistantSendAria: "Send message",
		assistantGreeting: "Hi! I'm the KADR media assistant. Ask me which format to pick, how to download everything at once, or how to save Instagram stories and Vimeo videos.",
		assistantCleared: "Conversation cleared. Ask anything about saving videos, covers, audio, or stories!",
		assistantQuickPrompts: [
			"Which format works best on mobile?",
			"How do I download video and cover together?",
			"How can I save an Instagram story by link?",
			"Why is 1080p video sometimes without audio?"
		]
	}
};
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium select-none transition-[color,background-color,opacity,transform,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			outline: "border border-border bg-transparent text-foreground hover:bg-surface-2",
			ghost: "text-foreground hover:bg-surface-2",
			muted: "bg-surface-2 text-foreground hover:bg-surface-3"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-sm",
			lg: "h-12 px-5 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var STORAGE_KEY$1 = "kadr.lang";
function applyHtmlLang(lang) {
	if (typeof document === "undefined") return;
	document.documentElement.lang = lang;
}
function LanguageProvider({ children }) {
	const [lang, setLangState] = (0, import_react.useState)("ru");
	(0, import_react.useEffect)(() => {
		try {
			const stored = window.localStorage.getItem(STORAGE_KEY$1);
			if (stored === "en" || stored === "ru") {
				setLangState(stored);
				applyHtmlLang(stored);
				return;
			}
		} catch {}
		applyHtmlLang("ru");
	}, []);
	const setLang = (0, import_react.useCallback)((next) => {
		setLangState(next);
		applyHtmlLang(next);
		try {
			window.localStorage.setItem(STORAGE_KEY$1, next);
		} catch {}
	}, []);
	const toggleLang = (0, import_react.useCallback)(() => {
		setLang(lang === "ru" ? "en" : "ru");
	}, [lang, setLang]);
	const value = (0, import_react.useMemo)(() => ({
		lang,
		setLang,
		toggleLang
	}), [
		lang,
		setLang,
		toggleLang
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageContext.Provider, {
		value,
		children
	});
}
function LanguageToggle() {
	const { lang, toggleLang } = useLanguage();
	const t = UI_TEXT[lang];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		variant: "outline",
		size: "sm",
		onClick: toggleLang,
		className: "h-11 shrink-0 gap-1.5 px-3",
		"aria-label": t.langToggleAria,
		title: t.langToggleAria,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-semibold tracking-wide",
			children: t.langLabel
		})]
	});
}
var STORAGE_KEY = "kadr.theme";
var ThemeContext = (0, import_react.createContext)({
	theme: "dark",
	toggleTheme: () => {},
	setTheme: () => {}
});
function applyDomTheme(mode) {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	if (mode === "dark") root.classList.add("dark");
	else root.classList.remove("dark");
	const metaTheme = document.querySelector("meta[name=\"theme-color\"]");
	if (metaTheme) metaTheme.setAttribute("content", mode === "dark" ? "#09090b" : "#f7f7f4");
}
function ThemeProvider({ children }) {
	const [theme, setThemeState] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		try {
			const stored = window.localStorage.getItem(STORAGE_KEY);
			if (stored === "light" || stored === "dark") {
				setThemeState(stored);
				applyDomTheme(stored);
				return;
			}
		} catch {}
		applyDomTheme("dark");
	}, []);
	const setTheme = (next) => {
		setThemeState(next);
		applyDomTheme(next);
		try {
			window.localStorage.setItem(STORAGE_KEY, next);
		} catch {}
	};
	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value: {
			theme,
			toggleTheme,
			setTheme
		},
		children
	});
}
function useTheme() {
	return (0, import_react.useContext)(ThemeContext);
}
function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();
	const { lang } = useLanguage();
	const t = UI_TEXT[lang];
	const isDark = theme === "dark";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		variant: "outline",
		size: "sm",
		onClick: toggleTheme,
		className: "h-11 shrink-0 gap-2 px-3.5",
		"aria-label": isDark ? t.themeToLightAria : t.themeToDarkAria,
		title: isDark ? t.themeToLightAria : t.themeToDarkAria,
		children: [isDark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden sm:inline",
			children: isDark ? t.themeLight : t.themeDark
		})]
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DHbE7PKI.js
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
var LAST_PROVIDER_KEY = "kadr.last-auth-provider";
function GoogleIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className: "size-5 shrink-0",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4285F4",
				d: "M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.45a5.52 5.52 0 0 1-2.39 3.62v3.01h3.87c2.26-2.08 3.56-5.15 3.56-8.66Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#34A853",
				d: "M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.87-3.01c-1.07.72-2.44 1.15-4.06 1.15-3.12 0-5.77-2.11-6.72-4.95H1.28v3.1A12 12 0 0 0 12 24Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FBBC05",
				d: "M5.28 14.28a7.21 7.21 0 0 1 0-4.56v-3.1H1.28a12 12 0 0 0 0 10.76l4-3.1Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#EA4335",
				d: "M12 4.77c1.76 0 3.34.61 4.58 1.8l3.44-3.44C17.94 1.19 15.23 0 12 0A12 12 0 0 0 1.28 6.62l4 3.1c.95-2.84 3.6-4.95 6.72-4.95Z"
			})
		]
	});
}
function XBrandIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "size-4.5 shrink-0 fill-current",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
	});
}
function YandexIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className: "size-5 shrink-0",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "11",
			fill: "#FC3F1D"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#FFFFFF",
			d: "M13.38 17.8V7.63h-1.08c-1.85 0-2.82.93-2.82 2.33 0 1.57.7 2.33 2.08 3.25l1.15.77-3.3 3.82H7.22l2.98-3.45c-1.7-1.17-2.64-2.37-2.64-4.27 0-2.46 1.72-4.14 4.76-4.14h3.01V17.8h-1.95Z"
		})]
	});
}
function translateAuthError(lang, message) {
	if (!message) return lang === "en" ? "Could not sign in. Please try again." : "Не удалось выполнить вход. Попробуйте ещё раз.";
	const lower = message.toLowerCase();
	if (lower.includes("invalid email or password")) return lang === "en" ? "Invalid email or password." : "Неверная почта или пароль.";
	if (lower.includes("already exists") || lower.includes("user already")) return lang === "en" ? "An account with this email already exists — switch to Sign in." : "Аккаунт с такой почтой уже существует — переключитесь на «Войти».";
	if (lower.includes("password") && lower.includes("short")) return lang === "en" ? "Password must be at least 8 characters." : "Пароль должен содержать минимум 8 символов.";
	if (lower.includes("pop-up blocked")) return lang === "en" ? "Pop-up was blocked. Allow pop-ups or continue with email." : "Браузер заблокировал всплывающее окно. Разрешите поп-апы или войдите через почту.";
	if (lower.includes("cancelled") || lower.includes("failed")) return lang === "en" ? "External sign-in did not complete. You can sign in with email below." : "Вход через внешний сервис не завершён. Можно войти по почте ниже.";
	return message;
}
function AuthCardContent({ onSuccess, showTitle = true }) {
	const { lang } = useLanguage();
	const t = UI_TEXT[lang];
	const [lastUsed, setLastUsed] = (0, import_react.useState)(null);
	const [busyProvider, setBusyProvider] = (0, import_react.useState)(null);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [emailExpanded, setEmailExpanded] = (0, import_react.useState)(false);
	const [emailMode, setEmailMode] = (0, import_react.useState)("signin");
	const [emailPending, setEmailPending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const emailInputRef = (0, import_react.useRef)(null);
	const passwordInputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		try {
			setLastUsed(window.localStorage.getItem(LAST_PROVIDER_KEY));
		} catch {}
	}, []);
	function rememberProvider(id) {
		try {
			window.localStorage.setItem(LAST_PROVIDER_KEY, id);
		} catch {}
	}
	async function handleOAuth(providerId) {
		if (busyProvider || emailPending) return;
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
	async function handleEmailSubmit(event) {
		event.preventDefault();
		if (emailPending || busyProvider) return;
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
			setError(lang === "en" ? "Password must be at least 8 characters." : "Пароль должен быть не короче 8 символов.");
			return;
		}
		setEmailPending(true);
		try {
			if (emailMode === "signin") {
				const { error: signInError } = await authClient.signIn.email({
					email: trimmedEmail,
					password
				});
				if (signInError) {
					setError(translateAuthError(lang, signInError.message));
					return;
				}
			} else {
				const fallbackName = trimmedEmail.split("@")[0]?.slice(0, 40) || (lang === "en" ? "User" : "Пользователь");
				const { error: signUpError } = await authClient.signUp.email({
					email: trimmedEmail,
					password,
					name: fallbackName
				});
				if (signUpError) {
					setError(translateAuthError(lang, signUpError.message));
					return;
				}
			}
			rememberProvider("email");
			await authClient.getSession().catch(() => null);
			toast.success(emailMode === "signup" ? lang === "en" ? "Account created and signed in." : "Аккаунт создан, вы вошли." : lang === "en" ? "Signed in." : "Вы вошли в аккаунт.");
			onSuccess?.();
		} catch (err) {
			setError(translateAuthError(lang, err instanceof Error ? err.message : null));
		} finally {
			setEmailPending(false);
		}
	}
	const busy = busyProvider !== null || emailPending;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full",
		children: [showTitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 flex flex-col items-center text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "font-display text-2xl leading-tight font-semibold tracking-display text-foreground sm:text-[28px]",
				children: [t.authModalTitle, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-1 flex items-center justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.authModalPrep }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 rounded-xl bg-black px-2.5 py-0.5 dark:bg-transparent dark:p-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KadrMark, {
							tone: "accent",
							className: "size-7 shrink-0"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold tracking-display text-[#ccff00]",
							children: "KADR"
						})]
					})]
				})]
			})
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: busy,
						onClick: () => void handleOAuth("grok-google"),
						className: "relative flex h-12 w-full items-center justify-center rounded-xl bg-foreground px-4 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute left-4 flex items-center",
								children: busyProvider === "grok-google" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.authContinueGoogle }),
							lastUsed === "grok-google" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -top-2 right-2 rounded-md border border-[#ccff00]/40 bg-black px-2 py-0.5 text-[10px] leading-none font-bold tracking-wide text-[#ccff00]",
								children: t.authLastUsed
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: busy,
						onClick: () => void handleOAuth("grok-x"),
						className: "relative flex h-12 w-full items-center justify-center rounded-xl border border-border bg-surface-2 px-4 text-sm font-medium text-foreground transition-colors hover:bg-surface-3 disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-4 flex items-center",
							children: busyProvider === "grok-x" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XBrandIcon, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.authContinueX })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: busy,
						onClick: () => void handleOAuth("grok-yandex"),
						className: "relative flex h-12 w-full items-center justify-center rounded-xl border border-border bg-surface-2 px-4 text-sm font-medium text-foreground transition-colors hover:bg-surface-3 disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-4 flex items-center",
							children: busyProvider === "grok-yandex" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YandexIcon, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.authContinueYandex })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-4 flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: t.authOrEmail
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => void handleEmailSubmit(e),
				noValidate: true,
				className: "space-y-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtSign, { className: "pointer-events-none absolute left-3.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: emailInputRef,
							type: "email",
							value: email,
							onChange: (e) => {
								setEmail(e.target.value);
								if (!emailExpanded && e.target.value.trim().length > 0) setEmailExpanded(true);
							},
							placeholder: t.authEmailPlaceholder,
							autoComplete: "email",
							"aria-label": t.authEmailAria,
							disabled: busy,
							className: "h-12 w-full rounded-xl border border-border bg-surface-2 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:opacity-50"
						})]
					}),
					emailExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 animate-in fade-in slide-in-from-top-1 duration-150",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "pointer-events-none absolute left-3.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: passwordInputRef,
								type: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: emailMode === "signup" ? t.authPasswordNewPlaceholder : t.authPasswordPlaceholder,
								autoComplete: emailMode === "signup" ? "new-password" : "current-password",
								"aria-label": t.authPasswordAria,
								disabled: busy,
								className: "h-12 w-full rounded-xl border border-border bg-surface-2 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:opacity-50"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-1 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: emailMode === "signin" ? t.authNoAccount : t.authHaveAccount }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setError(null);
									setEmailMode((m) => m === "signin" ? "signup" : "signin");
								},
								className: "font-medium text-foreground underline-offset-4 hover:underline",
								children: emailMode === "signin" ? t.authCreateAccount : t.authSignInWithPassword
							})]
						})]
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "px-1 text-xs leading-relaxed text-destructive",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: busy,
						className: cn("flex h-12 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-all disabled:opacity-50", emailExpanded ? "border border-[#ccff00]/30 bg-black font-semibold text-[#ccff00] hover:opacity-90" : "border border-border bg-surface-2 text-foreground hover:bg-surface-3"),
						children: [emailPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: emailExpanded && emailMode === "signup" ? t.authCreateEmail : t.authContinueEmail })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-center text-xs leading-relaxed text-muted-foreground",
				children: t.authFooterNote
			})
		] })]
	});
}
function AuthModal({ open, onOpenChange }) {
	const { lang } = useLanguage();
	const t = UI_TEXT[lang];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"aria-describedby": void 0,
			className: "fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-surface p-6 text-foreground shadow-2xl outline-none sm:p-8 animate-in fade-in zoom-in-95 duration-200",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					"aria-label": t.authCloseAria,
					className: "absolute top-4 right-4 grid size-9 place-items-center rounded-full border border-border bg-surface-2 text-muted-foreground transition-colors hover:bg-surface-3 hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "sr-only",
					children: "KADR"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthCardContent, { onSuccess: () => onOpenChange(false) })
			]
		})] })
	});
}
var AuthModalContext = (0, import_react.createContext)({
	open: false,
	openAuthModal: () => {},
	closeAuthModal: () => {}
});
function useAuthModal() {
	return (0, import_react.useContext)(AuthModalContext);
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`).
* Hosts the global sign-in modal so any component can open it without navigating.
*/
function AuthProvider({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const openAuthModal = (0, import_react.useCallback)(() => setOpen(true), []);
	const closeAuthModal = (0, import_react.useCallback)(() => setOpen(false), []);
	const value = (0, import_react.useMemo)(() => ({
		open,
		openAuthModal,
		closeAuthModal
	}), [
		open,
		openAuthModal,
		closeAuthModal
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthModalContext.Provider, {
		value,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthModal, {
			open,
			onOpenChange: setOpen
		})]
	});
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-CQ3CtbVY.css";
var APP_NAME = "KADR";
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "KADR — сохрани ролик YouTube, Vimeo, Instagram (Reels, посты, истории), X, TikTok, Threads или RuTube: видео, фото и звук без водяных знаков."
			},
			{
				property: "og:title",
				content: APP_NAME
			},
			{
				property: "og:description",
				content: "KADR — сохрани ролик YouTube, Vimeo, Instagram (Reels, посты, истории), X, TikTok, Threads или RuTube: видео, фото и звук без водяных знаков."
			},
			{
				name: "theme-color",
				content: "#09090b"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500;1,600&family=Manrope:wght@400;500;600;700&family=Syne:wght@500;600;700;800&display=swap"
			}
		]
	}),
	component: RootDocument
});
function ThemedToaster() {
	const { theme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		theme,
		position: "bottom-center",
		toastOptions: { className: "font-sans" }
	});
}
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ru",
		className: "dark antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-background text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProvider, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemedToaster, {})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
var $$splitComponentImporter$1 = () => import("./routes-D06Aekk6.mjs");
var Route$3 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./login-nv_SfDFP.mjs");
var Route$2 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
async function openStream(source, id, preset) {
	switch (source) {
		case "instagram": return (await import("./provider.server-CTBZ4sEx.mjs")).openInstagramStream(id, preset);
		case "x": return (await import("./provider.server-CIG4q6em.mjs")).openXStream(id, preset);
		case "threads": return (await import("./provider.server-Y_7F9w-Y.mjs")).openThreadsStream(id, preset);
		case "tiktok": return (await import("./provider.server-BHXYOKoB.mjs")).openTikTokStream(id, preset);
		case "rutube": return (await import("./provider.server-Czj-Bg4M.mjs")).openRutubeStream(id, preset);
		case "vimeo": return (await import("./provider.server-Bl09rYOq.mjs")).openVimeoStream(id, preset);
		default: return (await import("./provider.server-DPYNGsAf.mjs")).openYouTubeStream(id, preset);
	}
}
var Route$1 = createFileRoute("/api/file")({ server: { handlers: { GET: async ({ request }) => {
	const url = new URL(request.url);
	const source = url.searchParams.get("source");
	const id = url.searchParams.get("id");
	const preset = url.searchParams.get("preset");
	if (!isMediaSource(source) || !id || !preset) return new Response("Некорректный запрос", { status: 400 });
	const opened = await openStream(source, id, preset);
	if (!opened.ok) return new Response(opened.error, {
		status: 404,
		headers: { "content-type": "text/plain; charset=utf-8" }
	});
	const headers = new Headers();
	headers.set("content-type", opened.mime.split(";")[0]?.trim() || "application/octet-stream");
	headers.set("content-disposition", contentDisposition(opened.filename));
	headers.set("cache-control", "no-store");
	headers.set("x-content-type-options", "nosniff");
	const length = opened.response.headers.get("content-length");
	if (length) headers.set("content-length", length);
	return new Response(opened.response.body, {
		status: 200,
		headers
	});
} } } });
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	LoginRoute: Route$2.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$4
	}),
	ApiFileRoute: Route$1.update({
		id: "/api/file",
		path: "/api/file",
		getParentRoute: () => Route$4
	}),
	ApiAuthSplatRoute: Route.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { KadrMark as a, UI_TEXT as c, Button as i, cn as l, useAuthModal as n, LanguageToggle as o, AuthCardContent as r, ThemeToggle as s, router_exports as t, useLanguage as u };
