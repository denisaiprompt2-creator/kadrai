import { m as parseThreads, r as canonicalThreadsUrl } from "./source-Cs9ZLiNi.mjs";
import { n as fileDownloadPath } from "./disposition-cFkjd5Bs.mjs";
import { i as safeFilename } from "./format-ebeqqiKW.mjs";
import { a as asString, c as fetchText, f as walkRecords, i as asRecord, l as inlineThumbnail, n as GOOGLEBOT_UA, r as asNumber, t as BROWSER_UA } from "./http.server-g2lDO9wb.mjs";
import { i as qualityFromSize, n as createFormatCache, r as openDirectUrl, t as buildDirectPresets } from "./direct.server-n_2q6Lw0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/provider.server-Y_7F9w-Y.js
var cache = createFormatCache(9e5);
var PAGE_HEADERS = {
	"user-agent": GOOGLEBOT_UA,
	accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
	"accept-language": "en-US,en;q=0.9"
};
var STREAM_HEADERS = {
	"user-agent": BROWSER_UA,
	accept: "*/*",
	referer: "https://www.threads.com/",
	origin: "https://www.threads.com"
};
function decodeHtml(value) {
	const amp = String.fromCharCode(38);
	let text = value.split(`${amp}amp;`).join(amp).split(`${amp}quot;`).join("\"").split(`${amp}lt;`).join("<").split(`${amp}gt;`).join(">");
	text = text.replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16)));
	text = text.replace(/&#(\d+);/g, (_, num) => String.fromCharCode(Number(num)));
	return text;
}
function isProfileImageUrl(url) {
	const lower = url.toLowerCase();
	return lower.includes("t51.2885-19") || lower.includes("profile_pic") || lower.includes("rsrc.php") || lower.includes("/static/");
}
function largestVersion(list) {
	if (!Array.isArray(list) || list.length === 0) return null;
	let best = null;
	for (const item of list) {
		const rec = asRecord(item);
		const url = asString(rec?.url);
		if (!url) continue;
		const width = asNumber(rec?.width) ?? 0;
		const height = asNumber(rec?.height);
		if (!best || width > best.width) best = {
			url,
			width,
			height
		};
	}
	return best ? {
		url: best.url,
		width: best.width || null,
		height: best.height
	} : null;
}
function posterFrom(node) {
	return largestVersion(asRecord(node.image_versions2)?.candidates)?.url ?? "";
}
function itemFromNode(node) {
	const video = largestVersion(node.video_versions);
	const image = largestVersion(asRecord(node.image_versions2)?.candidates) ?? (asString(node.thumbnail_url) || asString(node.display_url) ? {
		url: asString(node.thumbnail_url) ?? asString(node.display_url) ?? "",
		width: null,
		height: null
	} : null);
	if (image && isProfileImageUrl(image.url)) {
		if (!video) return null;
	}
	if (!video && !image) return null;
	const width = video?.width ?? asNumber(node.original_width) ?? image?.width;
	const height = video?.height ?? asNumber(node.original_height) ?? image?.height;
	return {
		videoUrl: video?.url,
		imageUrl: video ? null : image?.url,
		width,
		height,
		quality: qualityFromSize(width, height),
		note: video ? "готовое видео" : "оригинал",
		headers: STREAM_HEADERS
	};
}
function collectItems(node) {
	const carousel = Array.isArray(node.carousel_media) ? node.carousel_media : [];
	const items = [];
	if (carousel.length > 0) {
		for (const child of carousel) {
			const rec = asRecord(child);
			if (!rec) continue;
			const item = itemFromNode(rec);
			if (item) items.push(item);
		}
		return items;
	}
	const item = itemFromNode(node);
	return item ? [item] : [];
}
function nestedMediaNodes(node) {
	const info = asRecord(node.text_post_app_info);
	const share = asRecord(info?.share_info);
	const out = [];
	for (const key of [
		"quoted_attachment_post",
		"quoted_post",
		"reposted_post"
	]) {
		const rec = asRecord(share?.[key]);
		if (rec) out.push(rec);
	}
	const linked = asRecord(info?.linked_inline_media);
	if (linked) out.push(linked);
	return out;
}
function captionFrom(node) {
	const caption = node.caption;
	if (typeof caption === "string") return caption;
	const nested = asString(asRecord(caption)?.text);
	if (nested) return nested;
	const text = asString(node.text);
	if (text) return text;
	const fragments = asRecord(asRecord(node.text_post_app_info)?.text_with_entities)?.text;
	return asString(fragments) ?? "";
}
function authorFrom(node) {
	const user = asRecord(node.user) ?? asRecord(node.owner);
	return asString(user?.username) ?? asString(user?.name) ?? "";
}
function normalizeNode(node, fallbackId) {
	const id = asString(node.code) ?? asString(node.shortcode) ?? fallbackId;
	if (!id) return null;
	let items = collectItems(node);
	let mediaNode = node;
	if (!items.some((item) => item.videoUrl)) for (const nested of nestedMediaNodes(node)) {
		const extra = collectItems(nested);
		if (extra.some((item) => item.videoUrl)) {
			items = extra;
			mediaNode = nested;
			break;
		}
		if (items.length === 0 && extra.length > 0) {
			items = extra;
			mediaNode = nested;
		}
	}
	if (items.length === 0) return null;
	const author = authorFrom(node);
	const caption = captionFrom(node).replace(/\s+/g, " ").trim();
	const thumb = posterFrom(mediaNode) || posterFrom(node) || items.find((item) => item.imageUrl)?.imageUrl || "";
	return {
		id,
		title: (caption || (author ? `Публикация @${author}` : "Публикация Threads")).slice(0, 140),
		author,
		authorUrl: author ? `https://www.threads.com/@${author}` : null,
		thumbnail: thumb,
		durationSec: asNumber(mediaNode.video_duration) != null ? Math.round(asNumber(mediaNode.video_duration) ?? 0) : null,
		views: asNumber(node.play_count) ?? asNumber(node.view_count) ?? asNumber(node.ig_play_count),
		items
	};
}
function parseJsonScripts(html) {
	const blobs = [];
	const re = /<script[^>]*type="application\/json"[^>]*>([\s\S]*?)<\/script>/gi;
	let match;
	while (match = re.exec(html)) {
		const raw = match[1]?.trim() ?? "";
		if (!raw.startsWith("{") && !raw.startsWith("[")) continue;
		try {
			blobs.push(JSON.parse(raw));
		} catch {}
	}
	return blobs;
}
function extract(html, shortcode) {
	const blobs = parseJsonScripts(html);
	const matches = [];
	for (const blob of blobs) walkRecords(blob, (rec) => {
		const code = asString(rec.code) ?? asString(rec.shortcode);
		if (shortcode && code !== shortcode) return;
		const media = normalizeNode(rec, shortcode);
		if (!media) return;
		if (media.items.some((item) => item.videoUrl)) matches.unshift(media);
		else matches.push(media);
	});
	if (matches[0]) return matches[0];
	const ogVideoRaw = html.match(/property="og:video(?::url)?"\s+content="([^"]+)"/i)?.[1];
	const ogImageRaw = html.match(/property="og:image"\s+content="([^"]+)"/i)?.[1];
	const ogTitleRaw = html.match(/property="og:title"\s+content="([^"]+)"/i)?.[1];
	const ogVideo = ogVideoRaw ? decodeHtml(ogVideoRaw) : "";
	const ogImage = ogImageRaw ? decodeHtml(ogImageRaw) : "";
	const ogTitle = ogTitleRaw ? decodeHtml(ogTitleRaw) : "";
	const usableImage = ogImage && !isProfileImageUrl(ogImage) ? ogImage : "";
	if (!ogVideo && !usableImage) return null;
	const author = ogTitle.match(/@([A-Za-z0-9._]+)/)?.[1] ?? "";
	return {
		id: shortcode,
		title: author ? `Публикация @${author}` : "Публикация Threads",
		author,
		authorUrl: author ? `https://www.threads.com/@${author}` : null,
		thumbnail: usableImage || ogImage,
		durationSec: null,
		views: null,
		items: [{
			videoUrl: ogVideo || null,
			imageUrl: ogVideo ? null : usableImage,
			note: ogVideo ? "готовое видео" : "оригинал",
			headers: STREAM_HEADERS
		}]
	};
}
async function resolveShare(url) {
	try {
		const { res, text } = await fetchText(url, PAGE_HEADERS, 8e3);
		const parsed = parseThreads(res.url || url);
		if (parsed?.kind === "post") return parsed.id;
		const canonical = text.match(/rel="canonical"\s+href="([^"]+)"/i)?.[1] ?? text.match(/property="og:url"\s+content="([^"]+)"/i)?.[1];
		if (canonical) {
			const next = parseThreads(decodeHtml(canonical));
			if (next?.kind === "post") return next.id;
		}
	} catch {}
	return "";
}
function toInspect(media) {
	const { presets, formats } = buildDirectPresets("th", media.items);
	cache.set(media.id, media.title, formats);
	return {
		id: media.id,
		source: "threads",
		url: canonicalThreadsUrl(media.id, media.author || void 0),
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
	let ref = parseThreads(rawUrl);
	if (!ref) return {
		ok: false,
		error: "Не похоже на ссылку Threads. Подойдёт пост threads.net или threads.com."
	};
	if (ref.kind === "share") {
		const id = await resolveShare(ref.url);
		if (!id) return {
			ok: false,
			error: "Не удалось раскрыть share-ссылку Threads. Откройте публикацию и скопируйте обычную ссылку."
		};
		ref = {
			id,
			url: canonicalThreadsUrl(id),
			kind: "post"
		};
	}
	const urls = [
		ref.username ? canonicalThreadsUrl(ref.id, ref.username) : "",
		ref.username ? `https://www.threads.net/@${ref.username}/post/${ref.id}` : "",
		canonicalThreadsUrl(ref.id),
		`https://www.threads.net/t/${ref.id}`
	].filter(Boolean);
	try {
		let media = null;
		for (const url of urls) try {
			const { res, text } = await fetchText(url, PAGE_HEADERS, 12e3);
			if (!res.ok || text.length < 1e3) continue;
			media = extract(text, ref.id);
			if (media) break;
		} catch {}
		if (!media) return {
			ok: false,
			error: "Публикация скрыта, удалена или Threads не отдаёт её без входа."
		};
		if (media.thumbnail && !media.thumbnail.startsWith("data:")) {
			const inlined = await inlineThumbnail(media.thumbnail, STREAM_HEADERS);
			media.thumbnail = inlined.startsWith("data:") ? inlined : media.thumbnail;
		}
		return {
			ok: true,
			video: toInspect(media)
		};
	} catch {
		return {
			ok: false,
			error: "Threads не ответил. Проверьте ссылку и попробуйте ещё раз."
		};
	}
}
async function loadCachedFormat(id, presetId) {
	let entry = cache.get(id);
	if (!entry || !entry.formats.has(presetId)) {
		if (!(await inspect(canonicalThreadsUrl(id))).ok) return null;
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
		url: fileDownloadPath("threads", id, presetId),
		filename: `${safeFilename(loaded.title)}.${loaded.format.ext}`,
		mime: loaded.format.mime
	};
}
async function openThreadsStream(id, presetId) {
	const loaded = await loadCachedFormat(id, presetId);
	if (!loaded) return {
		ok: false,
		error: "Этот вариант больше недоступен. Обновите карточку публикации."
	};
	return openDirectUrl(loaded.format, loaded.title);
}
//#endregion
export { getDownloadLink, inspect, openThreadsStream };
