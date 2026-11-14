import { p as withTimeout } from "./http.server-g2lDO9wb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hls.server-C9CgwGYw.js
function resolveUrl(base, maybe) {
	try {
		return new URL(maybe, base).href;
	} catch {
		return maybe;
	}
}
function parseMasterPlaylist(text, baseUrl) {
	const lines = text.split(/\r?\n/);
	const variants = [];
	for (let i = 0; i < lines.length; i += 1) {
		const line = lines[i]?.trim() ?? "";
		if (!line.startsWith("#EXT-X-STREAM-INF:")) continue;
		const next = lines[i + 1]?.trim() ?? "";
		if (!next || next.startsWith("#")) continue;
		const bandwidth = Number(line.match(/BANDWIDTH=(\d+)/)?.[1] ?? 0);
		const res = line.match(/RESOLUTION=(\d+)x(\d+)/);
		const width = Number(res?.[1] ?? 0);
		const height = Number(res?.[2] ?? 0);
		variants.push({
			bandwidth,
			width,
			height,
			url: resolveUrl(baseUrl, next)
		});
	}
	variants.sort((a, b) => (b.height || b.bandwidth) - (a.height || a.bandwidth));
	const seen = /* @__PURE__ */ new Set();
	return variants.filter((v) => {
		const key = v.height || v.bandwidth;
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}
function parseMediaPlaylist(text, baseUrl) {
	const lines = text.split(/\r?\n/);
	let init = null;
	const segments = [];
	for (const raw of lines) {
		const line = raw.trim();
		if (!line) continue;
		const map = line.match(/#EXT-X-MAP:.*URI="([^"]+)"/);
		if (map?.[1]) {
			init = resolveUrl(baseUrl, map[1]);
			continue;
		}
		if (line.startsWith("#")) continue;
		segments.push(resolveUrl(baseUrl, line));
	}
	return {
		init,
		segments
	};
}
async function concatHlsResponse(mediaPlaylistUrl, headers) {
	const playlistRes = await withTimeout(fetch(mediaPlaylistUrl, {
		headers,
		redirect: "follow"
	}), 12e3, "playlist timeout");
	if (!playlistRes.ok) throw new Error("playlist failed");
	const { init, segments } = parseMediaPlaylist(await playlistRes.text(), mediaPlaylistUrl);
	const parts = init ? [init, ...segments] : segments;
	if (parts.length === 0) throw new Error("no segments");
	const stream = new ReadableStream({ async start(controller) {
		try {
			for (const part of parts) {
				const res = await fetch(part, {
					headers,
					redirect: "follow"
				});
				if (!res.ok || !res.body) continue;
				const reader = res.body.getReader();
				for (;;) {
					const { done, value } = await reader.read();
					if (done) break;
					if (value) controller.enqueue(value);
				}
			}
			controller.close();
		} catch (err) {
			controller.error(err);
		}
	} });
	const mime = init || parts[0]?.includes(".m4s") ? "video/mp4" : "video/mp2t";
	return new Response(stream, {
		status: 200,
		headers: { "content-type": mime }
	});
}
//#endregion
export { parseMasterPlaylist as n, concatHlsResponse as t };
