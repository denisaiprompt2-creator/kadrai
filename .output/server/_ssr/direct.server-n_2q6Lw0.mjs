import { i as safeFilename } from "./format-ebeqqiKW.mjs";
import { d as mimeFromExt, p as withTimeout, s as extFromUrl, u as isHtmlContentType } from "./http.server-g2lDO9wb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/direct.server-n_2q6Lw0.js
function createFormatCache(ttlMs) {
	const cache = /* @__PURE__ */ new Map();
	return {
		get(id) {
			const entry = cache.get(id);
			if (!entry || entry.expires < Date.now()) return null;
			return entry;
		},
		set(id, title, formats) {
			cache.set(id, {
				expires: Date.now() + ttlMs,
				title,
				formats
			});
		},
		raw: cache
	};
}
function qualityFromSize(width, height) {
	if (height && height >= 100) return `${height}p`;
	if (width && width >= 100) return `${width}px`;
	return "HD";
}
function buildDirectPresets(prefix, items, extraNote, numbered = items.length > 1) {
	const presets = [];
	const formats = /* @__PURE__ */ new Map();
	const many = numbered && items.length > 1;
	items.forEach((item, index) => {
		const n = index + 1;
		const slide = many ? `Слайд ${n} · ` : "";
		const q = item.quality || qualityFromSize(item.width, item.height);
		if (item.videoUrl) {
			const id = `${prefix}-v${n}`;
			const ext = item.ext ?? extFromUrl(item.videoUrl, "mp4");
			const mime = item.mime ?? mimeFromExt(ext, true);
			presets.push({
				id,
				itag: n,
				label: `${slide}${q} со звуком`,
				kind: "muxed",
				ext,
				mime,
				hasAudio: true,
				hasVideo: true,
				qualityLabel: q,
				sizeBytes: null,
				note: item.note ?? extraNote ?? (many ? "видео из публикации" : "готовый файл")
			});
			formats.set(id, {
				url: item.videoUrl,
				mime,
				ext,
				headers: item.headers
			});
		}
		if (item.imageUrl) {
			const isCover = Boolean(item.videoUrl);
			const id = isCover ? `${prefix}-cover-${n}` : `${prefix}-i${n}`;
			const ext = extFromUrl(item.imageUrl, "jpg");
			const mime = mimeFromExt(ext, false);
			presets.push({
				id,
				itag: n + 100,
				label: isCover ? `${slide}Обложка` : `${slide}${q}`,
				kind: "image",
				ext,
				mime,
				hasAudio: false,
				hasVideo: false,
				qualityLabel: q,
				sizeBytes: null,
				note: isCover ? "кадр-обложка" : item.note ?? (many ? "фото из публикации" : "оригинал")
			});
			formats.set(id, {
				url: item.imageUrl,
				mime,
				ext,
				headers: item.headers
			});
		}
	});
	return {
		presets,
		formats
	};
}
async function openDirectUrl(format, title) {
	try {
		const response = await withTimeout(fetch(format.url, {
			headers: {
				accept: "*/*",
				...format.headers ?? {}
			},
			redirect: "follow"
		}), 25e3, "file timeout");
		if (!response.ok || !response.body) return {
			ok: false,
			error: "Не удалось получить файл. Попробуйте ещё раз."
		};
		if (isHtmlContentType(response.headers.get("content-type"))) return {
			ok: false,
			error: "Не удалось получить файл. Попробуйте ещё раз."
		};
		return {
			ok: true,
			response,
			filename: `${safeFilename(title)}.${format.ext}`,
			mime: format.mime
		};
	} catch {
		return {
			ok: false,
			error: "Не удалось получить файл. Попробуйте ещё раз."
		};
	}
}
//#endregion
export { qualityFromSize as i, createFormatCache as n, openDirectUrl as r, buildDirectPresets as t };
