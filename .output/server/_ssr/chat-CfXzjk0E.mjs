import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-CfXzjk0E.js
var sendChatMessage_createServerFn_handler = createServerRpc({
	id: "7e2937ceb841ed018ee0768296d55c80ac2180dff9482b14018aaef2f6ae45f5",
	name: "sendChatMessage",
	filename: "src/lib/chat/chat.ts"
}, (opts) => sendChatMessage.__executeServer(opts));
var sendChatMessage = createServerFn({ method: "POST" }).validator((data) => data).handler(sendChatMessage_createServerFn_handler, async ({ data }) => {
	const { runChatTurn } = await import("./chat.server-kFs-VgQB.mjs");
	return runChatTurn(data);
});
//#endregion
export { sendChatMessage_createServerFn_handler };
