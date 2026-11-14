//#region node_modules/.nitro/vite/services/ssr/assets/http.server-g2lDO9wb.js
var BROWSER_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";
var GOOGLEBOT_UA = "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
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
function cookieHeader(res) {
	return (typeof res.headers.getSetCookie === "function" ? res.headers.getSetCookie() : [res.headers.get("set-cookie") ?? ""]).filter(Boolean).map((c) => c.split(";")[0]).join("; ");
}
async function fetchText(url, headers, timeoutMs = 12e3) {
	const res = await withTimeout(fetch(url, {
		headers,
		redirect: "follow"
	}), timeoutMs, "timeout");
	return {
		res,
		text: await res.text()
	};
}
function extFromUrl(url, fallback) {
	try {
		const path = new URL(url).pathname.toLowerCase();
		if (path.endsWith(".mp4") || path.includes(".mp4")) return "mp4";
		if (path.endsWith(".webm")) return "webm";
		if (path.endsWith(".m4a")) return "m4a";
		if (path.endsWith(".ts")) return "ts";
		if (path.endsWith(".webp")) return "webp";
		if (path.endsWith(".png")) return "png";
		if (path.endsWith(".gif")) return "gif";
		if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "jpg";
	} catch {}
	return fallback;
}
function mimeFromExt(ext, video) {
	if (ext === "mp4") return video ? "video/mp4" : "image/jpeg";
	if (ext === "webm") return "video/webm";
	if (ext === "ts") return "video/mp2t";
	if (ext === "m4a") return "audio/mp4";
	if (ext === "png") return "image/png";
	if (ext === "webp") return "image/webp";
	if (ext === "gif") return "image/gif";
	if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
	return video ? "video/mp4" : "application/octet-stream";
}
function isHtmlContentType(value) {
	const type = (value ?? "").toLowerCase();
	return type.includes("text/html") || type.includes("application/xhtml");
}
function asRecord(value) {
	return value && typeof value === "object" && !Array.isArray(value) ? value : null;
}
function asString(value) {
	return typeof value === "string" && value.trim() ? value : null;
}
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
function walkRecords(node, visit, depth = 0) {
	if (!node || typeof node !== "object" || depth > 32) return;
	if (Array.isArray(node)) {
		for (const item of node) walkRecords(item, visit, depth + 1);
		return;
	}
	const rec = node;
	visit(rec);
	for (const value of Object.values(rec)) walkRecords(value, visit, depth + 1);
}
async function inlineThumbnail(url, headers, maxBytes = 4e5) {
	if (!url || url.startsWith("data:")) return url;
	try {
		const res = await withTimeout(fetch(url, {
			headers,
			redirect: "follow"
		}), 5e3, "thumb timeout");
		if (!res.ok) return url;
		const bytes = Buffer.from(await res.arrayBuffer());
		if (bytes.length < 32 || bytes.length > maxBytes) return url;
		const contentType = res.headers.get("content-type") ?? "image/jpeg";
		if (!contentType.startsWith("image/")) return url;
		return `data:${contentType};base64,${bytes.toString("base64")}`;
	} catch {
		return url;
	}
}
//#endregion
export { asString as a, fetchText as c, mimeFromExt as d, walkRecords as f, asRecord as i, inlineThumbnail as l, GOOGLEBOT_UA as n, cookieHeader as o, withTimeout as p, asNumber as r, extFromUrl as s, BROWSER_UA as t, isHtmlContentType as u };
