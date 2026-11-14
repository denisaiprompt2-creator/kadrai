//#region node_modules/.nitro/vite/services/ssr/assets/source-Cs9ZLiNi.js
var HOSTS$6 = /* @__PURE__ */ new Set([
	"instagram.com",
	"www.instagram.com",
	"m.instagram.com",
	"www.m.instagram.com",
	"instagr.am",
	"www.instagr.am"
]);
var SHORTCODE_RE = /^[A-Za-z0-9_-]{5,15}$/;
var PK_RE = /^\d{5,25}$/;
var IG_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
var EMBEDDED_URL_RE$2 = /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:instagram\.com|instagr\.am)\/[^\s<>"'`]+/i;
function pkToShortcode(rawPk) {
	if (!rawPk) return null;
	const cleaned = rawPk.split("_")[0]?.trim() ?? "";
	if (!PK_RE.test(cleaned)) return null;
	try {
		let num = BigInt(cleaned);
		if (num <= 0n) return null;
		let code = "";
		while (num > 0n) {
			code = (IG_ALPHABET[Number(num % 64n)] ?? "A") + code;
			num /= 64n;
		}
		return code || null;
	} catch {
		return null;
	}
}
function shortcodeToPk(code) {
	if (!code || !isInstagramShortcode(code)) return null;
	try {
		let num = 0n;
		for (const ch of code) {
			const idx = IG_ALPHABET.indexOf(ch);
			if (idx === -1) return null;
			num = num * 64n + BigInt(idx);
		}
		return num > 0n ? num.toString() : null;
	} catch {
		return null;
	}
}
function isInstagramShortcode(value) {
	return typeof value === "string" && SHORTCODE_RE.test(value) && !PK_RE.test(value);
}
function normalizeInstagramInput(input) {
	return input.replace(/[\u200b-\u200d\ufeff]/g, "").trim();
}
function parseInstagram(input) {
	const trimmed = normalizeInstagramInput(input);
	if (!trimmed) return null;
	const direct = parseFromCandidate$2(trimmed);
	if (direct) return direct;
	const embedded = trimmed.match(EMBEDDED_URL_RE$2);
	if (embedded?.[0]) {
		const fromEmbed = parseFromCandidate$2(embedded[0]);
		if (fromEmbed) return fromEmbed;
	}
	return null;
}
function parseFromCandidate$2(trimmed) {
	const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
	let url;
	try {
		url = new URL(withProto);
	} catch {
		return null;
	}
	const host = url.hostname.replace(/^www\./, "");
	if (!HOSTS$6.has(host) && !HOSTS$6.has(url.hostname)) return null;
	const parts = url.pathname.split("/").filter(Boolean);
	if (parts.length === 0) return null;
	const first = parts[0] ?? "";
	const queryStoryMediaId = url.searchParams.get("story_media_id");
	if (first === "s") {
		const storyPk = queryStoryMediaId?.split("_")[0] ?? null;
		return {
			kind: "stories",
			shortcode: pkToShortcode(storyPk),
			storyId: storyPk ?? parts[1] ?? null,
			username: null,
			url: url.href
		};
	}
	if (first === "stories") {
		const username = !(parts[1] === "highlights") ? parts[1] ?? null : null;
		const rawThird = parts[2] ?? queryStoryMediaId?.split("_")[0] ?? null;
		const shortcode = pkToShortcode(rawThird) ?? pkToShortcode(queryStoryMediaId) ?? (isInstagramShortcode(rawThird) ? rawThird : null);
		return {
			kind: "stories",
			shortcode,
			storyId: rawThird ?? (shortcode ? shortcodeToPk(shortcode) : null) ?? parts[1] ?? null,
			username,
			url: `https://www.instagram.com/${parts.join("/")}/`
		};
	}
	if (first === "share") return {
		kind: "share",
		shortcode: null,
		url: `https://www.instagram.com/${parts.join("/")}/`
	};
	if (first === "p" || first === "reel" || first === "reels" || first === "tv") {
		const code = parts[1] ?? "";
		const resolvedCode = pkToShortcode(code) ?? (isInstagramShortcode(code) ? code : null);
		if (!resolvedCode) return null;
		const kind = first === "tv" ? "tv" : first === "p" ? "p" : "reel";
		return {
			kind,
			shortcode: resolvedCode,
			url: canonicalInstagramUrl(kind, resolvedCode)
		};
	}
	if (parts.length >= 3 && (parts[1] === "p" || parts[1] === "reel" || parts[1] === "reels" || parts[1] === "tv")) {
		const code = parts[2] ?? "";
		const resolvedCode = pkToShortcode(code) ?? (isInstagramShortcode(code) ? code : null);
		if (!resolvedCode) return null;
		const kind = parts[1] === "tv" ? "tv" : parts[1] === "p" ? "p" : "reel";
		return {
			kind,
			shortcode: resolvedCode,
			username: parts[0] ?? null,
			url: canonicalInstagramUrl(kind, resolvedCode)
		};
	}
	return null;
}
function canonicalInstagramUrl(kind, shortcode, username, storyId) {
	if (kind === "stories") {
		const userPart = username || "instagram";
		const idPart = storyId || shortcodeToPk(shortcode) || shortcode;
		return `https://www.instagram.com/stories/${encodeURIComponent(userPart)}/${encodeURIComponent(idPart)}/`;
	}
	return `https://www.instagram.com/${kind === "tv" ? "tv" : kind === "p" ? "p" : "reel"}/${shortcode}/`;
}
function instagramProfileUrl(username) {
	return `https://www.instagram.com/${encodeURIComponent(username)}/`;
}
var ID_RE$3 = /^[a-zA-Z0-9_-]{11}$/;
var HOSTS$5 = /* @__PURE__ */ new Set([
	"youtube.com",
	"m.youtube.com",
	"music.youtube.com",
	"youtube-nocookie.com",
	"youtu.be",
	"www.youtube.com",
	"www.youtube-nocookie.com"
]);
var EMBEDDED_URL_RE$1 = /(?:https?:\/\/)?(?:www\.)?(?:music\.)?(?:m\.)?(?:youtube\.com|youtu\.be|youtube-nocookie\.com)\/[^\s<>"'`]+/i;
function isYouTubeId(value) {
	return typeof value === "string" && ID_RE$3.test(value);
}
function normalizeYouTubeInput(input) {
	return input.replace(/[\u200b-\u200d\ufeff]/g, "").trim();
}
function parseYouTubeId(input) {
	const trimmed = normalizeYouTubeInput(input);
	if (!trimmed) return null;
	if (isYouTubeId(trimmed)) return trimmed;
	const direct = parseFromCandidate$1(trimmed);
	if (direct) return direct;
	const embedded = trimmed.match(EMBEDDED_URL_RE$1);
	if (embedded?.[0]) {
		const fromEmbed = parseFromCandidate$1(embedded[0]);
		if (fromEmbed) return fromEmbed;
	}
	return null;
}
function parseFromCandidate$1(trimmed) {
	const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
	let url;
	try {
		url = new URL(withProto);
	} catch {
		return null;
	}
	const host = url.hostname.replace(/^www\./, "");
	if (!HOSTS$5.has(host) && !HOSTS$5.has(url.hostname)) return null;
	if (host === "youtu.be") {
		const id = url.pathname.split("/").filter(Boolean)[0] ?? "";
		return isYouTubeId(id) ? id : null;
	}
	const direct = url.searchParams.get("v");
	if (isYouTubeId(direct)) return direct;
	const parts = url.pathname.split("/").filter(Boolean);
	if (parts.length >= 2 && [
		"shorts",
		"embed",
		"live",
		"v",
		"e"
	].includes(parts[0] ?? "")) {
		const id = parts[1] ?? "";
		if (isYouTubeId(id)) return id;
	}
	if (parts[0] && isYouTubeId(parts[0])) return parts[0];
	return null;
}
function watchUrl(id) {
	return `https://www.youtube.com/watch?v=${id}`;
}
function thumbnailUrl(id, kind = "hq720") {
	return `https://i.ytimg.com/vi/${id}/${kind}.jpg`;
}
var HOSTS$4 = /* @__PURE__ */ new Set([
	"x.com",
	"www.x.com",
	"twitter.com",
	"www.twitter.com",
	"mobile.twitter.com",
	"m.twitter.com",
	"vxtwitter.com",
	"fxtwitter.com",
	"t.co"
]);
var ID_RE$2 = /^\d{5,20}$/;
function parseX(input) {
	const trimmed = input.replace(/[\u200b-\u200d\ufeff]/g, "").trim();
	if (!trimmed) return null;
	if (ID_RE$2.test(trimmed)) return {
		id: trimmed,
		url: canonicalXUrl(trimmed),
		kind: "status"
	};
	const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
	let url;
	try {
		url = new URL(withProto);
	} catch {
		return null;
	}
	const host = url.hostname.replace(/^www\./, "");
	if (!HOSTS$4.has(host) && !HOSTS$4.has(url.hostname)) return null;
	if (host === "t.co") {
		const slug = url.pathname.split("/").filter(Boolean)[0] ?? "";
		if (!slug) return null;
		return {
			id: slug,
			url: url.href,
			kind: "short"
		};
	}
	const parts = url.pathname.split("/").filter(Boolean);
	const statusIdx = parts.findIndex((p) => p === "status");
	if (statusIdx >= 0) {
		const id = (parts[statusIdx + 1] ?? "").split("?")[0];
		if (!ID_RE$2.test(id)) return null;
		return {
			id,
			url: canonicalXUrl(id),
			kind: "status"
		};
	}
	if (parts.length >= 2 && ID_RE$2.test(parts[1] ?? "")) return {
		id: parts[1],
		url: canonicalXUrl(parts[1]),
		kind: "status"
	};
	return null;
}
function canonicalXUrl(id) {
	return `https://x.com/i/status/${id}`;
}
var HOSTS$3 = /* @__PURE__ */ new Set([
	"threads.net",
	"www.threads.net",
	"threads.com",
	"www.threads.com"
]);
var CODE_RE = /^[A-Za-z0-9_-]{5,15}$/;
function parseThreads(input) {
	const trimmed = input.replace(/[\u200b-\u200d\ufeff]/g, "").trim();
	if (!trimmed) return null;
	if (CODE_RE.test(trimmed)) return {
		id: trimmed,
		url: canonicalThreadsUrl(trimmed),
		kind: "post"
	};
	const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
	let url;
	try {
		url = new URL(withProto);
	} catch {
		return null;
	}
	const host = url.hostname.replace(/^www\./, "");
	if (!HOSTS$3.has(host) && !HOSTS$3.has(url.hostname)) return null;
	const parts = url.pathname.split("/").filter(Boolean);
	if (parts[0] === "t" && parts[1] && CODE_RE.test(parts[1])) return {
		id: parts[1],
		url: canonicalThreadsUrl(parts[1]),
		kind: "post"
	};
	if (parts[0] === "share") {
		const slug = parts[1] ?? "";
		if (!slug) return null;
		return {
			id: slug,
			url: url.href,
			kind: "share"
		};
	}
	const postIdx = parts.findIndex((p) => p === "post");
	if (postIdx >= 0) {
		const id = parts[postIdx + 1] ?? "";
		if (!CODE_RE.test(id)) return null;
		const username = parts[0]?.startsWith("@") ? parts[0].slice(1) : void 0;
		return {
			id,
			url: canonicalThreadsUrl(id, username),
			kind: "post",
			username
		};
	}
	return null;
}
function canonicalThreadsUrl(id, username) {
	if (username) return `https://www.threads.com/@${username}/post/${id}`;
	return `https://www.threads.com/t/${id}`;
}
var HOSTS$2 = /* @__PURE__ */ new Set([
	"tiktok.com",
	"www.tiktok.com",
	"m.tiktok.com",
	"vm.tiktok.com",
	"vt.tiktok.com",
	"www.vm.tiktok.com",
	"www.vt.tiktok.com"
]);
var ID_RE$1 = /^\d{8,24}$/;
function parseTikTok(input) {
	const trimmed = input.replace(/[\u200b-\u200d\ufeff]/g, "").trim();
	if (!trimmed) return null;
	if (ID_RE$1.test(trimmed)) return {
		id: trimmed,
		url: canonicalTikTokUrl(trimmed),
		kind: "video"
	};
	const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
	let url;
	try {
		url = new URL(withProto);
	} catch {
		return null;
	}
	const host = url.hostname.replace(/^www\./, "");
	if (!HOSTS$2.has(host) && !HOSTS$2.has(url.hostname)) return null;
	if (host === "vm.tiktok.com" || host === "vt.tiktok.com") {
		const slug = url.pathname.split("/").filter(Boolean)[0] ?? "";
		if (!slug) return null;
		return {
			id: slug,
			url: url.href,
			kind: "short"
		};
	}
	const parts = url.pathname.split("/").filter(Boolean);
	if (parts[0] === "t" && parts[1]) return {
		id: parts[1],
		url: url.href,
		kind: "short"
	};
	const videoIdx = parts.findIndex((p) => p === "video" || p === "photo");
	if (videoIdx >= 0) {
		const id = (parts[videoIdx + 1] ?? "").split("?")[0];
		if (!ID_RE$1.test(id)) return null;
		const username = parts[0]?.startsWith("@") ? parts[0].slice(1) : void 0;
		const kind = parts[videoIdx] === "photo" ? "photo" : "video";
		return {
			id,
			url: canonicalTikTokUrl(id, username, kind),
			kind,
			username
		};
	}
	return null;
}
function canonicalTikTokUrl(id, username, kind = "video") {
	if (username) return `https://www.tiktok.com/@${username}/${kind}/${id}`;
	return `https://www.tiktok.com/@/${kind}/${id}`;
}
var HOSTS$1 = /* @__PURE__ */ new Set([
	"rutube.ru",
	"www.rutube.ru",
	"m.rutube.ru"
]);
var HEX_RE = /^[a-f0-9]{32}$/i;
var NUM_RE = /^\d{5,12}$/;
function parseRutube(input) {
	const trimmed = input.replace(/[\u200b-\u200d\ufeff]/g, "").trim();
	if (!trimmed) return null;
	if (HEX_RE.test(trimmed) || NUM_RE.test(trimmed)) return {
		id: trimmed,
		url: canonicalRutubeUrl(trimmed),
		kind: "video"
	};
	const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
	let url;
	try {
		url = new URL(withProto);
	} catch {
		return null;
	}
	const host = url.hostname.replace(/^www\./, "");
	if (!HOSTS$1.has(host) && !HOSTS$1.has(url.hostname)) return null;
	const parts = url.pathname.split("/").filter(Boolean);
	if (parts[0] === "video" || parts[0] === "shorts") {
		const id = parts[1] === "private" ? parts[2] : parts[1];
		if (!id || !HEX_RE.test(id) && !NUM_RE.test(id)) return null;
		const kind = parts[0] === "shorts" ? "shorts" : "video";
		return {
			id,
			url: canonicalRutubeUrl(id, kind),
			kind
		};
	}
	if (parts[0] === "play" && parts[1] === "embed" && parts[2]) return {
		id: parts[2],
		url: canonicalRutubeUrl(parts[2], "embed"),
		kind: "embed"
	};
	return null;
}
function canonicalRutubeUrl(id, kind = "video") {
	if (kind === "shorts") return `https://rutube.ru/shorts/${id}/`;
	if (kind === "embed") return `https://rutube.ru/play/embed/${id}`;
	return `https://rutube.ru/video/${id}/`;
}
var HOSTS = /* @__PURE__ */ new Set([
	"vimeo.com",
	"www.vimeo.com",
	"player.vimeo.com"
]);
var ID_RE = /^\d{4,15}$/;
var HASH_RE = /^[A-Za-z0-9]{4,24}$/;
var COMPOSITE_RE = /^(\d{4,15})(?::([A-Za-z0-9]{4,24}))?$/;
var EMBEDDED_URL_RE = /(?:https?:\/\/)?(?:www\.|player\.)?vimeo\.com\/[^\s<>"'`]+/i;
function splitVimeoCompositeId(composite) {
	const match = composite.trim().match(COMPOSITE_RE);
	if (!match?.[1]) return null;
	return {
		videoId: match[1],
		hash: match[2] ?? null
	};
}
function canonicalVimeoUrl(idOrComposite, hash) {
	const split = splitVimeoCompositeId(idOrComposite);
	const videoId = split?.videoId ?? idOrComposite;
	const resolvedHash = hash ?? split?.hash ?? null;
	return resolvedHash ? `https://vimeo.com/${videoId}/${resolvedHash}` : `https://vimeo.com/${videoId}`;
}
function parseVimeo(input) {
	const trimmed = input.replace(/[\u200b-\u200d\ufeff]/g, "").trim();
	if (!trimmed) return null;
	const direct = parseFromCandidate(trimmed);
	if (direct) return direct;
	const embedded = trimmed.match(EMBEDDED_URL_RE);
	if (embedded?.[0]) {
		const fromEmbed = parseFromCandidate(embedded[0]);
		if (fromEmbed) return fromEmbed;
	}
	return null;
}
function parseFromCandidate(trimmed) {
	const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
	let url;
	try {
		url = new URL(withProto);
	} catch {
		return null;
	}
	const host = url.hostname.toLowerCase();
	if (!HOSTS.has(host)) return null;
	const parts = url.pathname.split("/").filter(Boolean);
	if (parts.length === 0) return null;
	const queryHash = url.searchParams.get("h");
	const validQueryHash = queryHash && HASH_RE.test(queryHash) ? queryHash : null;
	if (host === "player.vimeo.com") {
		const videoIdx = parts.indexOf("video");
		const candidate = videoIdx >= 0 ? parts[videoIdx + 1] : parts[0];
		if (!candidate || !ID_RE.test(candidate)) return null;
		const pathHash = videoIdx >= 0 && parts[videoIdx + 2] && HASH_RE.test(parts[videoIdx + 2]) ? parts[videoIdx + 2] : null;
		const hash = validQueryHash ?? pathHash;
		return {
			id: hash ? `${candidate}:${hash}` : candidate,
			videoId: candidate,
			hash,
			url: canonicalVimeoUrl(candidate, hash)
		};
	}
	if (ID_RE.test(parts[0])) {
		const videoId = parts[0];
		const pathHash = parts[1] && HASH_RE.test(parts[1]) ? parts[1] : null;
		const hash = validQueryHash ?? pathHash;
		return {
			id: hash ? `${videoId}:${hash}` : videoId,
			videoId,
			hash,
			url: canonicalVimeoUrl(videoId, hash)
		};
	}
	for (let i = parts.length - 1; i >= 0; i -= 1) {
		const seg = parts[i];
		if (ID_RE.test(seg)) {
			const nextSeg = parts[i + 1];
			const pathHash = nextSeg && HASH_RE.test(nextSeg) ? nextSeg : null;
			const hash = validQueryHash ?? pathHash;
			return {
				id: hash ? `${seg}:${hash}` : seg,
				videoId: seg,
				hash,
				url: canonicalVimeoUrl(seg, hash)
			};
		}
	}
	return null;
}
var MEDIA_SOURCES = [
	"youtube",
	"instagram",
	"x",
	"threads",
	"tiktok",
	"rutube",
	"vimeo"
];
var LABELS = {
	youtube: "YouTube",
	instagram: "Instagram",
	x: "X",
	threads: "Threads",
	tiktok: "TikTok",
	rutube: "RuTube",
	vimeo: "Vimeo"
};
function isMediaSource(value) {
	return Boolean(value && MEDIA_SOURCES.includes(value));
}
function sourceLabel(source) {
	if (source && source in LABELS) return LABELS[source];
	return "YouTube";
}
function openOnLabel(source) {
	if (source === "instagram") return "Открыть в Instagram";
	if (source === "x") return "Открыть в X";
	if (source === "threads") return "Открыть в Threads";
	if (source === "tiktok") return "Открыть в TikTok";
	if (source === "rutube") return "Открыть на RuTube";
	if (source === "vimeo") return "Открыть на Vimeo";
	return "Открыть на YouTube";
}
function detectMedia(input) {
	const trimmed = input.replace(/[\u200b-\u200d\ufeff]/g, "").trim();
	if (!trimmed) return null;
	const ig = parseInstagram(trimmed);
	if (ig) return {
		source: "instagram",
		id: ig.shortcode ?? ig.storyId ?? "share",
		url: ig.url,
		kind: ig.kind
	};
	const yt = parseYouTubeId(trimmed);
	if (yt) return {
		source: "youtube",
		id: yt,
		url: watchUrl(yt)
	};
	const vm = parseVimeo(trimmed);
	if (vm) return {
		source: "vimeo",
		id: vm.id,
		url: vm.url
	};
	const tt = parseTikTok(trimmed);
	if (tt) return {
		source: "tiktok",
		id: tt.id,
		url: tt.url,
		kind: tt.kind
	};
	const x = parseX(trimmed);
	if (x) return {
		source: "x",
		id: x.id,
		url: x.url,
		kind: x.kind
	};
	const th = parseThreads(trimmed);
	if (th) return {
		source: "threads",
		id: th.id,
		url: th.url,
		kind: th.kind
	};
	const rt = parseRutube(trimmed);
	if (rt) return {
		source: "rutube",
		id: rt.id,
		url: rt.url,
		kind: rt.kind
	};
	return null;
}
function canonicalUrl(source, id, fallback) {
	if (fallback) return fallback;
	if (source === "youtube") return watchUrl(id);
	if (source === "instagram") return canonicalInstagramUrl("p", id);
	if (source === "tiktok") return canonicalTikTokUrl(id);
	if (source === "x") return `https://x.com/i/status/${id}`;
	if (source === "threads") return `https://www.threads.com/t/${id}`;
	if (source === "rutube") return `https://rutube.ru/video/${id}/`;
	if (source === "vimeo") return canonicalVimeoUrl(id);
	return fallback ?? "";
}
//#endregion
export { watchUrl as S, parseX as _, canonicalUrl as a, splitVimeoCompositeId as b, detectMedia as c, openOnLabel as d, parseInstagram as f, parseVimeo as g, parseTikTok as h, canonicalTikTokUrl as i, instagramProfileUrl as l, parseThreads as m, canonicalRutubeUrl as n, canonicalVimeoUrl as o, parseRutube as p, canonicalThreadsUrl as r, canonicalXUrl as s, canonicalInstagramUrl as t, isMediaSource as u, parseYouTubeId as v, thumbnailUrl as x, sourceLabel as y };
