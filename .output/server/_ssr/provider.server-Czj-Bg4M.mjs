import { n as canonicalRutubeUrl, p as parseRutube } from "./source-Cs9ZLiNi.mjs";
import { n as fileDownloadPath } from "./disposition-cFkjd5Bs.mjs";
import { i as safeFilename } from "./format-ebeqqiKW.mjs";
import { a as asString, c as fetchText, i as asRecord, r as asNumber, t as BROWSER_UA } from "./http.server-g2lDO9wb.mjs";
import { n as createFormatCache } from "./direct.server-n_2q6Lw0.mjs";
import { n as parseMasterPlaylist, t as concatHlsResponse } from "./hls.server-C9CgwGYw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/provider.server-Czj-Bg4M.js
var cache = createFormatCache(9e5);
var JSON_HEADERS = {
	"user-agent": BROWSER_UA,
	accept: "application/json,text/plain,*/*",
	referer: "https://rutube.ru/"
};
var STREAM_HEADERS = {
	"user-agent": BROWSER_UA,
	accept: "*/*",
	referer: "https://rutube.ru/",
	origin: "https://rutube.ru"
};
async function fetchJson(url) {
	try {
		const { res, text } = await fetchText(url, JSON_HEADERS, 12e3);
		if (!res.ok) return null;
		if (!text.trim().startsWith("{")) return null;
		return asRecord(JSON.parse(text));
	} catch {
		return null;
	}
}
function toInspect(id, title, author, authorUrl, thumbnail, durationSec, views, isLive, presets, formats) {
	cache.set(id, title, formats);
	return {
		id,
		source: "rutube",
		url: canonicalRutubeUrl(id),
		title,
		author,
		authorUrl,
		thumbnail,
		durationSec,
		views,
		isLive,
		downloadable: !isLive && presets.length > 0,
		restriction: isLive ? "Прямой эфир RuTube не скачивается." : presets.length > 0 ? null : "RuTube не отдал файлы этого ролика.",
		presets
	};
}
async function inspect(rawUrl) {
	const ref = parseRutube(rawUrl);
	if (!ref) return {
		ok: false,
		error: "Не похоже на ссылку RuTube. Подойдёт видео, Shorts или embed."
	};
	try {
		const video = await fetchJson(`https://rutube.ru/api/video/${ref.id}/`);
		if (!video || asString(video.detail)) return {
			ok: false,
			error: "Ролик скрыт, удалён или RuTube не отдаёт его."
		};
		const title = (asString(video.title) ?? "Ролик RuTube").slice(0, 140);
		const authorRec = asRecord(video.author);
		const author = asString(authorRec?.name) ?? "";
		const authorUrl = asString(authorRec?.site_url) ?? asString(authorRec?.url) ?? null;
		const thumbnail = asString(video.thumbnail_url) ?? asString(video.thumbnail) ?? "";
		const durationSec = asNumber(video.duration);
		const views = asNumber(video.hits) ?? asNumber(video.play_count);
		if (video.is_livestream === true || video.is_live === true) return {
			ok: true,
			video: toInspect(ref.id, title, author, authorUrl, thumbnail, durationSec, views, true, [], /* @__PURE__ */ new Map())
		};
		const options = await fetchJson(`https://rutube.ru/api/play/options/${ref.id}/?format=json&no_404=true`);
		const balancer = asRecord(options?.video_balancer);
		const m3u8 = asString(balancer?.m3u8) ?? asString(balancer?.default);
		if (!m3u8) return {
			ok: false,
			error: "RuTube не отдал файлы этого ролика."
		};
		const { res, text } = await fetchText(m3u8, STREAM_HEADERS, 12e3);
		if (!res.ok) return {
			ok: false,
			error: "Не удалось получить поток RuTube. Попробуйте ещё раз."
		};
		const variants = parseMasterPlaylist(text, m3u8);
		const formats = /* @__PURE__ */ new Map();
		const presets = [];
		(variants.length > 0 ? variants.slice(0, 4) : [{
			url: m3u8,
			height: 0,
			width: 0,
			bandwidth: 0
		}]).forEach((variant, index) => {
			const n = index + 1;
			const height = variant.height || 0;
			const quality = height >= 100 ? `${height}p` : "HD";
			const presetId = `rt-v${n}`;
			const mime = "video/mp2t";
			presets.push({
				id: presetId,
				itag: n,
				label: `${quality} со звуком`,
				kind: "muxed",
				ext: "ts",
				mime,
				hasAudio: true,
				hasVideo: true,
				qualityLabel: quality,
				sizeBytes: null,
				note: "HLS · MPEG-TS, без перекодирования"
			});
			formats.set(presetId, {
				url: variant.url,
				mime,
				ext: "ts",
				headers: STREAM_HEADERS
			});
		});
		if (thumbnail && thumbnail.startsWith("http")) {
			const coverId = "rt-cover";
			presets.push({
				id: coverId,
				itag: 999,
				label: "Обложка",
				kind: "image",
				ext: "jpg",
				mime: "image/jpeg",
				hasAudio: false,
				hasVideo: false,
				qualityLabel: "HD",
				sizeBytes: null,
				note: "кадр-обложка ролика"
			});
			formats.set(coverId, {
				url: thumbnail,
				mime: "image/jpeg",
				ext: "jpg",
				headers: STREAM_HEADERS
			});
		}
		return {
			ok: true,
			video: toInspect(ref.id, title, author, authorUrl, thumbnail, durationSec, views, false, presets, formats)
		};
	} catch {
		return {
			ok: false,
			error: "RuTube не ответил. Проверьте ссылку и попробуйте ещё раз."
		};
	}
}
async function loadCachedFormat(id, presetId) {
	let entry = cache.get(id);
	if (!entry || !entry.formats.has(presetId)) {
		if (!(await inspect(canonicalRutubeUrl(id))).ok) return null;
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
		error: "Этот вариант больше недоступен. Обновите карточку ролика."
	};
	const suffix = presetId === "rt-cover" ? "-cover" : "";
	return {
		ok: true,
		url: fileDownloadPath("rutube", id, presetId),
		filename: `${safeFilename(loaded.title)}${suffix}.${loaded.format.ext}`,
		mime: loaded.format.mime
	};
}
async function openRutubeStream(id, presetId) {
	const loaded = await loadCachedFormat(id, presetId);
	if (!loaded) return {
		ok: false,
		error: "Этот вариант больше недоступен. Обновите карточку ролика."
	};
	try {
		if (presetId === "rt-cover") {
			const res = await fetch(loaded.format.url, {
				headers: loaded.format.headers ?? STREAM_HEADERS,
				redirect: "follow"
			});
			if (!res.ok || !res.body) return {
				ok: false,
				error: "Не удалось получить обложку ролика."
			};
			return {
				ok: true,
				response: res,
				filename: `${safeFilename(loaded.title)}-cover.${loaded.format.ext}`,
				mime: loaded.format.mime
			};
		}
		return {
			ok: true,
			response: await concatHlsResponse(loaded.format.url, loaded.format.headers ?? STREAM_HEADERS),
			filename: `${safeFilename(loaded.title)}.${loaded.format.ext}`,
			mime: loaded.format.mime
		};
	} catch {
		return {
			ok: false,
			error: "Не удалось получить файл. Попробуйте ещё раз."
		};
	}
}
//#endregion
export { getDownloadLink, inspect, openRutubeStream };
