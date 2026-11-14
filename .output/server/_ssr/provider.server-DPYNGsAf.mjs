import { S as watchUrl, v as parseYouTubeId } from "./source-Cs9ZLiNi.mjs";
import { n as fileDownloadPath } from "./disposition-cFkjd5Bs.mjs";
import { i as safeFilename } from "./format-ebeqqiKW.mjs";
import { p as withTimeout$1, t as BROWSER_UA } from "./http.server-g2lDO9wb.mjs";
import { n as Platform, t as Innertube } from "../_libs/youtubei.js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/provider.server-DPYNGsAf.js
var STREAM_PROXIES = ["https://proxy.piped.private.coffee", "https://pipedproxy.kavin.rocks"];
var STREAM_HEADERS = {
	accept: "*/*",
	"accept-language": "en-US,en;q=0.9",
	origin: "https://www.youtube.com",
	referer: "https://www.youtube.com/",
	"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
};
var cachedProxy = null;
var cachedProxyAt = 0;
var proxiesDisabledUntil = 0;
var PROXY_TTL_MS = 48e4;
var PROXY_COOLDOWN_MS = 6e5;
function viaStreamProxy(rawUrl, proxyOrigin) {
	const source = new URL(rawUrl);
	const proxied = new URL(proxyOrigin);
	proxied.pathname = source.pathname || "/videoplayback";
	proxied.search = source.search;
	proxied.searchParams.set("host", source.hostname);
	return proxied.href;
}
function proxyList() {
	const fresh = cachedProxy && Date.now() - cachedProxyAt < PROXY_TTL_MS ? cachedProxy : null;
	if (!fresh) return STREAM_PROXIES;
	return [fresh, ...STREAM_PROXIES.filter((item) => item !== fresh)];
}
function usableBody(res) {
	if (!(res.ok || res.status === 206) || !res.body) return false;
	const type = (res.headers.get("content-type") ?? "").toLowerCase();
	if (type.includes("text/html") || type.includes("text/plain")) return false;
	return true;
}
async function fetchWithHeaderTimeout(url, headers, ms) {
	const ac = new AbortController();
	let settled = false;
	const timer = setTimeout(() => {
		if (!settled) ac.abort();
	}, ms);
	try {
		const res = await fetch(url, {
			headers,
			redirect: "follow",
			signal: ac.signal
		});
		settled = true;
		return res;
	} finally {
		settled = true;
		clearTimeout(timer);
	}
}
async function fetchDirectStream(rawUrl) {
	try {
		const res = await fetchWithHeaderTimeout(rawUrl, STREAM_HEADERS, 5e3);
		if (!usableBody(res)) return null;
		return res;
	} catch {
		return null;
	}
}
async function fetchProxiedStream(rawUrl) {
	if (!rawUrl.startsWith("http")) return null;
	if (Date.now() >= proxiesDisabledUntil) {
		const ordered = proxyList();
		let anyOk = false;
		for (const origin of ordered) {
			const url = viaStreamProxy(rawUrl, origin);
			try {
				const res = await fetchWithHeaderTimeout(url, STREAM_HEADERS, 4e3);
				if (!usableBody(res)) continue;
				cachedProxy = origin;
				cachedProxyAt = Date.now();
				anyOk = true;
				return res;
			} catch {}
		}
		if (!anyOk) {
			cachedProxy = null;
			proxiesDisabledUntil = Date.now() + PROXY_COOLDOWN_MS;
		}
	}
	return fetchDirectStream(rawUrl);
}
var START_URL = "https://loader.to/ajax/download.php";
var CACHE_TTL_MS$1 = 48e4;
var POLL_MS = 1400;
var POLL_BUDGET_MS = 4e4;
var cache$1 = /* @__PURE__ */ new Map();
var HEADERS = {
	accept: "application/json,text/plain,*/*",
	"accept-language": "ru,en;q=0.8",
	"user-agent": BROWSER_UA,
	referer: "https://loader.to/"
};
function remoteFallbackPresets() {
	return [
		{
			id: "remote-720",
			itag: 22,
			label: "720p со звуком",
			kind: "muxed",
			ext: "mp4",
			mime: "video/mp4",
			hasAudio: true,
			hasVideo: true,
			qualityLabel: "720p",
			sizeBytes: null,
			note: "готовый файл, видео и звук"
		},
		{
			id: "remote-360",
			itag: 18,
			label: "360p со звуком",
			kind: "muxed",
			ext: "mp4",
			mime: "video/mp4",
			hasAudio: true,
			hasVideo: true,
			qualityLabel: "360p",
			sizeBytes: null,
			note: "готовый файл, видео и звук"
		},
		{
			id: "remote-mp3",
			itag: 140,
			label: "Только звук",
			kind: "audio",
			ext: "mp3",
			mime: "audio/mpeg",
			hasAudio: true,
			hasVideo: false,
			qualityLabel: "mp3",
			sizeBytes: null,
			note: "MP3"
		}
	];
}
function remoteKindForPreset(presetId, qualityLabel, kind) {
	const blob = `${presetId} ${qualityLabel ?? ""} ${kind ?? ""}`.toLowerCase();
	if (blob.includes("mp3") || blob.includes("audio") || kind === "audio") return "mp3";
	const q = Number.parseInt(qualityLabel ?? "", 10);
	if (Number.isFinite(q) && q >= 720 || /720|1080|2160|4k/.test(blob)) return "720";
	return "360";
}
function isRemoteUrl(url) {
	return url.startsWith("remote:");
}
function kindFromRemoteUrl(url) {
	const raw = url.slice(7);
	if (raw === "720" || raw === "mp3") return raw;
	return "360";
}
function cacheKey(videoId, kind) {
	return `${videoId}:${kind}`;
}
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
function asRecord(value) {
	return value && typeof value === "object" && !Array.isArray(value) ? value : null;
}
function asHttpUrl(value) {
	return typeof value === "string" && value.startsWith("http") ? value : null;
}
async function readJson(url, timeoutMs) {
	try {
		const res = await withTimeout$1(fetch(url, {
			headers: HEADERS,
			redirect: "follow"
		}), timeoutMs, "remote timeout");
		if (!res.ok) return null;
		return asRecord(await res.json());
	} catch {
		return null;
	}
}
async function resolveRemoteUrl(videoId, kind) {
	const key = cacheKey(videoId, kind);
	const hit = cache$1.get(key);
	if (hit && hit.expires > Date.now()) return hit.url;
	const start = new URL(START_URL);
	start.searchParams.set("format", kind);
	start.searchParams.set("url", watchUrl(videoId));
	const started = await readJson(start.href, 12e3);
	if (!started) return null;
	const ready = asHttpUrl(started.download_url) ?? asHttpUrl(started.url);
	if (ready) {
		cache$1.set(key, {
			expires: Date.now() + CACHE_TTL_MS$1,
			url: ready
		});
		return ready;
	}
	const progressUrl = asHttpUrl(started.progress_url);
	if (!progressUrl) return null;
	const deadline = Date.now() + POLL_BUDGET_MS;
	while (Date.now() < deadline) {
		await sleep(POLL_MS);
		const progress = await readJson(progressUrl, 12e3);
		if (!progress) continue;
		const text = String(progress.text ?? progress.message ?? "");
		if (/error|fail|invalid|not found/i.test(text) && !asHttpUrl(progress.download_url)) return null;
		const url = asHttpUrl(progress.download_url);
		if (url) {
			cache$1.set(key, {
				expires: Date.now() + CACHE_TTL_MS$1,
				url
			});
			return url;
		}
	}
	return null;
}
async function openRemoteYouTube(videoId, kind) {
	const fileUrl = await resolveRemoteUrl(videoId, kind);
	if (!fileUrl) return null;
	try {
		const res = await withTimeout$1(fetch(fileUrl, {
			headers: {
				accept: "*/*",
				"user-agent": BROWSER_UA,
				referer: "https://loader.to/"
			},
			redirect: "follow"
		}), 25e3, "remote file timeout");
		if (!res.ok || !res.body) return null;
		const type = (res.headers.get("content-type") ?? "").toLowerCase();
		if (type.includes("text/html") || type.includes("text/plain")) return null;
		return res;
	} catch {
		return null;
	}
}
var cache = /* @__PURE__ */ new Map();
var CACHE_TTL_MS = 12e5;
var CLIENTS = [
	"DEFAULT",
	"VISIONOS",
	"WEB",
	"ANDROID",
	"MWEB",
	"TV_SIMPLY",
	"ANDROID_VR",
	"IOS"
];
var FAST_CLIENTS = ["DEFAULT", "VISIONOS"];
var evalInstalled = false;
var clientPromise = null;
function asNumber(value) {
	if (typeof value === "number" && Number.isFinite(value)) return value;
	if (typeof value === "bigint") {
		const n = Number(value);
		return Number.isFinite(n) ? n : null;
	}
	if (typeof value === "string" && value.trim()) {
		const n = Number(value);
		return Number.isFinite(n) ? n : null;
	}
	return null;
}
async function withTimeout(promise, ms, message) {
	let timer;
	try {
		return await Promise.race([promise, new Promise((_, reject) => {
			timer = setTimeout(() => reject(new Error(message)), ms);
		})]);
	} finally {
		if (timer) clearTimeout(timer);
	}
}
function installEval() {
	if (evalInstalled) return;
	evalInstalled = true;
	Platform.shim.eval = async (data) => {
		return new Function(data.output)() ?? {};
	};
}
async function getClient(fresh = false) {
	installEval();
	if (fresh) clientPromise = null;
	if (!clientPromise) clientPromise = withTimeout(Innertube.create({ enable_safety_mode: false }), 18e3, "Innertube timeout").catch((err) => {
		clientPromise = null;
		throw err;
	});
	return clientPromise;
}
getClient().catch(() => {});
function pickThumbnail(id, thumbs) {
	if (thumbs && thumbs.length > 0) {
		const url = [...thumbs].sort((a, b) => b.width - a.width)[0]?.url;
		if (url) return url;
	}
	return `https://i.ytimg.com/vi/${id}/hq720.jpg`;
}
function mimeExt(mime, kind) {
	if (kind === "audio") {
		if (mime.includes("webm") || mime.includes("opus")) return "webm";
		return "m4a";
	}
	if (mime.includes("webm")) return "webm";
	return "mp4";
}
function qualityRank(label) {
	if (!label) return 0;
	const n = Number.parseInt(label, 10);
	return Number.isFinite(n) ? n : 0;
}
async function resolveUrl(format, player) {
	try {
		const url = await format.decipher(player);
		if (url && url.startsWith("http")) return url;
	} catch {}
	return format.url && format.url.startsWith("http") ? format.url : null;
}
function looksLikeBotWall(status, reason) {
	const blob = `${status ?? ""} ${reason ?? ""}`.toLowerCase();
	return /bot|sign in to confirm|login_required|protect our community/.test(blob);
}
function restrictionMessage(status, reason) {
	if (!status || status === "OK") return null;
	const blob = `${status} ${reason ?? ""}`.toLowerCase();
	if (looksLikeBotWall(status, reason) || status === "LOGIN_REQUIRED") {
		if (/inappropriate|age|возраст|18\+|взрослы/.test(blob)) return "Ролик с ограничением по возрасту. Нажмите «Найти ещё раз» — иногда YouTube всё же отдаёт файл.";
		return "YouTube временно скрыл файлы (проверка). Нажмите «Найти ещё раз».";
	}
	if (status === "UNPLAYABLE") return "Ролик недоступен для скачивания.";
	return "YouTube не отдаёт этот ролик.";
}
function selectFormats(all) {
	const selected = [];
	const used = /* @__PURE__ */ new Set();
	const take = (format) => {
		if (!format || used.has(format.itag)) return;
		used.add(format.itag);
		selected.push(format);
	};
	const muxed = all.filter((f) => f.has_audio && f.has_video).sort((a, b) => (b.bitrate ?? 0) - (a.bitrate ?? 0));
	for (const format of muxed.slice(0, 3)) take(format);
	const videos = all.filter((f) => f.has_video && !f.has_audio);
	const byQuality = /* @__PURE__ */ new Map();
	for (const format of videos) {
		const q = format.quality_label ?? `${format.height ?? 0}p`;
		const list = byQuality.get(q) ?? [];
		list.push(format);
		byQuality.set(q, list);
	}
	const qualities = [...byQuality.keys()].sort((a, b) => qualityRank(b) - qualityRank(a));
	for (const q of qualities) {
		const group = byQuality.get(q) ?? [];
		take(group.find((f) => f.mime_type.includes("avc1") || f.mime_type.includes("mp4")) ?? group[0]);
	}
	const audios = all.filter((f) => f.has_audio && !f.has_video && !f.has_text).sort((a, b) => (b.bitrate ?? 0) - (a.bitrate ?? 0));
	take(audios.find((f) => f.mime_type.includes("mp4")) ?? audios[0]);
	return selected;
}
function buildPresets(formats) {
	const presets = [];
	const used = /* @__PURE__ */ new Set();
	const muxed = formats.filter((f) => f.has_audio && f.has_video).sort((a, b) => (b.bitrate ?? 0) - (a.bitrate ?? 0));
	for (const f of muxed) {
		const q = f.quality_label ?? "360p";
		const id = `muxed-${f.itag}`;
		if (used.has(id)) continue;
		used.add(id);
		presets.push({
			id,
			itag: f.itag,
			label: `${q} со звуком`,
			kind: "muxed",
			ext: mimeExt(f.mime_type, "muxed"),
			mime: f.mime_type,
			hasAudio: true,
			hasVideo: true,
			qualityLabel: f.quality_label ?? q,
			sizeBytes: asNumber(f.content_length),
			note: "готовый файл, видео и звук"
		});
	}
	const videos = formats.filter((f) => f.has_video && !f.has_audio);
	const byQuality = /* @__PURE__ */ new Map();
	for (const f of videos) {
		const q = f.quality_label ?? `${f.height ?? 0}p`;
		const list = byQuality.get(q) ?? [];
		list.push(f);
		byQuality.set(q, list);
	}
	const qualities = [...byQuality.keys()].sort((a, b) => qualityRank(b) - qualityRank(a));
	for (const q of qualities) {
		const group = byQuality.get(q) ?? [];
		const preferred = group.find((f) => f.mime_type.includes("avc1") || f.mime_type.includes("mp4")) ?? group[0];
		if (!preferred) continue;
		const id = `video-${preferred.itag}`;
		if (used.has(id)) continue;
		used.add(id);
		presets.push({
			id,
			itag: preferred.itag,
			label: `${q} видео`,
			kind: "video",
			ext: mimeExt(preferred.mime_type, "video"),
			mime: preferred.mime_type,
			hasAudio: false,
			hasVideo: true,
			qualityLabel: q,
			sizeBytes: asNumber(preferred.content_length),
			note: "только картинка, без звука"
		});
	}
	const audios = formats.filter((f) => f.has_audio && !f.has_video && !f.has_text).sort((a, b) => (b.bitrate ?? 0) - (a.bitrate ?? 0));
	const audio = audios.find((f) => f.mime_type.includes("mp4")) ?? audios[0];
	if (audio) {
		const id = `audio-${audio.itag}`;
		if (!used.has(id)) {
			used.add(id);
			presets.push({
				id,
				itag: audio.itag,
				label: "Только звук",
				kind: "audio",
				ext: mimeExt(audio.mime_type, "audio"),
				mime: audio.mime_type,
				hasAudio: true,
				hasVideo: false,
				qualityLabel: audio.audio_quality ?? "medium",
				sizeBytes: asNumber(audio.content_length),
				note: audio.mime_type.includes("mp4") ? "AAC / M4A" : "Opus / WebM"
			});
		}
	}
	return presets;
}
async function oembedFallback(id) {
	try {
		const res = await withTimeout(fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl(id))}&format=json`), 5e3, "oembed timeout");
		if (!res.ok) return null;
		const data = await res.json();
		return {
			title: data.title ?? "Ролик YouTube",
			author: data.author_name ?? "",
			authorUrl: data.author_url ?? null,
			thumbnail: data.thumbnail_url ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
		};
	} catch {
		return null;
	}
}
function emptyProbe() {
	return {
		bestFormats: [],
		title: "",
		author: "",
		authorUrl: null,
		durationSec: null,
		views: null,
		isLive: false,
		thumbs: void 0,
		restriction: null
	};
}
async function probeOne(yt, id, client) {
	try {
		const info = await withTimeout(client === "DEFAULT" ? yt.getBasicInfo(id) : yt.getBasicInfo(id, { client }), 8e3, `${client} timeout`);
		const all = [...info.streaming_data?.formats ?? [], ...info.streaming_data?.adaptive_formats ?? []];
		const picked = selectFormats(all);
		const toResolve = picked.length > 0 ? picked : all.slice(0, 8);
		const resolved = [];
		for (const format of toResolve) {
			const url = await resolveUrl(format, yt.session.player);
			if (!url) continue;
			format.url = url;
			resolved.push(format);
		}
		return {
			info,
			resolved
		};
	} catch {
		return null;
	}
}
async function probeClients(yt, id, clients, state) {
	for (const client of clients) {
		if (state.bestFormats.some((format) => format.has_audio && format.has_video)) return;
		const probed = await probeOne(yt, id, client);
		if (!probed) continue;
		const { info, resolved } = probed;
		const status = info.playability_status?.status;
		const reason = info.playability_status?.reason;
		if (status === "OK") state.restriction = null;
		else if (!state.restriction) state.restriction = restrictionMessage(status, reason);
		const basic = info.basic_info;
		state.title = basic.title || state.title;
		state.author = basic.author || basic.channel?.name || state.author;
		state.authorUrl = basic.channel?.url ?? state.authorUrl;
		state.durationSec = asNumber(basic.duration) ?? state.durationSec;
		state.views = asNumber(basic.view_count) ?? state.views;
		state.isLive = Boolean(basic.is_live || basic.is_live_content);
		state.thumbs = basic.thumbnail ?? state.thumbs;
		if (resolved.length > state.bestFormats.length) state.bestFormats = resolved;
	}
}
async function loadCachedFormat(videoId, presetId) {
	let entry = cache.get(videoId);
	if (!entry || entry.expires < Date.now() || !entry.formats.has(presetId)) {
		if (!(await inspect(watchUrl(videoId))).ok) return null;
		entry = cache.get(videoId);
	}
	const format = entry?.formats.get(presetId);
	if (!entry || !format) return null;
	return {
		title: entry.title,
		format
	};
}
function cachePresets(formats, presets, resolved) {
	for (const preset of presets) {
		const match = resolved.find((f) => f.itag === preset.itag && f.url);
		if (match?.url) {
			formats.set(preset.id, {
				url: match.url,
				mime: preset.mime,
				ext: preset.ext,
				itag: preset.itag
			});
			continue;
		}
		const kind = remoteKindForPreset(preset.id, preset.qualityLabel, preset.kind);
		formats.set(preset.id, {
			url: `remote:${kind}`,
			mime: preset.mime,
			ext: preset.ext,
			itag: preset.itag
		});
	}
}
async function inspect(rawUrl) {
	const id = parseYouTubeId(rawUrl);
	if (!id) return {
		ok: false,
		error: "Не похоже на ссылку YouTube. Вставьте watch, Shorts или youtu.be."
	};
	try {
		const state = emptyProbe();
		let yt = await getClient();
		await probeClients(yt, id, FAST_CLIENTS, state);
		if (!state.bestFormats.some((format) => format.has_audio && format.has_video) && !state.title) {
			const extra = CLIENTS.filter((client) => !FAST_CLIENTS.includes(client));
			await probeClients(yt, id, extra, state);
		}
		if (state.bestFormats.length === 0 && !state.title) {
			yt = await getClient(true);
			await probeClients(yt, id, FAST_CLIENTS, state);
		}
		if (!state.title) {
			const oem = await oembedFallback(id);
			if (oem) {
				state.title = oem.title;
				state.author = oem.author;
				state.authorUrl = oem.authorUrl;
				state.thumbs = [{
					url: oem.thumbnail,
					width: 480
				}];
			}
		}
		if (!state.title) return {
			ok: false,
			error: "Ролик не найден или скрыт."
		};
		if (state.isLive) state.restriction = state.restriction ?? "Прямой эфир скачать нельзя — дождитесь записи.";
		const thumbnail = pickThumbnail(id, state.thumbs);
		const innertubePresets = state.isLive ? [] : buildPresets(state.bestFormats);
		const basePresets = innertubePresets.some((preset) => preset.kind === "muxed") ? innertubePresets : state.isLive ? [] : remoteFallbackPresets();
		const presets = [...basePresets];
		if (presets.length > 0 && thumbnail) presets.push({
			id: "cover",
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
		const downloadable = presets.length > 0;
		const formats = /* @__PURE__ */ new Map();
		cachePresets(formats, basePresets, state.bestFormats);
		if (presets.some((p) => p.id === "cover") && thumbnail) formats.set("cover", {
			url: thumbnail,
			mime: "image/jpeg",
			ext: "jpg",
			itag: 999
		});
		cache.set(id, {
			expires: Date.now() + CACHE_TTL_MS,
			title: state.title,
			formats
		});
		return {
			ok: true,
			video: {
				id,
				source: "youtube",
				url: watchUrl(id),
				title: state.title,
				author: state.author,
				authorUrl: state.authorUrl,
				thumbnail,
				durationSec: state.durationSec,
				views: state.views,
				isLive: state.isLive,
				downloadable,
				restriction: downloadable ? null : state.restriction ?? (state.isLive ? "Прямой эфир скачать нельзя — дождитесь записи." : "Не удалось получить файлы этого ролика. Нажмите «Найти ещё раз»."),
				presets
			}
		};
	} catch (err) {
		const message = err instanceof Error ? err.message : "Неизвестная ошибка";
		if (/unavailable|not found|private/i.test(message)) return {
			ok: false,
			error: "Ролик недоступен, удалён или скрыт."
		};
		return {
			ok: false,
			error: "YouTube не ответил. Проверьте ссылку и попробуйте ещё раз."
		};
	}
}
async function getDownloadLink(videoId, presetId) {
	if (!parseYouTubeId(videoId)) return {
		ok: false,
		error: "Некорректный идентификатор ролика."
	};
	const loaded = await loadCachedFormat(videoId, presetId);
	if (!loaded) return {
		ok: false,
		error: "Этот вариант больше недоступен. Обновите карточку ролика."
	};
	const suffix = presetId === "cover" ? "-cover" : "";
	const filename = `${safeFilename(loaded.title)}${suffix}.${loaded.format.ext}`;
	return {
		ok: true,
		url: fileDownloadPath("youtube", videoId, presetId),
		filename,
		mime: loaded.format.mime
	};
}
async function openCachedStream(videoId, format, kind) {
	if (format.url.startsWith("http")) {
		const proxied = await fetchProxiedStream(format.url);
		if (proxied) return proxied;
	}
	return openRemoteYouTube(videoId, kind);
}
async function openYouTubeStream(videoId, presetId) {
	if (!parseYouTubeId(videoId)) return {
		ok: false,
		error: "Некорректный идентификатор ролика."
	};
	const loaded = await loadCachedFormat(videoId, presetId);
	if (!loaded) return {
		ok: false,
		error: "Этот вариант больше недоступен. Обновите карточку ролика."
	};
	if (presetId === "cover" && loaded.format.url.startsWith("http")) {
		try {
			const res = await fetch(loaded.format.url, { redirect: "follow" });
			if (res.ok && res.body) return {
				ok: true,
				response: res,
				filename: `${safeFilename(loaded.title)}-cover.${loaded.format.ext}`,
				mime: loaded.format.mime
			};
		} catch {}
		return {
			ok: false,
			error: "Не удалось получить обложку ролика."
		};
	}
	const kind = isRemoteUrl(loaded.format.url) ? kindFromRemoteUrl(loaded.format.url) : remoteKindForPreset(presetId, null, loaded.format.ext === "mp3" || loaded.format.ext === "m4a" ? "audio" : "muxed");
	const response = await openCachedStream(videoId, loaded.format, kind);
	if (!response) return {
		ok: false,
		error: "Не удалось получить файл. Попробуйте ещё раз."
	};
	const ext = kind === "mp3" && !loaded.format.url.startsWith("http") ? "mp3" : loaded.format.ext;
	const mime = kind === "mp3" && !loaded.format.url.startsWith("http") ? "audio/mpeg" : loaded.format.mime;
	return {
		ok: true,
		response,
		filename: `${safeFilename(loaded.title)}.${ext}`,
		mime
	};
}
//#endregion
export { getDownloadLink, inspect, openYouTubeStream };
