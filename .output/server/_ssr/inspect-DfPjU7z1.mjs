import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { Qt as string, Vt as _enum, Yt as object } from "../_libs/@better-auth/core+[...].mjs";
import { c as detectMedia, u as isMediaSource } from "./source-Cs9ZLiNi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inspect-DfPjU7z1.js
var SOURCE_ENUM = _enum([
	"youtube",
	"instagram",
	"x",
	"threads",
	"tiktok",
	"rutube",
	"vimeo"
]);
var inspectVideo_createServerFn_handler = createServerRpc({
	id: "7e8e22a91fb72ada0d48107c970359d01d54a130999465c509bdb873087da4ff",
	name: "inspectVideo",
	filename: "src/lib/youtube/inspect.ts"
}, (opts) => inspectVideo.__executeServer(opts));
var inspectVideo = createServerFn({ method: "POST" }).validator(object({ url: string().min(1) })).handler(inspectVideo_createServerFn_handler, async ({ data }) => {
	const detected = detectMedia(data.url);
	if (!detected) return {
		ok: false,
		error: "Не похоже на ссылку YouTube, Instagram, X, Threads, TikTok, RuTube или Vimeo. Подойдёт watch, Shorts, история, Reel, пост, ролик или видео."
	};
	switch (detected.source) {
		case "instagram": {
			const { inspect } = await import("./provider.server-CTBZ4sEx.mjs");
			return inspect(data.url);
		}
		case "youtube": {
			const { inspect } = await import("./provider.server-DPYNGsAf.mjs");
			return inspect(data.url);
		}
		case "x": {
			const { inspect } = await import("./provider.server-CIG4q6em.mjs");
			return inspect(data.url);
		}
		case "threads": {
			const { inspect } = await import("./provider.server-Y_7F9w-Y.mjs");
			return inspect(data.url);
		}
		case "tiktok": {
			const { inspect } = await import("./provider.server-BHXYOKoB.mjs");
			return inspect(data.url);
		}
		case "rutube": {
			const { inspect } = await import("./provider.server-Czj-Bg4M.mjs");
			return inspect(data.url);
		}
		case "vimeo": {
			const { inspect } = await import("./provider.server-Bl09rYOq.mjs");
			return inspect(data.url);
		}
	}
});
var requestDownloadLink_createServerFn_handler = createServerRpc({
	id: "79308e5bfb3cfa0c9ba770d73020139723b6a682a4cc9180081879480dd1bcc5",
	name: "requestDownloadLink",
	filename: "src/lib/youtube/inspect.ts"
}, (opts) => requestDownloadLink.__executeServer(opts));
var requestDownloadLink = createServerFn({ method: "POST" }).validator(object({
	source: SOURCE_ENUM.optional(),
	videoId: string().min(3),
	presetId: string().min(1)
})).handler(requestDownloadLink_createServerFn_handler, async ({ data }) => {
	switch (isMediaSource(data.source) ? data.source : "youtube") {
		case "instagram": {
			const { getDownloadLink } = await import("./provider.server-CTBZ4sEx.mjs");
			return getDownloadLink(data.videoId, data.presetId);
		}
		case "x": {
			const { getDownloadLink } = await import("./provider.server-CIG4q6em.mjs");
			return getDownloadLink(data.videoId, data.presetId);
		}
		case "threads": {
			const { getDownloadLink } = await import("./provider.server-Y_7F9w-Y.mjs");
			return getDownloadLink(data.videoId, data.presetId);
		}
		case "tiktok": {
			const { getDownloadLink } = await import("./provider.server-BHXYOKoB.mjs");
			return getDownloadLink(data.videoId, data.presetId);
		}
		case "rutube": {
			const { getDownloadLink } = await import("./provider.server-Czj-Bg4M.mjs");
			return getDownloadLink(data.videoId, data.presetId);
		}
		case "vimeo": {
			const { getDownloadLink } = await import("./provider.server-Bl09rYOq.mjs");
			return getDownloadLink(data.videoId, data.presetId);
		}
		default: {
			const { getDownloadLink } = await import("./provider.server-DPYNGsAf.mjs");
			return getDownloadLink(data.videoId, data.presetId);
		}
	}
});
//#endregion
export { inspectVideo_createServerFn_handler, requestDownloadLink_createServerFn_handler };
