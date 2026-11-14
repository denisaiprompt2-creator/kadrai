import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Bot,
  LoaderCircle,
  MessageSquare,
  Send,
  Sparkles,
  Trash2,
  User,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  sendChatMessage,
  type ChatTurn,
  type ChatVideoContext,
} from "@/lib/chat/chat";
import { UI_TEXT, useLanguage } from "@/lib/i18n";
import { sourceLabel } from "@/lib/media/source";
import type { VideoInspect } from "@/lib/youtube/types";

export function ChatWidget({ video }: { video: VideoInspect | null }) {
  const { lang } = useLanguage();
  const t = UI_TEXT[lang];
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"general" | "fast">("general");
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatTurn[]>([
    {
      role: "model",
      text: t.assistantGreeting,
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0]?.role === "model") {
        return [{ role: "model", text: UI_TEXT[lang].assistantGreeting }];
      }
      return prev;
    });
  }, [lang]);

  useEffect(() => {
    if (!open) return;
    const node = scrollRef.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [messages, pending, open]);

  const videoContext: ChatVideoContext = video
    ? {
        title: video.title,
        source: sourceLabel(video.source),
        author: video.author,
        url: video.url,
        durationSec: video.durationSec,
        presets: video.presets.map((p) => ({
          label: p.label,
          kind: p.kind,
          ext: p.ext,
          note: p.note,
        })),
      }
    : null;

  async function handleSend(textToSend: string) {
    const trimmed = textToSend.trim();
    if (!trimmed || pending) return;

    const historySnapshot = messages;
    const nextUserTurn: ChatTurn = { role: "user", text: trimmed };

    setMessages((prev) => [...prev, nextUserTurn]);
    setInput("");
    setError(null);
    setPending(true);

    try {
      const res = await sendChatMessage({
        data: {
          message: trimmed,
          history: historySnapshot,
          mode,
          videoContext,
        },
      });

      if (!res.ok) {
        setError(res.error);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "model", text: res.reply },
      ]);
    } catch {
      setError(
        lang === "en"
          ? "Could not reach the assistant. Please try again."
          : "Не удалось связаться с помощником. Попробуйте ещё раз.",
      );
    } finally {
      setPending(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void handleSend(input);
  }

  function resetConversation() {
    setError(null);
    setMessages([
      {
        role: "model",
        text: t.assistantCleared,
      },
    ]);
  }

  return (
    <>
      <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
        {!open ? (
          <Button
            type="button"
            onClick={() => setOpen(true)}
            className="h-12 gap-2 rounded-full px-5 shadow-lg"
            aria-label={t.assistantOpenAria}
          >
            <MessageSquare className="size-4" />
            <span>{t.assistantButton}</span>
          </Button>
        ) : null}
      </div>

      {open ? (
        <aside
          aria-label={t.assistantTitle}
          className="fixed inset-x-3 bottom-3 z-50 flex max-h-[min(600px,calc(100dvh-24px))] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[400px]"
        >
          <div className="flex items-center justify-between gap-2 border-b border-border bg-surface-2 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-foreground">
                <Bot className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold text-foreground">
                  {t.assistantTitle}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {video && video.presets.length > 0
                    ? `${t.assistantSeeingCard} ${sourceLabel(video.source)}`
                    : t.assistantDefaultSub}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() =>
                  setMode((prev) => (prev === "general" ? "fast" : "general"))
                }
                title={
                  mode === "general"
                    ? "Gemini 3.8 Flash"
                    : "Gemini 3.1 Flash Lite"
                }
                className="inline-flex h-8 items-center gap-1 rounded-lg border border-border bg-surface px-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {mode === "general" ? (
                  <>
                    <Sparkles className="size-3.5" />
                    <span>{t.assistantModeSmart}</span>
                  </>
                ) : (
                  <>
                    <Zap className="size-3.5" />
                    <span>{t.assistantModeFast}</span>
                  </>
                )}
              </button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={resetConversation}
                aria-label={t.assistantClearAria}
                title={t.assistantClearAria}
              >
                <Trash2 className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => setOpen(false)}
                aria-label={t.assistantCloseAria}
                title={t.assistantCloseAria}
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto p-4"
          >
            {messages.map((msg, index) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={`${msg.role}-${index}`}
                  className={`flex items-start gap-2.5 ${
                    isUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-border text-xs ${
                      isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface-2 text-foreground"
                    }`}
                  >
                    {isUser ? (
                      <User className="size-3.5" />
                    ) : (
                      <Bot className="size-3.5" />
                    )}
                  </span>
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-surface-2 text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {pending ? (
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-foreground">
                  <Bot className="size-3.5" />
                </span>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-muted-foreground">
                  <LoaderCircle className="size-4 animate-spin" />
                  <span>{t.assistantTyping}</span>
                </div>
              </div>
            ) : null}

            {error ? (
              <p
                role="alert"
                className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive"
              >
                {error}
              </p>
            ) : null}

            {messages.length <= 2 && !pending ? (
              <div className="pt-2">
                <p className="mb-2 text-xs text-muted-foreground">
                  {t.assistantQuickTitle}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {t.assistantQuickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void handleSend(prompt)}
                      className="rounded-xl border border-border bg-surface-2 px-2.5 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 border-t border-border bg-surface p-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.assistantPlaceholder}
              disabled={pending}
              className="h-10 flex-1"
              aria-label={t.assistantInputAria}
            />
            <Button
              type="submit"
              size="icon"
              disabled={pending || !input.trim()}
              className="size-10 shrink-0"
              aria-label={t.assistantSendAria}
            >
              {pending ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
            </Button>
          </form>
        </aside>
      ) : null}
    </>
  );
}
