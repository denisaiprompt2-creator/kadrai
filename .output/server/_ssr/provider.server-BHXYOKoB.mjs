import { h as parseTikTok, i as canonicalTikTokUrl } from "./source-Cs9ZLiNi.mjs";
import { n as fileDownloadPath } from "./disposition-cFkjd5Bs.mjs";
import { i as safeFilename } from "./format-ebeqqiKW.mjs";
import { a as asString, f as walkRecords, i as asRecord, l as inlineThumbnail, o as cookieHeader, r as asNumber, t as BROWSER_UA } from "./http.server-g2lDO9wb.mjs";
import { i as qualityFromSize, n as createFormatCache, r as openDirectUrl, t as buildDirectPresets } from "./direct.server-n_2q6Lw0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/provider.server-BHXYOKoB.js
var cache = createFormatCache(9e5);
var PAGE_HEADERS = {
	"user-agent": BROWSER_UA,
	accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
	"accept-language": "en-US,en;q=0.9"
};
function streamHeaders(cookie) {
	return {
		"user-agent": BROWSER_UA,
		accept: "*/*",
		referer: "https://www.tiktok.com/",
		origin: "https://www.tiktok.com",
		...cookie ? { cookie } : {}
	};
}
function firstUrl(list) {
	if (typeof list === "string") return list;
	if (Array.isArray(list)) {
		for (const item of list) if (typeof item === "string" && item.startsWith("http")) return item;
	}
	const rec = asRecord(list);
	return firstUrl(rec?.url_list ?? rec?.UrlList);
}
function playAddr(node) {
	const rec = asRecord(node);
	if (!rec) return null;
	const url = firstUrl(rec.UrlList) ?? firstUrl(rec.url_list) ?? asString(rec.Url) ?? asString(rec.url);
	if (!url) return null;
	return {
		url,
		width: asNumber(rec.Width) ?? asNumber(rec.width),
		height: asNumber(rec.Height) ?? asNumber(rec.height)
	};
}
function itemsFromStruct(struct, headers) {
	const items = [];
	const video = asRecord(struct.video);
	const seen = /* @__PURE__ */ new Set();
	const seenHeight = /* @__PURE__ */ new Set();
	const pushVideo = (url, width, height, note) => {
		if (!url || seen.has(url)) return;
		const h = height ?? 0;
		if (h && seenHeight.has(h)) return;
		seen.add(url);
		if (h) seenHeight.add(h);
		items.push({
			videoUrl: url,
			width,
			height,
			quality: qualityFromSize(width, height),
			note,
			headers
		});
	};
	const bitrates = video?.bitrateInfo ?? video?.bit_rate;
	if (Array.isArray(bitrates)) {
		const ranked = [...bitrates].sort((a, b) => {
			const ar = asRecord(a);
			const br = asRecord(b);
			const ah = asNumber(asRecord(ar?.PlayAddr ?? ar?.play_addr)?.Height) ?? asNumber(ar?.Height) ?? 0;
			return (asNumber(asRecord(br?.PlayAddr ?? br?.play_addr)?.Height) ?? asNumber(br?.Height) ?? 0) - ah;
		});
		for (const entry of ranked) {
			const rec = asRecord(entry);
			if (!rec) continue;
			const codec = (asString(rec.CodecType) ?? asString(rec.codec_type) ?? "").toLowerCase();
			if (codec.includes("h265") || codec.includes("hevc")) continue;
			const addr = playAddr(rec.PlayAddr ?? rec.play_addr ?? rec);
			if (!addr) continue;
			pushVideo(addr.url, addr.width, addr.height, "без водяного знака");
			if (items.length >= 4) break;
		}
	}
	const play = playAddr(video?.PlayAddrStruct) ?? playAddr(video?.playAddr) ?? playAddr(video?.play_addr) ?? (asString(video?.playAddr) ? {
		url: asString(video?.playAddr) ?? "",
		width: asNumber(video?.width),
		height: asNumber(video?.height)
	} : null);
	if (play?.url && items.length === 0) pushVideo(play.url, play.width, play.height, "без водяного знака");
	const imagePost = asRecord(struct.imagePost) ?? asRecord(struct.image_post_info);
	const images = imagePost?.images ?? imagePost?.images_list;
	if (Array.isArray(images) && items.length === 0) for (const image of images) {
		const rec = asRecord(image);
		const url = firstUrl(asRecord(rec?.imageURL)?.urlList) ?? firstUrl(asRecord(rec?.display_image)?.url_list) ?? firstUrl(rec?.url_list) ?? asString(rec?.url);
		if (!url) continue;
		items.push({
			imageUrl: url,
			width: asNumber(rec?.width) ?? asNumber(asRecord(rec?.imageURL)?.width),
			height: asNumber(rec?.height),
			note: "фото из публикации",
			headers
		});
	}
	return items;
}
function normalizeStruct(struct, headers) {
	const id = asString(struct.id) ?? asString(struct.aweme_id);
	if (!id) return null;
	const items = itemsFromStruct(struct, headers);
	if (items.length === 0) return null;
	const author = asRecord(struct.author);
	const screen = asString(author?.uniqueId) ?? asString(author?.unique_id) ?? "";
	const desc = (asString(struct.desc) ?? "").replace(/\s+/g, " ").trim();
	const video = asRecord(struct.video);
	const stats = asRecord(struct.stats) ?? asRecord(struct.statistics);
	const thumb = firstUrl(video?.cover) ?? asString(video?.cover) ?? asString(video?.originCover) ?? asString(video?.dynamicCover) ?? items.find((item) => item.imageUrl)?.imageUrl ?? "";
	return {
		id,
		title: (desc || (screen ? `Ролик @${screen}` : "Ролик TikTok")).slice(0, 140),
		author: screen,
		authorUrl: screen ? `https://www.tiktok.com/@${screen}` : null,
		thumbnail: thumb,
		durationSec: asNumber(video?.duration),
		views: asNumber(stats?.playCount) ?? asNumber(stats?.play_count),
		items
	};
}
function extractFromHtml(html, headers) {
	const uni = html.match(/<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>([\s\S]*?)<\/script>/i)?.[1];
	const sigi = html.match(/<script id="SIGI_STATE"[^>]*>([\s\S]*?)<\/script>/i)?.[1];
	const blobs = [];
	for (const raw of [uni, sigi]) {
		if (!raw) continue;
		try {
			blobs.push(JSON.parse(raw));
		} catch {}
	}
	let found = null;
	for (const blob of blobs) {
		const scope = asRecord(asRecord(blob)?.__DEFAULT_SCOPE__);
		const detail = asRecord(scope?.["webapp.video-detail"]);
		const struct = asRecord(asRecord(detail?.itemInfo)?.itemStruct);
		if (struct) {
			const media = normalizeStruct(struct, headers);
			if (media) return media;
		}
		walkRecords(blob, (rec) => {
			if (found) return;
			if (rec.video && (rec.id || rec.aweme_id) && (rec.author || rec.desc)) found = normalizeStruct(rec, headers);
		});
		if (found) return found;
	}
	return found;
}
function toInspect(media) {
	const numbered = media.items.filter((item) => item.imageUrl && !item.videoUrl).length > 1;
	const { presets, formats } = buildDirectPresets("tt", media.items, "без водяного знака", numbered);
	cache.set(media.id, media.title, formats);
	return {
		id: media.id,
		source: "tiktok",
		url: canonicalTikTokUrl(media.id, media.author || void 0),
		title: media.title,
		author: media.author,
		authorUrl: media.authorUrl,
		thumbnail: media.thumbnail,
		durationSec: media.durationSec,
		views: media.views,
		isLive: false,
		downloadable: presets.length > 0,
		restriction: presets.length > 0 ? null : "TikTok не отдал файлы этого ролика.",
		presets
	};
}
async function inspect(rawUrl) {
	const ref = parseTikTok(rawUrl);
	if (!ref) return {
		ok: false,
		error: "Не похоже на ссылку TikTok. Подойдёт ролик, фото или короткая vm/vt-ссылка."
	};
	const pageUrl = ref.url;
	try {
		const res = await fetch(pageUrl, {
			headers: PAGE_HEADERS,
			redirect: "follow"
		});
		const html = await res.text();
		const cookie = cookieHeader(res);
		const headers = streamHeaders(cookie);
		const finalUrl = res.url || pageUrl;
		const resolved = parseTikTok(finalUrl);
		let media = extractFromHtml(html, headers);
		if (!media && /^\d{8,24}$/.test(ref.id)) {
			const fallback = await fetch(`https://m.tiktok.com/v/${ref.id}.html`, {
				headers: PAGE_HEADERS,
				redirect: "follow"
			});
			media = extractFromHtml(await fallback.text(), streamHeaders([cookie, cookieHeader(fallback)].filter(Boolean).join("; ")));
		}
		if (!media) return {
			ok: false,
			error: "Ролик скрыт, удалён или TikTok не отдаёт его без входа."
		};
		if (resolved?.username && !media.author) {
			media.author = resolved.username;
			media.authorUrl = `https://www.tiktok.com/@${resolved.username}`;
		}
		if (media.thumbnail && !media.thumbnail.startsWith("data:")) {
			const inlined = await inlineThumbnail(media.thumbnail, headers);
			media.thumbnail = inlined.startsWith("data:") ? inlined : media.thumbnail;
		}
		return {
			ok: true,
			video: toInspect(media)
		};
	} catch {
		return {
			ok: false,
			error: "TikTok не ответил. Проверьте ссылку и попробуйте ещё раз."
		};
	}
}
async function loadCachedFormat(id, presetId) {
	let entry = cache.get(id);
	if (!entry || !entry.formats.has(presetId)) {
		if (!(await inspect(canonicalTikTokUrl(id))).ok) return null;
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
		url: fileDownloadPath("tiktok", id, presetId),
		filename: `${safeFilename(loaded.title)}.${loaded.format.ext}`,
		mime: loaded.format.mime
	};
}
async function openTikTokStream(id, presetId) {
	let loaded = await loadCachedFormat(id, presetId);
	if (!loaded) return {
		ok: false,
		error: "Этот вариант больше недоступен. Обновите карточку публикации."
	};
	let opened = await openDirectUrl(loaded.format, loaded.title);
	if (!opened.ok) {
		if (!(await inspect(canonicalTikTokUrl(id))).ok) return opened;
		loaded = await loadCachedFormat(id, presetId);
		if (!loaded) return opened;
		opened = await openDirectUrl(loaded.format, loaded.title);
	}
	return opened;
}
//#endregion
export { getDownloadLink, inspect, openTikTokStream };
