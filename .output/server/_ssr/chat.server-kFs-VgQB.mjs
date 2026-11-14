import { t as GoogleGenAI } from "../_libs/@google/genai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat.server-kFs-VgQB.js
var BASE_SYSTEM_INSTRUCTION = `Ты — умный медиа-ассистент сервиса сохранения контента (KADR).
Твоя роль:
1. Помогать пользователям скачивать видео, аудио, фото, обложки и истории с YouTube, Vimeo, Instagram (посты, Reels, карусели, истории по ссылке), TikTok, X (Twitter), Threads и RuTube.
2. Объяснять разницу между форматами:
   - «Видео со звуком» (muxed MP4) — готовый ролик в одном файле;
   - «Только видео» и «Только звук» — раздельные потоки высокого качества (например, 1080p/4K на YouTube или HLS-потоки на Vimeo);
   - «Обложка» / «Фото» — оригинальный кадр-превью или слайды из карусели;
   - Кнопка «Скачать всё сразу» — скачивает полный комплект (лучшее видео + звук + обложку или все файлы публикации/карусели) одним нажатием.
3. Подсказывать, как правильно скопировать ссылку на историю Instagram (вида instagram.com/stories/имя/ID_истории или короткую ссылку) и почему приватные или истёкшие (24ч) истории недоступны.
4. Отвечать кратко, дружелюбно, по делу и на русском языке (если пользователь не попросил другой язык).`;
async function runChatTurn(data) {
	const trimmed = data.message?.trim();
	if (!trimmed) return {
		ok: false,
		error: "Введите сообщение."
	};
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey || apiKey === "MY_GEMINI_API_KEY") return {
		ok: false,
		error: "Ключ GEMINI_API_KEY не настроен на сервере. Добавьте его в панель Secrets в AI Studio."
	};
	try {
		const ai = new GoogleGenAI({
			apiKey,
			httpOptions: { headers: { "User-Agent": "aistudio-build" } }
		});
		const model = data.mode === "fast" ? "gemini-3.1-flash-lite" : "gemini-3.8-flash";
		let systemInstruction = BASE_SYSTEM_INSTRUCTION;
		if (data.videoContext) {
			const ctx = data.videoContext;
			const presetsSummary = ctx.presets.map((p) => `${p.label} (${p.ext.toUpperCase()} — ${p.note})`).join("; ") || "нет доступных файлов";
			systemInstruction += `\n\nСейчас у пользователя на экране разобрана публикация:
- Источник: ${ctx.source}
- Название: ${ctx.title}
- Автор: ${ctx.author || "не указан"}
- Ссылка: ${ctx.url}
- Доступные файлы: ${presetsSummary}`;
		}
		const safeHistory = (data.history ?? []).filter((turn) => turn.text && turn.text.trim().length > 0).slice(-20).map((turn) => ({
			role: turn.role,
			parts: [{ text: turn.text }]
		}));
		const reply = (await ai.chats.create({
			model,
			history: safeHistory,
			config: { systemInstruction }
		}).sendMessage({ message: trimmed })).text?.trim();
		if (!reply) return {
			ok: false,
			error: "Модель вернула пустой ответ. Попробуйте переформулировать вопрос."
		};
		return {
			ok: true,
			reply,
			modelUsed: model
		};
	} catch (err) {
		return {
			ok: false,
			error: `Не удалось получить ответ от ассистента: ${err instanceof Error ? err.message : "Ошибка запроса к Gemini"}`
		};
	}
}
//#endregion
export { runChatTurn };
