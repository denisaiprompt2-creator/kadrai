import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { Jt as number, Qt as string, Ut as array, Vt as _enum, Yt as object } from "../_libs/@better-auth/core+[...].mjs";
import { t as authMiddleware } from "./middleware-Dtq72ZH1.mjs";
import { u as isMediaSource } from "./source-Cs9ZLiNi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-store-BbBAhGc5.js
var LIMIT = 24;
var itemSchema = object({
	id: string().min(1).max(64),
	source: _enum([
		"youtube",
		"instagram",
		"x",
		"threads",
		"tiktok",
		"rutube",
		"vimeo"
	]).default("youtube"),
	url: string().min(1).max(500),
	title: string().min(1).max(200),
	author: string().max(120).default(""),
	thumbnail: string().max(2e3).default(""),
	durationSec: number().nullable().optional(),
	savedAt: number().optional()
});
function persistableThumb(value) {
	if (!value) return "";
	if (value.startsWith("data:")) return "";
	if (value.length > 1800) return "";
	return value;
}
function asItem(row) {
	const saved = typeof row.saved_at === "string" ? Date.parse(row.saved_at) : row.saved_at instanceof Date ? row.saved_at.getTime() : Date.now();
	return {
		id: row.id,
		source: isMediaSource(row.source) ? row.source : "youtube",
		url: row.url,
		title: row.title,
		author: row.author ?? "",
		thumbnail: persistableThumb(row.thumbnail),
		durationSec: row.duration_sec ?? null,
		savedAt: Number.isFinite(saved) ? saved : Date.now()
	};
}
async function readList(userId) {
	const { getSql } = await import("./db-DqpNM7Gn.mjs").then((n) => n.t).then((n) => n.t);
	return (await (await getSql())`
    select id, source, url, title, author, thumbnail, duration_sec, saved_at
    from history_items
    where user_id = ${userId}
    order by saved_at desc
    limit ${LIMIT}
  `).map(asItem);
}
async function upsertItem(userId, item) {
	const { getSql } = await import("./db-DqpNM7Gn.mjs").then((n) => n.t).then((n) => n.t);
	const sql = await getSql();
	const source = item.source ?? "youtube";
	const thumbnail = persistableThumb(item.thumbnail);
	const duration = item.durationSec ?? null;
	const savedAt = new Date(item.savedAt ?? Date.now());
	await sql`
    insert into history_items (
      user_id, source, id, url, title, author, thumbnail, duration_sec, saved_at
    ) values (
      ${userId}, ${source}, ${item.id}, ${item.url}, ${item.title},
      ${item.author ?? ""}, ${thumbnail}, ${duration}, ${savedAt}
    )
    on conflict (user_id, source, id) do update set
      url = excluded.url,
      title = excluded.title,
      author = excluded.author,
      thumbnail = excluded.thumbnail,
      duration_sec = excluded.duration_sec,
      saved_at = excluded.saved_at
  `;
}
var listHistory_createServerFn_handler = createServerRpc({
	id: "f4d2a9562cc14b8191a8cdb9a6f28c98c26f9562f41db098908e5e385e3e8455",
	name: "listHistory",
	filename: "src/lib/history-store.ts"
}, (opts) => listHistory.__executeServer(opts));
var listHistory = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listHistory_createServerFn_handler, async ({ context }) => {
	return readList(context.userId);
});
var saveHistoryItem_createServerFn_handler = createServerRpc({
	id: "eb5621a2a442708a4c33bc0e093869d2afc942847ba6cb14289e8bee123ff6a1",
	name: "saveHistoryItem",
	filename: "src/lib/history-store.ts"
}, (opts) => saveHistoryItem.__executeServer(opts));
var saveHistoryItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(itemSchema).handler(saveHistoryItem_createServerFn_handler, async ({ context, data }) => {
	await upsertItem(context.userId, data);
	return readList(context.userId);
});
var syncHistory_createServerFn_handler = createServerRpc({
	id: "104ee5f8d8ac5eb7f788f9b4fdb0450fd6311aec3526fb43316c8b939450e0b5",
	name: "syncHistory",
	filename: "src/lib/history-store.ts"
}, (opts) => syncHistory.__executeServer(opts));
var syncHistory = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(array(itemSchema).max(LIMIT)).handler(syncHistory_createServerFn_handler, async ({ context, data }) => {
	for (const item of data) await upsertItem(context.userId, item);
	return readList(context.userId);
});
var clearHistoryItems_createServerFn_handler = createServerRpc({
	id: "e59f6c9010de439850a82d9786ee4b8c51820587e22fd6e54ff49a1367c8cae9",
	name: "clearHistoryItems",
	filename: "src/lib/history-store.ts"
}, (opts) => clearHistoryItems.__executeServer(opts));
var clearHistoryItems = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(clearHistoryItems_createServerFn_handler, async ({ context }) => {
	const { getSql } = await import("./db-DqpNM7Gn.mjs").then((n) => n.t).then((n) => n.t);
	await (await getSql())`delete from history_items where user_id = ${context.userId}`;
	return [];
});
//#endregion
export { clearHistoryItems_createServerFn_handler, listHistory_createServerFn_handler, saveHistoryItem_createServerFn_handler, syncHistory_createServerFn_handler };
