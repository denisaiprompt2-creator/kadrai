//#region node_modules/.nitro/vite/services/ssr/assets/format-ebeqqiKW.js
function formatDuration(sec) {
	if (sec == null || !Number.isFinite(sec) || sec < 0) return "—";
	const s = Math.round(sec);
	const h = Math.floor(s / 3600);
	const m = Math.floor(s % 3600 / 60);
	const r = s % 60;
	if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
	return `${m}:${String(r).padStart(2, "0")}`;
}
function formatViews(n) {
	if (n == null || !Number.isFinite(n)) return "—";
	if (n < 1e3) return String(Math.round(n));
	if (n < 1e6) {
		const v = n / 1e3;
		const digits = v < 10 ? 1 : 0;
		return `${v.toFixed(digits).replace(".", ",")} тыс.`;
	}
	if (n < 1e9) {
		const v = n / 1e6;
		const digits = v < 10 ? 1 : 0;
		return `${v.toFixed(digits).replace(".", ",")} млн`;
	}
	return `${(n / 1e9).toFixed(1).replace(".", ",")} млрд`;
}
function formatBytes(n) {
	if (n == null || !Number.isFinite(n) || n <= 0) return "размер уточним";
	const units = [
		"Б",
		"КБ",
		"МБ",
		"ГБ"
	];
	let value = n;
	let i = 0;
	while (value >= 1024 && i < units.length - 1) {
		value /= 1024;
		i += 1;
	}
	const digits = value >= 10 || i === 0 ? 0 : 1;
	return `${value.toFixed(digits).replace(".", ",")} ${units[i]}`;
}
function safeFilename(title) {
	return title.replace(/[<>:"/\\|?*\u0000-\u001f]/g, "").replace(/\s+/g, " ").trim().slice(0, 80) || "kadr";
}
//#endregion
export { safeFilename as i, formatDuration as n, formatViews as r, formatBytes as t };
