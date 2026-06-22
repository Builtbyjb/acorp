import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SmsIcon, WhatsAppIcon, SendIcon } from '../../-icons.tsx'
import { useLayout } from '@/hooks/useLayout'
import { Phone, MoreVertical, Share2 } from 'lucide-react'

interface Message {
  id: number
  text: string
  direction: 'outgoing' | 'incoming'
  time: string
}

const MOCK: Record<string, { name: string; phone: string; channel: 'sms' | 'wa'; messages: Message[] }> = {
  '1': {
    name: 'Maria Gonzalez', phone: '+1 (555) 201-4832', channel: 'wa',
    messages: [
      { id: 1, text: "Hi Maria, just a reminder that the community meeting is this Friday at 6pm at City Hall.", direction: 'outgoing', time: '10:02 AM' },
      { id: 2, text: "Thanks for the reminder! Will there be parking available?", direction: 'incoming', time: '10:15 AM' },
      { id: 3, text: "Yes, the car park on Maple Street will be free after 5pm.", direction: 'outgoing', time: '10:18 AM' },
      { id: 4, text: "Thanks! I'll be there at 6pm.", direction: 'incoming', time: '10:21 AM' },
    ],
  },
  '2': {
    name: 'David Park', phone: '+1 (555) 348-9201', channel: 'sms',
    messages: [
      { id: 1, text: "Hi David, your appointment is confirmed for Thursday at 2pm.", direction: 'outgoing', time: 'Yesterday 9:00 AM' },
      { id: 2, text: "Can I reschedule for next week?", direction: 'incoming', time: 'Yesterday 11:34 AM' },
    ],
  },
  '3': {
    name: 'Priya Nair', phone: '+1 (555) 478-6620', channel: 'wa',
    messages: [
      { id: 1, text: "Hi Priya! Your membership renewal is due in 7 days. Reply YES to renew.", direction: 'outgoing', time: 'Yesterday 2:00 PM' },
      { id: 2, text: "YES", direction: 'incoming', time: 'Yesterday 2:04 PM' },
      { id: 3, text: "Great! We've renewed your membership. Thank you, Priya!", direction: 'outgoing', time: 'Yesterday 2:05 PM' },
      { id: 4, text: "Got it, thank you so much!", direction: 'incoming', time: 'Yesterday 2:10 PM' },
    ],
  },
}

function getFallback(id: string) {
  return {
    name: `Contact ${id}`, phone: '+1 (555) 000-0000', channel: 'sms' as const,
    messages: [{ id: 1, text: 'Hello! How can we help you today?', direction: 'outgoing' as const, time: 'Now' }],
  }
}

function initials(n: string) { return n.split(' ').map((w) => w[0]).join('') }

function ConversationPage() {
  const { setTitle } = useLayout()
  const { conversationId } = Route.useParams()
  const conv = MOCK[conversationId] ?? getFallback(conversationId)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    setTitle(conv.name)
  }, [setTitle, conv.name])

  const isWA = conv.channel === 'wa'
  const ChannelIcon = isWA ? WhatsAppIcon : SmsIcon
  const channelLabel = isWA ? 'WhatsApp' : 'SMS'

  const handleShare = async () => {
    const text = conv.messages.map((m) => `${m.direction === 'outgoing' ? 'Me' : conv.name}: ${m.text}`).join('\n')
    if (navigator.share) {
      await navigator.share({ title: `Conversation with ${conv.name}`, text })
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border/60 bg-card flex-shrink-0">
        <Avatar className="size-10">
          <AvatarFallback className="text-white text-xs font-bold bg-primary">
            {initials(conv.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground">{conv.name}</p>
          <p className="text-xs text-muted-foreground">{conv.phone}</p>
        </div>
        <Badge
          variant="secondary"
          className={`text-xs font-semibold gap-1 ${
            isWA ? 'bg-[#25D366]/10 text-[#16A34A]' : 'bg-primary/10 text-primary'
          }`}
        >
          <ChannelIcon size={11} />
          {channelLabel}
        </Badge>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      {/* Thread */}
      <ScrollArea className="flex-1 p-5">
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {conv.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.direction === 'outgoing' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] space-y-1 rounded-2xl px-4 py-2.5 text-sm ${
                  msg.direction === 'outgoing'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-card text-card-foreground rounded-bl-md shadow-sm'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] ${msg.direction === 'outgoing' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input bar */}
      <div className="flex items-end gap-2 px-4 py-3 border-t border-border/60 bg-card flex-shrink-0">
        <Badge
          variant="secondary"
          className={`mb-1 flex-shrink-0 text-[10px] font-semibold gap-1 ${
            isWA ? 'bg-[#25D366]/10 text-[#16A34A]' : 'bg-primary/10 text-primary'
          }`}
        >
          <ChannelIcon size={9} />
          {channelLabel}
        </Badge>
        <Textarea
          placeholder="Type a message…"
          rows={1}
          value={draft}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraft(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); setDraft('') }
          }}
          className="flex-1 min-h-0 resize-none text-sm rounded-2xl border-border/60 bg-muted/50 py-2.5"
        />
        <Button
          size="icon"
          onClick={() => setDraft('')}
          className="flex-shrink-0 h-9 w-9 rounded-full"
        >
          <SendIcon size={14} />
        </Button>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/messages/$conversationId')({
  component: ConversationPage,
})
