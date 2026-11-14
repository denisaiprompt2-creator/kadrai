//#region node_modules/.nitro/vite/services/ssr/assets/disposition-cFkjd5Bs.js
function contentDisposition(filename) {
	return `attachment; filename="${filename.replace(/[^\x20-\x7E]/g, "_").replace(/["\\]/g, "_").slice(0, 120) || "kadr"}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
}
function fileDownloadPath(source, id, presetId) {
	return `/api/file?${new URLSearchParams({
		source,
		id,
		preset: presetId
	}).toString()}`;
}
//#endregion
export { fileDownloadPath as n, contentDisposition as t };
