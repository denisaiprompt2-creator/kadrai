import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { Jt as number, Qt as string, Ut as array, Vt as _enum, Yt as object } from "../_libs/@better-auth/core+[...].mjs";
import { i as signOut, t as authClient } from "./client-BoM2aqE1.mjs";
import { t as authMiddleware } from "./middleware-Dtq72ZH1.mjs";
import { a as canonicalUrl, c as detectMedia, d as openOnLabel, x as thumbnailUrl, y as sourceLabel } from "./source-Cs9ZLiNi.mjs";
import { C as Copy, D as Bot, E as Check, S as Download, T as Clipboard, _ as Image, a as User, b as Eye, d as Send, f as Music, g as LoaderCircle, i as Volume2, k as ArrowUpRight, l as Sparkles, m as MessageSquare, n as X, r as VolumeX, s as Trash2, t as Zap, u as Share2, v as FolderDown, w as Clock3, x as Eraser, y as Film } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as KadrMark, i as Button, n as useAuthModal, o as ThemeToggle, s as cn } from "./router-wyPYrz3m.mjs";
import { n as formatDuration, r as formatViews, t as formatBytes } from "./format-ebeqqiKW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BRQKQPau.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
function AccountSlot() {
	const { user, isPending } = useCurrentUserState();
	const { openAuthModal } = useAuthModal();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-surface-2 size-11 shrink-0 animate-pulse rounded-full",
		"aria-hidden": "true"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		variant: "outline",
		size: "sm",
		className: "h-11 px-4",
		onClick: openAuthModal,
		children: "Войти"
	});
	const label = user.displayName ?? user.primaryEmail ?? "Аккаунт";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "size-8 shrink-0 rounded-full object-cover outline outline-1 -outline-offset-1 outline-foreground/10"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bg-surface-2 text-foreground grid size-8 shrink-0 place-items-center rounded-full text-xs font-medium",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden max-w-28 truncate text-sm text-foreground sm:inline",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "sm",
				className: "h-11 shrink-0",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				children: signingOut ? "Выходим" : "Выйти"
			})
		]
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-12 w-full rounded-md border border-border bg-surface px-4 text-base text-foreground shadow-[var(--shadow-border)] outline-none transition-[box-shadow,border-color,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var sendChatMessage = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("7e2937ceb841ed018ee0768296d55c80ac2180dff9482b14018aaef2f6ae45f5"));
var QUICK_PROMPTS = [
	"Какой формат лучше выбрать для телефона?",
	"Как скачать видео и обложку одним кликом?",
	"Как сохранить историю из Instagram по ссылке?",
	"Почему видео 1080p иногда идёт без звука?"
];
function ChatWidget({ video }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [mode, setMode] = (0, import_react.useState)("general");
	const [input, setInput] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "model",
		text: "Привет! Я медиа-помощник. Подскажу, какой формат выбрать, как скачать всё сразу (видео + обложку) или как сохранить историю из Instagram и ролик с Vimeo."
	}]);
	const scrollRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const node = scrollRef.current;
		if (node) node.scrollTop = node.scrollHeight;
	}, [
		messages,
		pending,
		open
	]);
	const videoContext = video ? {
		title: video.title,
		source: sourceLabel(video.source),
		author: video.author,
		url: video.url,
		durationSec: video.durationSec,
		presets: video.presets.map((p) => ({
			label: p.label,
			kind: p.kind,
			ext: p.ext,
			note: p.note
		}))
	} : null;
	async function handleSend(textToSend) {
		const trimmed = textToSend.trim();
		if (!trimmed || pending) return;
		const historySnapshot = messages;
		const nextUserTurn = {
			role: "user",
			text: trimmed
		};
		setMessages((prev) => [...prev, nextUserTurn]);
		setInput("");
		setError(null);
		setPending(true);
		try {
			const res = await sendChatMessage({ data: {
				message: trimmed,
				history: historySnapshot,
				mode,
				videoContext
			} });
			if (!res.ok) {
				setError(res.error);
				return;
			}
			setMessages((prev) => [...prev, {
				role: "model",
				text: res.reply
			}]);
		} catch {
			setError("Не удалось связаться с чат-ботом. Попробуйте ещё раз.");
		} finally {
			setPending(false);
		}
	}
	function onSubmit(event) {
		event.preventDefault();
		handleSend(input);
	}
	function resetConversation() {
		setError(null);
		setMessages([{
			role: "model",
			text: "История диалога очищена. Спрашивайте о скачивании видео, обложек, аудио или историй!"
		}]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6",
		children: !open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			onClick: () => setOpen(true),
			className: "h-12 gap-2 rounded-full px-5 shadow-lg",
			"aria-label": "Открыть чат-помощник",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Чат-помощник" })]
		}) : null
	}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		"aria-label": "Чат-помощник",
		className: "fixed inset-x-3 bottom-3 z-50 flex max-h-[min(600px,calc(100dvh-24px))] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[400px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 border-b border-border bg-surface-2 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-display text-sm font-semibold text-foreground",
							children: "Медиа-помощник"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: video && video.presets.length > 0 ? `Видит карточку: ${sourceLabel(video.source)}` : "Помощь по форматам и ссылкам"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMode((prev) => prev === "general" ? "fast" : "general"),
							title: mode === "general" ? "Режим: Умный (Gemini 3.8 Flash). Нажмите для быстрого режима" : "Режим: Быстрый (Gemini 3.1 Flash Lite). Нажмите для умного режима",
							className: "inline-flex h-8 items-center gap-1 rounded-lg border border-border bg-surface px-2 text-xs text-muted-foreground transition-colors hover:text-foreground",
							children: mode === "general" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Точный" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Быстрый" })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							className: "size-8",
							onClick: resetConversation,
							"aria-label": "Очистить диалог",
							title: "Очистить диалог",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							className: "size-8",
							onClick: () => setOpen(false),
							"aria-label": "Закрыть чат",
							title: "Закрыть чат",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scrollRef,
				className: "flex-1 space-y-3 overflow-y-auto p-4",
				children: [
					messages.map((msg, index) => {
						const isUser = msg.role === "user";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-border text-xs ${isUser ? "bg-primary text-primary-foreground" : "bg-surface-2 text-foreground"}`,
								children: isUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-3.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${isUser ? "bg-primary text-primary-foreground" : "border border-border bg-surface-2 text-foreground"}`,
								children: msg.text
							})]
						}, `${msg.role}-${index}`);
					}),
					pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-3.5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Печатает ответ…" })]
						})]
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive",
						children: error
					}) : null,
					messages.length <= 2 && !pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-xs text-muted-foreground",
							children: "Быстрые вопросы:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1.5",
							children: QUICK_PROMPTS.map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void handleSend(prompt),
								className: "rounded-xl border border-border bg-surface-2 px-2.5 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:text-foreground",
								children: prompt
							}, prompt))
						})]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "flex items-center gap-2 border-t border-border bg-surface p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: input,
					onChange: (e) => setInput(e.target.value),
					placeholder: "Спросите про скачивание или форматы…",
					disabled: pending,
					className: "h-10 flex-1",
					"aria-label": "Сообщение для чат-помощника"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "icon",
					disabled: pending || !input.trim(),
					className: "size-10 shrink-0",
					"aria-label": "Отправить сообщение",
					children: pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
				})]
			})
		]
	}) : null] });
}
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide", {
	variants: { variant: {
		default: "border-transparent bg-surface-2 text-foreground",
		outline: "border-border text-muted-foreground",
		accent: "border-transparent bg-primary text-primary-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-surface-2", className),
		...props
	});
}
var KEY$1 = "kadr:history:v1";
var LIMIT$1 = 24;
function storage$1() {
	try {
		if (typeof window === "undefined") return null;
		return window.localStorage;
	} catch {
		return null;
	}
}
function persistableThumbnail(value) {
	if (!value) return "";
	if (value.startsWith("data:")) return "";
	if (value.length > 1800) return "";
	return value;
}
function loadHistory() {
	const store = storage$1();
	if (!store) return [];
	try {
		const raw = store.getItem(KEY$1);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((item) => typeof item?.id === "string" && typeof item?.title === "string");
	} catch {
		return [];
	}
}
function pushHistory(item) {
	const source = item.source ?? "youtube";
	const next = [{
		...item,
		source,
		thumbnail: persistableThumbnail(item.thumbnail),
		savedAt: Date.now()
	}, ...loadHistory().filter((row) => {
		const rowSource = row.source ?? "youtube";
		return !(row.id === item.id && rowSource === source);
	})].slice(0, LIMIT$1);
	const store = storage$1();
	if (store) try {
		store.setItem(KEY$1, JSON.stringify(next));
	} catch {}
	return next;
}
function clearHistory() {
	const store = storage$1();
	if (store) try {
		store.removeItem(KEY$1);
	} catch {}
	return [];
}
var LIMIT = 24;
var itemSchema = object({
	id: string().min(1).max(64),
	source: _enum([
		"youtube",
		"instagram",
		"x",
		"threads",
		"tiktok",
		"rutube",
		"vimeo"
	]).default("youtube"),
	url: string().min(1).max(500),
	title: string().min(1).max(200),
	author: string().max(120).default(""),
	thumbnail: string().max(2e3).default(""),
	durationSec: number().nullable().optional(),
	savedAt: number().optional()
});
var listHistory = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("f4d2a9562cc14b8191a8cdb9a6f28c98c26f9562f41db098908e5e385e3e8455"));
var saveHistoryItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(itemSchema).handler(createSsrRpc("eb5621a2a442708a4c33bc0e093869d2afc942847ba6cb14289e8bee123ff6a1"));
var syncHistory = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(array(itemSchema).max(LIMIT)).handler(createSsrRpc("104ee5f8d8ac5eb7f788f9b4fdb0450fd6311aec3526fb43316c8b939450e0b5"));
var clearHistoryItems = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("e59f6c9010de439850a82d9786ee4b8c51820587e22fd6e54ff49a1367c8cae9"));
var SOURCE_ENUM = _enum([
	"youtube",
	"instagram",
	"x",
	"threads",
	"tiktok",
	"rutube",
	"vimeo"
]);
var inspectVideo = createServerFn({ method: "POST" }).validator(object({ url: string().min(1) })).handler(createSsrRpc("7e8e22a91fb72ada0d48107c970359d01d54a130999465c509bdb873087da4ff"));
var requestDownloadLink = createServerFn({ method: "POST" }).validator(object({
	source: SOURCE_ENUM.optional(),
	videoId: string().min(3),
	presetId: string().min(1)
})).handler(createSsrRpc("79308e5bfb3cfa0c9ba770d73020139723b6a682a4cc9180081879480dd1bcc5"));
var KEY = "kadr:last:v2";
function storage() {
	try {
		if (typeof window === "undefined") return null;
		return window.sessionStorage;
	} catch {
		return null;
	}
}
function loadLastInspect() {
	const store = storage();
	if (!store) return null;
	try {
		const raw = store.getItem(KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed?.video?.id || typeof parsed.url !== "string") return null;
		if (!Array.isArray(parsed.video.presets) || parsed.video.presets.length === 0) return null;
		if (!parsed.video.source) parsed.video.source = "youtube";
		return parsed;
	} catch {
		return null;
	}
}
function saveLastInspect(state) {
	const store = storage();
	if (!store) return;
	try {
		store.setItem(KEY, JSON.stringify(state));
	} catch {}
}
var SAMPLE_YT = "https://www.youtube.com/watch?v=jNQXAC9IVRw";
var SAMPLE_VM = "https://vimeo.com/76979871";
var SAMPLE_IG = "https://www.instagram.com/reel/Cuw1zIWAo5i/";
var SAMPLE_IG_STORY = "https://www.instagram.com/stories/instagram/3148252749649579618/";
var SAMPLE_X = "https://x.com/elonmusk/status/1349129669258448897";
var SAMPLE_TT = "https://www.tiktok.com/@scout2015/video/6718335390845095173";
var SAMPLE_TH = "https://www.threads.net/@zuck/post/DcwLClnmOrR";
var SAMPLE_RT = "https://rutube.ru/video/d7735d2c10b588f0376eb754483fd943/";
var HANDLE_SOURCES = /* @__PURE__ */ new Set([
	"instagram",
	"x",
	"threads",
	"tiktok"
]);
function selectBulkPresets(video) {
	if (video.source === "youtube" || video.source === "vimeo" || video.source === "rutube") {
		const muxed = video.presets.filter((p) => p.kind === "muxed");
		const videos = video.presets.filter((p) => p.kind === "video");
		const audios = video.presets.filter((p) => p.kind === "audio");
		const images = video.presets.filter((p) => p.kind === "image");
		const selected = [];
		const bestVideo = muxed[0] ?? videos[0];
		if (bestVideo) {
			selected.push(bestVideo);
			if (!bestVideo.hasAudio && audios[0]) selected.push(audios[0]);
		} else if (audios[0]) selected.push(audios[0]);
		selected.push(...images);
		return selected;
	}
	return video.presets;
}
function optimisticVideo(id, source) {
	return {
		id,
		source,
		url: canonicalUrl(source, id),
		title: "Загружаем карточку…",
		author: "",
		authorUrl: null,
		thumbnail: source === "youtube" ? thumbnailUrl(id) : "",
		durationSec: null,
		views: null,
		isLive: false,
		downloadable: false,
		restriction: null,
		presets: []
	};
}
function historyHref(item) {
	if (item.url) return item.url;
	return canonicalUrl(item.source ?? "youtube", item.id);
}
function asStoredItem(video) {
	return {
		id: video.id,
		source: video.source,
		url: video.url,
		title: video.title,
		author: video.author,
		thumbnail: persistableThumbnail(video.thumbnail),
		durationSec: video.durationSec
	};
}
function toSyncItem(item) {
	const source = item.source ?? "youtube";
	return {
		id: item.id,
		source,
		url: item.url ?? canonicalUrl(source, item.id),
		title: item.title.slice(0, 200) || "Публикация",
		author: item.author ?? "",
		thumbnail: persistableThumbnail(item.thumbnail),
		durationSec: item.durationSec,
		savedAt: item.savedAt
	};
}
async function inspectWithRetry(url) {
	const run = () => Promise.race([inspectVideo({ data: { url } }), new Promise((_, reject) => {
		setTimeout(() => reject(/* @__PURE__ */ new Error("timeout")), 28e3);
	})]);
	try {
		return await run();
	} catch {
		await new Promise((resolve) => setTimeout(resolve, 400));
		return await run();
	}
}
var SAMPLES = [
	{
		label: "YouTube",
		url: SAMPLE_YT
	},
	{
		label: "Vimeo",
		url: SAMPLE_VM
	},
	{
		label: "Instagram",
		url: SAMPLE_IG
	},
	{
		label: "IG История",
		url: SAMPLE_IG_STORY
	},
	{
		label: "X",
		url: SAMPLE_X
	},
	{
		label: "TikTok",
		url: SAMPLE_TT
	},
	{
		label: "Threads",
		url: SAMPLE_TH
	},
	{
		label: "RuTube",
		url: SAMPLE_RT
	}
];
var HERO_WORDS = [
	"видео",
	"аудио",
	"фото",
	"историю"
];
function HomePage() {
	const { user, isPending } = useCurrentUserState();
	const { openAuthModal } = useAuthModal();
	const [url, setUrl] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [video, setVideo] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [pendingPreset, setPendingPreset] = (0, import_react.useState)(null);
	const [bulkProgress, setBulkProgress] = (0, import_react.useState)(null);
	const [heroPlayed, setHeroPlayed] = (0, import_react.useState)(false);
	const [wordIndex, setWordIndex] = (0, import_react.useState)(0);
	const requestSeq = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const timer = window.setInterval(() => {
			setWordIndex((prev) => (prev + 1) % HERO_WORDS.length);
		}, 2200);
		return () => window.clearInterval(timer);
	}, []);
	(0, import_react.useEffect)(() => {
		const cached = loadLastInspect();
		if (cached) {
			setUrl(cached.url);
			setVideo(cached.video);
			setStatus("ready");
			setHeroPlayed(true);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		let cancelled = false;
		async function load() {
			const local = loadHistory();
			if (!user) {
				if (!cancelled) setHistory(local);
				return;
			}
			try {
				const payload = local.map(toSyncItem);
				const next = payload.length > 0 ? await syncHistory({ data: payload }) : await listHistory();
				if (!cancelled) setHistory(next);
			} catch {
				if (!cancelled) setHistory(local);
			}
		}
		load();
		return () => {
			cancelled = true;
		};
	}, [user, isPending]);
	async function inspect(raw) {
		const trimmed = raw.trim();
		if (!trimmed) {
			setError("Вставьте ссылку на ролик.");
			setStatus("error");
			return;
		}
		const detected = detectMedia(trimmed);
		if (!detected) {
			setError("Не похоже на ссылку YouTube, Vimeo, Instagram, X, Threads, TikTok или RuTube. Подойдёт watch, Shorts, история, Reel, пост, ролик или видео.");
			setStatus("error");
			return;
		}
		const source = detected.source;
		const canonical = detected.url;
		const id = detected.id || "media";
		const seq = ++requestSeq.current;
		setUrl(canonical);
		setError(null);
		setStatus("loading");
		setVideo((prev) => prev?.id === id && prev.source === source && prev.presets.length > 0 ? prev : optimisticVideo(id, source));
		try {
			const result = await inspectWithRetry(canonical);
			if (seq !== requestSeq.current) return;
			if (!result.ok) {
				setError(result.error);
				setStatus("error");
				setVideo((prev) => prev?.presets.length ? prev : null);
				return;
			}
			setVideo(result.video);
			setUrl(result.video.url);
			setStatus("ready");
			if (result.video.presets.length > 0) saveLastInspect({
				url: result.video.url,
				video: result.video
			});
			const stored = asStoredItem(result.video);
			const local = pushHistory(stored);
			setHistory(local);
			if (user) try {
				const remote = await saveHistoryItem({ data: stored });
				if (seq === requestSeq.current) setHistory(remote);
			} catch {}
		} catch {
			if (seq !== requestSeq.current) return;
			setError("Не получилось связаться с сервером. Попробуйте ещё раз.");
			setStatus("error");
			setVideo((prev) => prev?.presets.length ? prev : null);
		}
	}
	async function pasteFromClipboard() {
		try {
			const text = await navigator.clipboard.readText();
			if (!text.trim()) {
				toast("Буфер пуст");
				return;
			}
			setUrl(text.trim());
			await inspect(text);
		} catch {
			toast("Нет доступа к буферу — вставьте ссылку вручную");
		}
	}
	async function triggerSinglePresetDownload(targetVideo, preset, silent = false) {
		const result = await requestDownloadLink({ data: {
			source: targetVideo.source,
			videoId: targetVideo.id,
			presetId: preset.id
		} });
		if (!result.ok) {
			if (!silent) toast.error(result.error);
			return false;
		}
		const a = document.createElement("a");
		a.href = result.url;
		a.download = result.filename;
		a.rel = "noopener";
		document.body.appendChild(a);
		a.click();
		a.remove();
		if (!silent) toast.success("Файл уходит в загрузки.");
		return true;
	}
	async function startDownload(preset) {
		if (!video || bulkProgress) return;
		setPendingPreset(preset.id);
		try {
			await triggerSinglePresetDownload(video, preset, false);
		} catch {
			toast.error("Не удалось получить ссылку на файл.");
		} finally {
			setPendingPreset(null);
		}
	}
	async function startDownloadAll() {
		if (!video || bulkProgress || pendingPreset) return;
		const targets = selectBulkPresets(video);
		if (targets.length === 0) return;
		if (targets.length === 1) {
			await startDownload(targets[0]);
			return;
		}
		setBulkProgress({
			current: 1,
			total: targets.length
		});
		let completed = 0;
		try {
			for (let i = 0; i < targets.length; i++) {
				const preset = targets[i];
				setBulkProgress({
					current: i + 1,
					total: targets.length
				});
				setPendingPreset(preset.id);
				if (await triggerSinglePresetDownload(video, preset, true)) completed += 1;
				if (i < targets.length - 1) await new Promise((resolve) => setTimeout(resolve, 450));
			}
			if (completed > 0) toast.success(`Отправлено в загрузки: ${completed} из ${targets.length}`);
			else toast.error("Не удалось скачать файлы.");
		} catch {
			toast.error("Произошла ошибка при пакетном скачивании.");
		} finally {
			setPendingPreset(null);
			setBulkProgress(null);
		}
	}
	async function wipeHistory() {
		setHistory(clearHistory());
		if (!user) return;
		try {
			setHistory(await clearHistoryItems());
		} catch {
			toast.error("Не получилось очистить историю в аккаунте.");
		}
	}
	function onSubmit(event) {
		event.preventDefault();
		event.stopPropagation();
		inspect(url);
	}
	const muxed = video?.presets.filter((p) => p.kind === "muxed") ?? [];
	const videos = video?.presets.filter((p) => p.kind === "video") ?? [];
	const audios = video?.presets.filter((p) => p.kind === "audio") ?? [];
	const images = video?.presets.filter((p) => p.kind === "image") ?? [];
	const loading = status === "loading";
	const loadingSource = video?.source ?? detectMedia(url)?.source ?? "youtube";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-x-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "hero-wash pointer-events-none absolute inset-x-0 top-0 h-72"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-5 pt-6 pb-2 sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KadrMark, { className: "size-9 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg leading-none font-semibold tracking-display text-foreground",
							children: "KADR"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 truncate font-[family-name:var(--font-editorial)] text-[14px] leading-none font-medium italic text-muted-foreground",
							children: "видео с твоих любимых сайтов"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountSlot, {})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative mx-auto w-full max-w-5xl px-5 pb-24 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: `mx-auto max-w-2xl pt-10 text-center sm:pt-16 ${heroPlayed ? "" : "hero-stagger"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display flex flex-wrap items-baseline justify-center gap-x-[0.28em] gap-y-2 text-4xl leading-tight font-semibold tracking-display text-foreground sm:text-6xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Сохрани" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-grid justify-items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									className: "invisible col-start-1 row-start-1 rounded-xl border border-transparent px-3.5 py-0.5 font-bold italic select-none",
									children: "историю"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "col-start-1 row-start-1 inline-block rounded-xl border border-[#ccff00]/30 bg-black px-3.5 py-0.5 font-bold italic text-[#ccff00] shadow-[var(--shadow-border)] animate-in fade-in slide-in-from-bottom-2 duration-300",
									children: HERO_WORDS[wordIndex]
								}, HERO_WORDS[wordIndex])]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground",
							children: "KADR помогает сохранять что угодно с твоих любимых сайтов: видео, истории, аудио, фото или гифки. просто вставь ссылку и вперёд!"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mx-auto mt-10 max-w-2xl",
						method: "dialog",
						action: "#",
						noValidate: true,
						onSubmit,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-2xl border border-border bg-surface p-2 shadow-[var(--shadow-border)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 flex-1 items-stretch",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: url,
										onChange: (e) => setUrl(e.target.value),
										placeholder: "youtube, vimeo, instagram (пост, reel, история), x.com, tiktok, threads, rutube…",
										inputMode: "url",
										enterKeyHint: "search",
										autoCapitalize: "off",
										autoCorrect: "off",
										autoComplete: "off",
										spellCheck: false,
										"aria-label": "Ссылка на ролик",
										onKeyDown: (e) => {
											if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
												e.preventDefault();
												if (!loading) inspect(url);
											}
										},
										className: "h-12 min-w-0 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ghost",
										size: "icon",
										className: "shrink-0",
										onClick: () => void pasteFromClipboard(),
										"aria-label": "Вставить из буфера",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clipboard, {})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: loading,
									className: "h-12 w-full shrink-0 sm:w-auto sm:px-5",
									children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), "Ищем"] }) : "Найти"
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1",
							children: SAMPLES.map((sample) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 rounded-full px-3 text-sm whitespace-nowrap text-muted-foreground transition-colors duration-[var(--motion-quick)] hover:text-foreground",
								onClick: () => {
									setUrl(sample.url);
									inspect(sample.url);
								},
								children: sample.label
							}, sample.label))
						})]
					}),
					loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mx-auto mt-4 max-w-xl text-center text-sm text-muted-foreground",
						children: [
							"Достаём карточку с ",
							sourceLabel(loadingSource),
							"…"
						]
					}) : null,
					status === "error" && error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "mx-auto mt-6 max-w-xl text-center text-sm text-destructive",
						children: error
					}) : null,
					video ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
						video,
						muxed,
						videos,
						audios,
						images,
						pendingPreset,
						bulkProgress,
						loading,
						onDownload: startDownload,
						onDownloadAll: () => void startDownloadAll(),
						onRetry: () => void inspect(video.url)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-end justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold tracking-display",
								children: "История"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: user ? "Сохраняется в аккаунте" : "Войдите, чтобы история не пропала с другого устройства"
							})] }), history.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "ghost",
								size: "sm",
								onClick: () => void wipeHistory(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, {}), "Очистить"]
							}) : null]
						}), history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground",
							children: user ? "Здесь появятся ролики, которые вы уже разбирали." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Разберите ссылку — она останется здесь. Чтобы не потерять список,",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: openAuthModal,
									className: "text-foreground underline-offset-4 hover:underline",
									children: "войдите"
								}),
								"."
							] })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-2 sm:grid-cols-2",
							children: history.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "flex w-full items-center gap-3 rounded-xl border border-border bg-surface p-2 text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)] hover:shadow-[var(--shadow-border-hover)]",
								onClick: () => {
									const next = historyHref(item);
									setUrl(next);
									inspect(next);
								},
								children: [item.thumbnail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.thumbnail,
									alt: "",
									referrerPolicy: "no-referrer",
									className: "size-14 shrink-0 rounded-md object-cover outline outline-1 -outline-offset-1 outline-foreground/10"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-surface-2 size-14 shrink-0 rounded-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "line-clamp-1 text-sm font-medium text-foreground",
										children: item.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-0.5 flex items-center gap-2 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "truncate",
											children: [sourceLabel(item.source), item.author ? ` · ${item.author}` : ""]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular-nums",
											children: formatDuration(item.durationSec)
										})]
									})]
								})]
							}) }, `${item.source ?? "youtube"}:${item.id}`))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
						className: "mt-16 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Скачивайте только ролики, на которые у вас есть права: свои публикации, материалы с открытой лицензией или с разрешения автора. KADR не связан с YouTube, Vimeo, Instagram, X, Threads, TikTok и RuTube и не обходит защиту авторских прав." })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatWidget, { video })
		]
	});
}
function ResultCard({ video, muxed, videos, audios, images, pendingPreset, bulkProgress, loading, onDownload, onDownloadAll, onRetry }) {
	const groups = (0, import_react.useMemo)(() => {
		if (video.source !== "youtube" && video.source !== "vimeo" && video.source !== "rutube") return [{
			title: video.presets.length > 1 ? "Файлы публикации" : "Файл",
			items: video.presets,
			icon: video.presets.every((p) => p.kind === "image") ? Image : Film
		}].filter((group) => group.items.length > 0);
		return [
			{
				title: "Видео со звуком",
				items: muxed,
				icon: Volume2
			},
			{
				title: "Только видео",
				items: videos,
				icon: VolumeX
			},
			{
				title: "Звук",
				items: audios,
				icon: Music
			},
			{
				title: "Фото и обложка",
				items: images,
				icon: Image
			}
		].filter((group) => group.items.length > 0);
	}, [
		video,
		muxed,
		videos,
		audios,
		images
	]);
	const bulkPresets = (0, import_react.useMemo)(() => selectBulkPresets(video), [video]);
	const bulkSummary = (0, import_react.useMemo)(() => {
		return bulkPresets.map((p) => {
			if (p.kind === "image") return "обложка";
			if (p.kind === "audio") return "звук";
			return `видео ${p.qualityLabel}`;
		}).join(" + ");
	}, [bulkPresets]);
	const openLabel = openOnLabel(video.source);
	const author = video.author && HANDLE_SOURCES.has(video.source) ? `@${video.author.replace(/^@/, "")}` : video.author;
	const [copied, setCopied] = (0, import_react.useState)(false);
	async function copyResultUrl() {
		try {
			await navigator.clipboard.writeText(video.url);
			setCopied(true);
			toast.success("Ссылка скопирована в буфер обмена.");
			setTimeout(() => setCopied(false), 2e3);
		} catch {
			try {
				const textarea = document.createElement("textarea");
				textarea.value = video.url;
				textarea.style.position = "fixed";
				textarea.style.opacity = "0";
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand("copy");
				textarea.remove();
				setCopied(true);
				toast.success("Ссылка скопирована в буфер обмена.");
				setTimeout(() => setCopied(false), 2e3);
			} catch {
				toast.error("Не удалось скопировать ссылку.");
			}
		}
	}
	async function shareResultUrl() {
		if (typeof navigator !== "undefined" && typeof navigator.share === "function") try {
			await navigator.share({
				title: video.title,
				text: author ? `${video.title} — ${author}` : video.title,
				url: video.url
			});
			return;
		} catch (err) {
			if (err instanceof Error && err.name === "AbortError") return;
		}
		await copyResultUrl();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid sm:grid-cols-[240px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "sprocket absolute inset-y-3 left-0 w-2.5 rounded-full" }), video.thumbnail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: video.thumbnail,
					alt: "",
					referrerPolicy: "no-referrer",
					className: "aspect-video h-full w-full object-cover sm:aspect-auto",
					onError: (event) => {
						const img = event.currentTarget;
						if (video.source !== "youtube") {
							img.style.display = "none";
							return;
						}
						const fallback = thumbnailUrl(video.id, "hqdefault");
						if (img.src !== fallback) img.src = fallback;
					}
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-surface-2 aspect-video h-full w-full sm:aspect-auto sm:min-h-40" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-4 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "mr-1 size-3" }), sourceLabel(video.source)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								children: video.id
							}),
							video.isLive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "эфир" }) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-xl leading-snug font-semibold tracking-display text-foreground",
						children: video.title
					}),
					author ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: author
					}) : loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-2 h-4 w-32" }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: formatDuration(video.durationSec)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: formatViews(video.views)
							})]
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: video.url,
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex h-11 w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
							children: [openLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							className: "h-11",
							onClick: () => void copyResultUrl(),
							children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), "Скопировать ссылку на результат"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							className: "h-11",
							onClick: () => void shareResultUrl(),
							"aria-label": "Поделиться ссылкой",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), "Поделиться"]
						})
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border p-5",
			children: loading && video.presets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-14 w-full rounded-xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-14 w-full rounded-xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-14 w-2/3 rounded-xl" })
				]
			}) : !video.downloadable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: video.restriction ?? "Для этой публикации файлы недоступны."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					className: "h-11 shrink-0",
					disabled: loading,
					onClick: onRetry,
					children: "Найти ещё раз"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					bulkPresets.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 rounded-xl border border-border bg-surface-2 p-3.5 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-medium text-foreground",
								children: [
									"Полный комплект (",
									bulkPresets.length,
									" файла)"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: bulkSummary
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							className: "h-10 shrink-0",
							disabled: pendingPreset !== null || bulkProgress !== null || loading,
							onClick: onDownloadAll,
							children: bulkProgress ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }),
								"Скачиваем ",
								bulkProgress.current,
								" из ",
								bulkProgress.total,
								"…"
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderDown, {}), "Скачать всё сразу"] })
						})]
					}) : null,
					groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-2 flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(group.icon, { className: "size-3.5" }), group.title]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: group.items.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresetRow, {
							preset,
							busy: pendingPreset === preset.id,
							disabled: pendingPreset !== null || bulkProgress !== null || loading,
							onDownload: () => onDownload(preset)
						}) }, preset.id))
					})] }, group.title)),
					(video.source === "youtube" || video.source === "vimeo") && videos.length > 0 && muxed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Потоки высокого разрешения отдаются раздельно. Скачайте видео и аудиодорожку отдельно или нажмите «Скачать всё сразу»."
					}) : null
				]
			})
		})]
	});
}
function PresetRow({ preset, busy, disabled, onDownload }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 rounded-xl bg-surface-2 px-3 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-sm font-medium text-foreground",
				children: preset.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "truncate text-xs text-muted-foreground",
				children: [
					preset.ext.toUpperCase(),
					" · ",
					formatBytes(preset.sizeBytes),
					" · ",
					preset.note
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			size: "sm",
			className: "shrink-0",
			disabled,
			onClick: onDownload,
			children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), busy ? "Секунда" : "Скачать"]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomePage, {});
}
//#endregion
export { Home as component };
