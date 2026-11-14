import { b as splitVimeoCompositeId, g as parseVimeo, o as canonicalVimeoUrl } from "./source-Cs9ZLiNi.mjs";
import { n as fileDownloadPath } from "./disposition-cFkjd5Bs.mjs";
import { i as safeFilename } from "./format-ebeqqiKW.mjs";
import { a as asString, c as fetchText, i as asRecord, r as asNumber, t as BROWSER_UA } from "./http.server-g2lDO9wb.mjs";
import { n as createFormatCache, r as openDirectUrl } from "./direct.server-n_2q6Lw0.mjs";
import { n as parseMasterPlaylist, t as concatHlsResponse } from "./hls.server-C9CgwGYw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/provider.server-Bl09rYOq.js
var cache = createFormatCache(9e5);
var JSON_HEADERS = {
	"user-agent": BROWSER_UA,
	accept: "application/json,text/plain,*/*",
	referer: "https://vimeo.com/"
};
var STREAM_HEADERS = {
	"user-agent": BROWSER_UA,
	accept: "*/*",
	referer: "https://vimeo.com/",
	origin: "https://vimeo.com"
};
function parseHlsAudioTracks(masterText, baseUrl) {
	const lines = masterText.split(/\r?\n/);
	const tracks = [];
	const seen = /* @__PURE__ */ new Set();
	for (const raw of lines) {
		const line = raw.trim();
		if (!line.startsWith("#EXT-X-MEDIA:") || !line.includes("TYPE=AUDIO")) continue;
		const uriMatch = line.match(/URI="([^"]+)"/);
		if (!uriMatch?.[1]) continue;
		const groupMatch = line.match(/GROUP-ID="([^"]+)"/);
		const nameMatch = line.match(/NAME="([^"]+)"/);
		const groupId = groupMatch?.[1] ?? "audio";
		let url = uriMatch[1];
		try {
			url = new URL(uriMatch[1], baseUrl).href;
		} catch {}
		if (seen.has(url)) continue;
		seen.add(url);
		tracks.push({
			groupId,
			name: nameMatch?.[1] ?? groupId,
			url
		});
	}
	return tracks;
}
async function fetchJson(url, extraHeaders) {
	try {
		const { res, text } = await fetchText(url, {
			...JSON_HEADERS,
			...extraHeaders ?? {}
		}, 12e3);
		if (!res.ok) return null;
		const trimmed = text.trim();
		if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return null;
		const parsed = JSON.parse(trimmed);
		if (Array.isArray(parsed)) return asRecord(parsed[0]);
		return asRecord(parsed);
	} catch {
		return null;
	}
}
async function fetchPlayerConfig(videoId, hash) {
	const qs = hash ? `?h=${encodeURIComponent(hash)}` : "";
	const direct = await fetchJson(`https://player.vimeo.com/video/${videoId}/config${qs}`);
	if (direct && (asRecord(direct.video) || asRecord(direct.request))) return direct;
	try {
		const { res, text } = await fetchText(`https://player.vimeo.com/video/${videoId}${qs}`, {
			"user-agent": BROWSER_UA,
			accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			referer: "https://vimeo.com/"
		}, 1e4);
		if (res.ok) {
			const match = text.match(/window\.playerConfig\s*=\s*(\{[\s\S]+?\});?\s*<\/script>/) ?? text.match(/var\s+config\s*=\s*(\{[\s\S]+?\});/);
			if (match?.[1]) {
				const parsed = asRecord(JSON.parse(match[1]));
				if (parsed) return parsed;
			}
		}
	} catch {}
	if (!hash) try {
		const { res, text } = await fetchText(`https://vimeo.com/${videoId}`, {
			"user-agent": BROWSER_UA,
			accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
		}, 1e4);
		if (res.ok) {
			const hMatch = text.match(new RegExp(`player\\.vimeo\\.com\\/video\\/${videoId}\\?[^"'\\s]*?\\bh=([A-Za-z0-9]+)`));
			if (hMatch?.[1]) {
				const withDiscoveredHash = await fetchJson(`https://player.vimeo.com/video/${videoId}/config?h=${encodeURIComponent(hMatch[1])}`);
				if (withDiscoveredHash) return withDiscoveredHash;
			}
		}
	} catch {}
	return null;
}
function pickThumbnail(videoRec, oembedRec) {
	const directThumb = asString(videoRec?.thumbnail_url);
	if (directThumb) return directThumb;
	const thumbs = asRecord(videoRec?.thumbs);
	if (thumbs) for (const key of [
		"1280",
		"960",
		"640",
		"base"
	]) {
		const candidate = asString(thumbs[key]);
		if (candidate) return candidate;
	}
	return asString(oembedRec?.thumbnail_url) ?? "";
}
async function inspect(rawUrl) {
	const ref = parseVimeo(rawUrl);
	if (!ref) return {
		ok: false,
		error: "Не похоже на ссылку Vimeo. Подойдёт ссылка на ролик или player.vimeo.com."
	};
	try {
		const [config, oembed] = await Promise.all([fetchPlayerConfig(ref.videoId, ref.hash), fetchJson(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(ref.url)}`)]);
		const videoRec = asRecord(config?.video);
		if (!videoRec && !oembed) return {
			ok: false,
			error: "Ролик скрыт, защищён паролем или Vimeo не отдаёт его."
		};
		const ownerRec = asRecord(videoRec?.owner);
		const title = (asString(videoRec?.title) ?? asString(oembed?.title) ?? "Ролик Vimeo").slice(0, 140);
		const author = asString(ownerRec?.name) ?? asString(oembed?.author_name) ?? "";
		const authorUrl = asString(ownerRec?.url) ?? asString(oembed?.author_url) ?? null;
		const durationSec = asNumber(videoRec?.duration) ?? asNumber(oembed?.duration) ?? null;
		const thumbnail = pickThumbnail(videoRec, oembed);
		const liveEvent = asRecord(videoRec?.live_event);
		const isLive = Boolean(liveEvent && liveEvent.status === "streaming");
		const files = asRecord(asRecord(config?.request)?.files);
		const formats = /* @__PURE__ */ new Map();
		const presets = [];
		const progressiveRaw = files?.progressive;
		if (Array.isArray(progressiveRaw) && progressiveRaw.length > 0) {
			const sorted = [...progressiveRaw].map((item) => asRecord(item)).filter((item) => Boolean(item && asString(item.url))).sort((a, b) => (asNumber(b.height) ?? 0) - (asNumber(a.height) ?? 0));
			const seenHeights = /* @__PURE__ */ new Set();
			sorted.forEach((prog, idx) => {
				const url = asString(prog.url);
				const height = asNumber(prog.height);
				const fps = asNumber(prog.fps);
				const quality = asString(prog.quality) ?? (height ? `${height}p` : `MP4 #${idx + 1}`);
				if (seenHeights.has(quality)) return;
				seenHeights.add(quality);
				const presetId = `vm-prog-${idx + 1}`;
				presets.push({
					id: presetId,
					itag: idx + 1,
					label: `${quality} со звуком`,
					kind: "muxed",
					ext: "mp4",
					mime: "video/mp4",
					hasAudio: true,
					hasVideo: true,
					qualityLabel: quality,
					sizeBytes: null,
					note: fps && fps > 30 ? `MP4 · ${fps} fps, прямой файл` : "MP4 · прямой файл без перекодирования"
				});
				formats.set(presetId, {
					url,
					mime: "video/mp4",
					ext: "mp4",
					headers: STREAM_HEADERS
				});
			});
		}
		const hlsRec = asRecord(files?.hls);
		const cdns = asRecord(hlsRec?.cdns);
		const defaultCdnKey = asString(hlsRec?.default_cdn);
		const chosenCdn = (defaultCdnKey ? asRecord(cdns?.[defaultCdnKey]) : null) ?? (cdns ? asRecord(Object.values(cdns)[0]) : null);
		const masterHlsUrl = asString(chosenCdn?.avc_url) ?? asString(chosenCdn?.url) ?? null;
		const separateAv = hlsRec?.separate_av === true;
		if (masterHlsUrl) try {
			const { res, text: masterText } = await fetchText(masterHlsUrl, STREAM_HEADERS, 12e3);
			if (res.ok && masterText.includes("#EXTM3U")) {
				const variants = parseMasterPlaylist(masterText, masterHlsUrl);
				if (presets.length === 0) variants.slice(0, 5).forEach((variant, index) => {
					const n = index + 1;
					const height = variant.height || 0;
					const quality = height >= 100 ? `${height}p` : "HD";
					const presetId = `vm-hls-v${n}`;
					const isMuxed = !separateAv;
					presets.push({
						id: presetId,
						itag: 100 + n,
						label: isMuxed ? `${quality} со звуком` : `${quality}`,
						kind: isMuxed ? "muxed" : "video",
						ext: "mp4",
						mime: "video/mp4",
						hasAudio: isMuxed,
						hasVideo: true,
						qualityLabel: quality,
						sizeBytes: variant.bandwidth && durationSec ? Math.round(variant.bandwidth / 8 * durationSec) : null,
						note: isMuxed ? "HLS · MP4 со звуком" : "HLS · видеопоток без перекодирования"
					});
					formats.set(presetId, {
						url: variant.url,
						mime: "video/mp4",
						ext: "mp4",
						headers: STREAM_HEADERS
					});
				});
				const audioTracks = parseHlsAudioTracks(masterText, masterHlsUrl);
				audioTracks.slice(0, 2).forEach((track, index) => {
					const n = index + 1;
					const presetId = `vm-hls-a${n}`;
					const isHigh = track.groupId.includes("high") || index === audioTracks.length - 1;
					const label = audioTracks.length > 1 ? isHigh ? "Аудио · высокое качество" : "Аудио · стандартное" : "Аудиодорожка";
					presets.push({
						id: presetId,
						itag: 200 + n,
						label,
						kind: "audio",
						ext: "m4a",
						mime: "audio/mp4",
						hasAudio: true,
						hasVideo: false,
						qualityLabel: isHigh ? "AAC High" : "AAC",
						sizeBytes: null,
						note: "оригинальная звуковая дорожка"
					});
					formats.set(presetId, {
						url: track.url,
						mime: "audio/mp4",
						ext: "m4a",
						headers: STREAM_HEADERS
					});
				});
			}
		} catch {}
		if (thumbnail) {
			const hiResThumb = thumbnail.replace(/_\d+x\d+/, "_1280");
			const presetId = "vm-thumb";
			presets.push({
				id: presetId,
				itag: 300,
				label: "обложка",
				kind: "image",
				ext: "jpg",
				mime: "image/jpeg",
				hasAudio: false,
				hasVideo: false,
				qualityLabel: "HD",
				sizeBytes: null,
				note: "кадр-обложка ролика"
			});
			formats.set(presetId, {
				url: hiResThumb,
				mime: "image/jpeg",
				ext: "jpg",
				headers: STREAM_HEADERS
			});
		}
		cache.set(ref.id, title, formats);
		return {
			ok: true,
			video: {
				id: ref.id,
				source: "vimeo",
				url: ref.url,
				title,
				author,
				authorUrl,
				thumbnail,
				durationSec,
				views: null,
				isLive,
				downloadable: !isLive && presets.length > 0,
				restriction: isLive ? "Прямой эфир Vimeo не скачивается." : presets.length > 0 ? null : "Vimeo ограничил прямой доступ к потокам этого ролика.",
				presets
			}
		};
	} catch {
		return {
			ok: false,
			error: "Vimeo не ответил. Проверьте ссылку и попробуйте ещё раз."
		};
	}
}
async function loadCachedFormat(id, presetId) {
	let entry = cache.get(id);
	if (!entry || !entry.formats.has(presetId)) {
		const split = splitVimeoCompositeId(id);
		if (!(await inspect(split ? canonicalVimeoUrl(split.videoId, split.hash) : canonicalVimeoUrl(id))).ok) return null;
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
	return {
		ok: true,
		url: fileDownloadPath("vimeo", id, presetId),
		filename: `${safeFilename(loaded.title)}.${loaded.format.ext}`,
		mime: loaded.format.mime
	};
}
async function openVimeoStream(id, presetId) {
	const loaded = await loadCachedFormat(id, presetId);
	if (!loaded) return {
		ok: false,
		error: "Этот вариант больше недоступен. Обновите карточку ролика."
	};
	if (presetId.startsWith("vm-hls-") || loaded.format.url.includes(".m3u8")) try {
		return {
			ok: true,
			response: await concatHlsResponse(loaded.format.url, loaded.format.headers ?? STREAM_HEADERS),
			filename: `${safeFilename(loaded.title)}.${loaded.format.ext}`,
			mime: loaded.format.mime
		};
	} catch {
		return {
			ok: false,
			error: "Не удалось получить поток Vimeo. Попробуйте ещё раз."
		};
	}
	return openDirectUrl(loaded.format, loaded.title);
}
//#endregion
export { getDownloadLink, inspect, openVimeoStream };
