import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PlusIcon, SearchIcon, SmsIcon, WhatsAppIcon } from "../../-icons.tsx";
import { useLayout } from "@/hooks/useLayout";
import { cn } from "@/lib/utils";
import { MessageSquareText } from "lucide-react";

const CONVERSATIONS = [
  { id: "1", name: "Maria Gonzalez", preview: "Thanks! I'll be there at 6pm.", channel: "wa", time: "3h ago", unread: true },
  { id: "2", name: "David Park", preview: "Can I reschedule for next week?", channel: "sms", time: "5h ago", unread: true },
  { id: "3", name: "Priya Nair", preview: "Got it, thank you so much!", channel: "wa", time: "Yesterday", unread: false },
  { id: "4", name: "James Okafor", preview: "STOP", channel: "sms", time: "Yesterday", unread: false },
  { id: "5", name: "Aisha Mensah", preview: "Perfect, see you then.", channel: "wa", time: "Mon", unread: false },
  { id: "6", name: "Carlos Reyes", preview: "What time does it start?", channel: "sms", time: "Mon", unread: false },
  { id: "7", name: "Yuki Tanaka", preview: "Confirmed!", channel: "wa", time: "Sun", unread: false },
  { id: "8", name: "Sofia Andersen", preview: "Can you send me the details?", channel: "sms", time: "Sat", unread: false },
];

function initials(n: string) {
  return n
    .split(" ")
    .map((w) => w[0])
    .join("");
}

function ChannelBadge({ channel }: { channel: "wa" | "sms" }) {
  const isWA = channel === "wa";
  return (
    <Badge
      variant="secondary"
      className={cn(
        "text-[9px] font-semibold gap-1 px-1.5 py-0.5",
        isWA ? "bg-[#25D366]/10 text-[#16A34A] hover:bg-[#25D366]/20" : "bg-primary/10 text-primary hover:bg-primary/20"
      )}
    >
      {isWA ? <WhatsAppIcon size={8} /> : <SmsIcon size={8} />}
      {isWA ? "WA" : "SMS"}
    </Badge>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="flex size-16 items-center justify-center rounded-3xl bg-primary/10 text-primary mb-4">
        <MessageSquareText className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">Select a conversation</h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        Choose a contact from the list to view your message history and reply.
      </p>
    </div>
  );
}

function MessagesLayout() {
  const { setTitle } = useLayout();
  const routerState = useRouterState();
  const [search, setSearch] = useState("");
  useEffect(() => {
    setTitle("Messages");
  }, [setTitle]);

  const currentPath = routerState.location.pathname;
  const isIndex = currentPath === "/messages" || currentPath === "/messages/";

  const filtered = CONVERSATIONS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[calc(100vh-8rem)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Messages</h1>
          <p className="text-sm text-muted-foreground mt-1">Unified inbox for SMS and WhatsApp conversations</p>
        </div>
        <Button>
          <PlusIcon size={14} className="mr-1" /> New conversation
        </Button>
      </div>

      <div className="grid lg:grid-cols-12 gap-0 rounded-3xl border border-border/60 bg-card shadow-sm h-full overflow-hidden">
        {/* Conversation list panel */}
        <aside className="lg:col-span-4 flex flex-col border-r border-border/60">
          <div className="p-4 border-b border-border/60">
            <div className="relative">
              <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search conversations…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl bg-muted/50 pl-9 pr-3 py-2 text-sm border-0"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            {filtered.map((c) => {
              return (
                <Link
                  key={c.id}
                  to="/messages/$conversationId"
                  params={{ conversationId: c.id }}
                  className="flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-muted/50 border-b border-border/40 last:border-0"
                  activeProps={{
                    className: "flex items-start gap-3 px-4 py-3.5 transition-colors bg-primary/5 border-l-2 border-l-primary border-b border-border/40 last:border-0",
                  }}
                >
                  <Avatar className="mt-0.5 size-9 flex-shrink-0">
                    <AvatarFallback className="text-white text-xs font-bold bg-primary">
                      {initials(c.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className={cn("text-xs font-semibold truncate", c.unread ? "text-foreground" : "text-muted-foreground")}>
                        {c.name}
                      </span>
                      <span className="flex-shrink-0 text-[10px] text-muted-foreground">{c.time}</span>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] truncate text-muted-foreground">{c.preview}</span>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <ChannelBadge channel={c.channel as "wa" | "sms"} />
                        {c.unread && <span className="size-1.5 rounded-full flex-shrink-0 bg-primary" />}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </ScrollArea>
        </aside>

        {/* Outlet: conversation detail or empty state */}
        <div className="lg:col-span-8 flex flex-col h-full bg-muted/20">
          {isIndex ? <EmptyState /> : <Outlet />}
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_authenticated/messages/")({
  component: MessagesLayout,
});
