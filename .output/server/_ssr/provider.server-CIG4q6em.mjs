import { _ as parseX, s as canonicalXUrl } from "./source-Cs9ZLiNi.mjs";
import { n as fileDownloadPath } from "./disposition-cFkjd5Bs.mjs";
import { i as safeFilename } from "./format-ebeqqiKW.mjs";
import { a as asString, i as asRecord, r as asNumber, t as BROWSER_UA } from "./http.server-g2lDO9wb.mjs";
import { n as createFormatCache, r as openDirectUrl, t as buildDirectPresets } from "./direct.server-n_2q6Lw0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/provider.server-CIG4q6em.js
var cache = createFormatCache(9e5);
var JSON_HEADERS = {
	"user-agent": BROWSER_UA,
	accept: "application/json,text/plain,*/*",
	"accept-language": "en-US,en;q=0.9"
};
var STREAM_HEADERS = {
	"user-agent": BROWSER_UA,
	accept: "*/*",
	referer: "https://x.com/"
};
function syndicationToken(id) {
	return (Number(id) / 0x38d7ea4c68000 * Math.PI).toString(36).replace(/(0+|\.)/g, "");
}
function variantsFrom(node) {
	const raw = node.variants ?? node.formats ?? node.format ?? asRecord(node.video_info)?.variants ?? asRecord(node.videoInfo)?.variants;
	if (!Array.isArray(raw)) return [];
	const seen = /* @__PURE__ */ new Set();
	const items = [];
	const sorted = [...raw].sort((a, b) => {
		const ar = asRecord(a);
		const br = asRecord(b);
		return (asNumber(br?.bitrate) ?? 0) - (asNumber(ar?.bitrate) ?? 0);
	});
	for (const item of sorted) {
		const rec = asRecord(item);
		const url = asString(rec?.url);
		const type = (asString(rec?.content_type) ?? asString(rec?.contentType) ?? "").toLowerCase();
		if (!url) continue;
		if (type.includes("mpegurl") || url.includes(".m3u8")) continue;
		if (type && !type.includes("mp4") && !url.includes(".mp4")) continue;
		const heightMatch = url.match(/\/(\d{3,4})x\d{3,4}\//)?.[1];
		const parsedHeight = heightMatch ? Number(heightMatch) : null;
		const height = asNumber(rec?.height) ?? (parsedHeight !== null && Number.isFinite(parsedHeight) ? parsedHeight : null);
		const width = asNumber(rec?.width);
		const key = `${height ?? url}`;
		if (seen.has(key)) continue;
		seen.add(key);
		items.push({
			videoUrl: url,
			width,
			height,
			quality: height && height >= 100 ? `${height}p` : "HD",
			note: "готовое видео",
			headers: STREAM_HEADERS
		});
		if (items.length >= 4) break;
	}
	return items;
}
function mediaItemFrom(node) {
	const type = (asString(node.type) ?? "").toLowerCase();
	const variants = variantsFrom(node);
	if (variants.length > 0) return variants;
	const directUrl = asString(node.url) ?? asString(node.media_url_https) ?? asString(node.thumbnail_url);
	if ((type === "video" || type === "gif" || type === "animated_gif" || Boolean(directUrl?.includes(".mp4"))) && directUrl && !directUrl.includes(".m3u8")) return [{
		videoUrl: directUrl,
		width: asNumber(node.width) ?? asNumber(asRecord(node.size)?.width),
		height: asNumber(node.height) ?? asNumber(asRecord(node.size)?.height),
		note: type === "gif" || type === "animated_gif" ? "GIF как mp4" : "готовое видео",
		headers: STREAM_HEADERS
	}];
	if (directUrl && !directUrl.includes(".mp4")) return [{
		imageUrl: directUrl,
		width: asNumber(node.width) ?? asNumber(asRecord(node.size)?.width),
		height: asNumber(node.height) ?? asNumber(asRecord(node.size)?.height),
		note: "оригинал",
		headers: STREAM_HEADERS
	}];
	return [];
}
function collectFromList(list, acc, seen) {
	if (!Array.isArray(list)) return;
	for (const node of list) {
		const rec = asRecord(node);
		if (!rec) continue;
		for (const item of mediaItemFrom(rec)) {
			const key = item.videoUrl || item.imageUrl || "";
			if (!key || seen.has(key)) continue;
			seen.add(key);
			acc.push(item);
		}
	}
}
function itemsFromMedia(media) {
	const rec = asRecord(media);
	if (!rec) return [];
	const items = [];
	const seen = /* @__PURE__ */ new Set();
	collectFromList(rec.all, items, seen);
	collectFromList(rec.videos, items, seen);
	collectFromList(rec.gifs, items, seen);
	collectFromList(rec.photos, items, seen);
	return items;
}
function itemsFromVx(json) {
	const items = [];
	const seen = /* @__PURE__ */ new Set();
	collectFromList(json.media_extended, items, seen);
	if (items.length === 0 && Array.isArray(json.mediaURLs)) for (const url of json.mediaURLs) {
		if (typeof url !== "string") continue;
		if (url.includes(".mp4")) items.push({
			videoUrl: url,
			headers: STREAM_HEADERS,
			note: "готовое видео"
		});
		else items.push({
			imageUrl: url,
			headers: STREAM_HEADERS,
			note: "оригинал"
		});
	}
	return items;
}
function itemsFromSyndication(json) {
	const items = [];
	const seen = /* @__PURE__ */ new Set();
	collectFromList(json.mediaDetails, items, seen);
	if (items.length === 0) collectFromList(json.photos, items, seen);
	if (items.length === 0) {
		const video = asRecord(json.video);
		if (video) collectFromList([{
			...video,
			type: "video"
		}], items, seen);
	}
	return items;
}
function normalizeFx(json) {
	const tweet = asRecord(json.tweet) ?? json;
	const id = asString(tweet.id) ?? asString(tweet.tweetID);
	if (!id) return null;
	const author = asRecord(tweet.author);
	const screen = asString(author?.screen_name) ?? asString(tweet.user_screen_name) ?? "";
	const text = (asString(tweet.text) ?? "").replace(/\s+/g, " ").trim();
	const items = itemsFromMedia(tweet.media);
	const media = asRecord(tweet.media);
	const videos = Array.isArray(media?.videos) ? media.videos : [];
	const firstVideo = asRecord(videos[0]);
	const thumb = asString(firstVideo?.thumbnail_url) ?? items.find((item) => item.imageUrl)?.imageUrl ?? "";
	return {
		id,
		title: (text || (screen ? `Пост @${screen}` : "Пост X")).slice(0, 140),
		author: screen,
		authorUrl: screen ? `https://x.com/${screen}` : null,
		thumbnail: thumb,
		durationSec: asNumber(firstVideo?.duration) != null ? Math.round(asNumber(firstVideo?.duration) ?? 0) : null,
		views: asNumber(tweet.views),
		items
	};
}
function normalizeVx(json) {
	const id = asString(json.tweetID) ?? asString(json.conversationID);
	if (!id) return null;
	const screen = asString(json.user_screen_name) ?? "";
	const text = (asString(json.text) ?? "").replace(/\s+/g, " ").trim();
	const items = itemsFromVx(json);
	const first = Array.isArray(json.media_extended) ? asRecord(json.media_extended[0]) : null;
	return {
		id,
		title: (text || (screen ? `Пост @${screen}` : "Пост X")).slice(0, 140),
		author: screen,
		authorUrl: screen ? `https://x.com/${screen}` : null,
		thumbnail: asString(first?.thumbnail_url) ?? items.find((item) => item.imageUrl)?.imageUrl ?? "",
		durationSec: asNumber(first?.duration_millis) != null ? Math.round((asNumber(first?.duration_millis) ?? 0) / 1e3) : null,
		views: asNumber(json.views),
		items
	};
}
function normalizeSyndication(json, fallbackId) {
	const id = asString(json.id_str) ?? asString(json.id) ?? fallbackId;
	const user = asRecord(json.user);
	const screen = asString(user?.screen_name) ?? "";
	const text = (asString(json.text) ?? asString(json.full_text) ?? "").replace(/\s+/g, " ").trim();
	const items = itemsFromSyndication(json);
	if (!id) return null;
	return {
		id,
		title: (text || (screen ? `Пост @${screen}` : "Пост X")).slice(0, 140),
		author: screen,
		authorUrl: screen ? `https://x.com/${screen}` : null,
		thumbnail: items.find((item) => item.imageUrl)?.imageUrl ?? "",
		durationSec: null,
		views: null,
		items
	};
}
async function fetchJson(url) {
	try {
		const res = await fetch(url, {
			headers: JSON_HEADERS,
			redirect: "follow"
		});
		if (!res.ok) return null;
		const text = await res.text();
		if (!text.trim().startsWith("{") && !text.trim().startsWith("[")) return null;
		const parsed = JSON.parse(text);
		return asRecord(parsed);
	} catch {
		return null;
	}
}
async function resolveShort(url) {
	try {
		return (await fetch(url, {
			headers: {
				"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
				accept: "text/html,*/*"
			},
			redirect: "follow"
		})).url || url;
	} catch {
		return url;
	}
}
async function loadTweet(id) {
	const fx = await fetchJson(`https://api.fxtwitter.com/status/${id}`);
	if (fx && (fx.code === 200 || asRecord(fx.tweet))) {
		const normalized = normalizeFx(fx);
		if (normalized) return normalized;
	}
	const vx = await fetchJson(`https://api.vxtwitter.com/status/${id}`);
	if (vx && !asString(vx.error)) {
		const normalized = normalizeVx(vx);
		if (normalized) return normalized;
	}
	const token = syndicationToken(id);
	const syn = await fetchJson(`https://cdn.syndication.twimg.com/tweet-result?id=${encodeURIComponent(id)}&lang=en&token=${encodeURIComponent(token)}`);
	if (syn) {
		const normalized = normalizeSyndication(syn, id);
		if (normalized) return normalized;
	}
	return null;
}
function toInspect(media) {
	const photoCount = media.items.filter((item) => item.imageUrl && !item.videoUrl).length;
	const videoUrls = new Set(media.items.map((item) => item.videoUrl).filter(Boolean));
	const numbered = photoCount > 1 || videoUrls.size > 1;
	const { presets, formats } = buildDirectPresets("x", media.items, void 0, numbered);
	cache.set(media.id, media.title, formats);
	return {
		id: media.id,
		source: "x",
		url: canonicalXUrl(media.id),
		title: media.title,
		author: media.author,
		authorUrl: media.authorUrl,
		thumbnail: media.thumbnail,
		durationSec: media.durationSec,
		views: media.views,
		isLive: false,
		downloadable: presets.length > 0,
		restriction: presets.length > 0 ? null : "В этом посте нет видео или фото.",
		presets
	};
}
async function inspect(rawUrl) {
	let ref = parseX(rawUrl);
	if (!ref) return {
		ok: false,
		error: "Не похоже на ссылку X. Подойдёт пост x.com или twitter.com."
	};
	if (ref.kind === "short") {
		const resolved = await resolveShort(ref.url);
		const next = parseX(resolved);
		if (!next || next.kind === "short") return {
			ok: false,
			error: "Не удалось раскрыть короткую ссылку X. Откройте пост и скопируйте обычную ссылку."
		};
		ref = next;
	}
	try {
		const media = await loadTweet(ref.id);
		if (!media) return {
			ok: false,
			error: "Пост скрыт, удалён или X не отдаёт его без входа. Откройте публичный пост."
		};
		return {
			ok: true,
			video: toInspect(media)
		};
	} catch {
		return {
			ok: false,
			error: "X не ответил. Проверьте ссылку и попробуйте ещё раз."
		};
	}
}
async function loadCachedFormat(id, presetId) {
	let entry = cache.get(id);
	if (!entry || !entry.formats.has(presetId)) {
		if (!(await inspect(canonicalXUrl(id))).ok) return null;
		entry = cache.get(id);
	}
	const format = entry?.formats.get(presetId);
	if (!entry || !format) return null;
	return {
		title: entry.title,
		format
	};
}
async function getDownloadLink(id, presetId) {
	const loaded = await loadCachedFormat(id, presetId);
	if (!loaded) return {
		ok: false,
		error: "Этот вариант больше недоступен. Обновите карточку публикации."
	};
	return {
		ok: true,
		url: fileDownloadPath("x", id, presetId),
		filename: `${safeFilename(loaded.title)}.${loaded.format.ext}`,
		mime: loaded.format.mime
	};
}
async function openXStream(id, presetId) {
	const loaded = await loadCachedFormat(id, presetId);
	if (!loaded) return {
		ok: false,
		error: "Этот вариант больше недоступен. Обновите карточку публикации."
	};
	return openDirectUrl(loaded.format, loaded.title);
}
//#endregion
export { getDownloadLink, inspect, openXStream };
