import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { SmsIcon, WhatsAppIcon, SendIcon } from '../../-icons.tsx'

export const Route = createFileRoute('/_auth/messages/$conversationId')({
  component: ConversationPage,
})

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
      { id: 2, text: "Thanks for the reminder! Will there be parking available?",                                direction: 'incoming', time: '10:15 AM' },
      { id: 3, text: "Yes, the car park on Maple Street will be free after 5pm.",                               direction: 'outgoing', time: '10:18 AM' },
      { id: 4, text: "Thanks! I'll be there at 6pm.",                                                          direction: 'incoming', time: '10:21 AM' },
    ],
  },
  '2': {
    name: 'David Park', phone: '+1 (555) 348-9201', channel: 'sms',
    messages: [
      { id: 1, text: "Hi David, your appointment is confirmed for Thursday at 2pm.", direction: 'outgoing', time: 'Yesterday 9:00 AM' },
      { id: 2, text: "Can I reschedule for next week?",                              direction: 'incoming', time: 'Yesterday 11:34 AM' },
    ],
  },
  '3': {
    name: 'Priya Nair', phone: '+1 (555) 478-6620', channel: 'wa',
    messages: [
      { id: 1, text: "Hi Priya! Your membership renewal is due in 7 days. Reply YES to renew.", direction: 'outgoing', time: 'Yesterday 2:00 PM' },
      { id: 2, text: "YES",                                                                      direction: 'incoming', time: 'Yesterday 2:04 PM' },
      { id: 3, text: "Great! We've renewed your membership. Thank you, Priya!",                   direction: 'outgoing', time: 'Yesterday 2:05 PM' },
      { id: 4, text: "Got it, thank you so much!",                                                direction: 'incoming', time: 'Yesterday 2:10 PM' },
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
  const { conversationId } = Route.useParams()
  const conv = MOCK[conversationId] ?? getFallback(conversationId)
  const [draft, setDraft] = useState('')

  const ChannelIcon = conv.channel === 'wa' ? WhatsAppIcon : SmsIcon
  const channelLabel = conv.channel === 'wa' ? 'WhatsApp' : 'SMS'
  const channelClass = conv.channel === 'wa' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 border-b px-5 py-3 flex-shrink-0">
        <Avatar className="size-8">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
            {initials(conv.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{conv.name}</p>
          <p className="text-xs text-muted-foreground">{conv.phone}</p>
        </div>
        <Badge variant="secondary" className={cn('gap-1.5 text-xs', channelClass)}>
          <ChannelIcon size={11} />
          {channelLabel}
        </Badge>
      </div>

      {/* Thread */}
      <ScrollArea className="flex-1 p-5">
        <div className="flex flex-col gap-3">
          {conv.messages.map((msg) => (
            <div key={msg.id} className={cn('flex', msg.direction === 'outgoing' ? 'justify-end' : 'justify-start')}>
              <div className={cn(
                'max-w-[70%] space-y-1 rounded-2xl px-4 py-2.5 text-sm',
                msg.direction === 'outgoing'
                  ? 'rounded-br-sm bg-primary text-primary-foreground'
                  : 'rounded-bl-sm bg-muted text-foreground',
              )}>
                <p className="leading-relaxed">{msg.text}</p>
                <p className={cn('text-[10px]', msg.direction === 'outgoing' ? 'text-primary-foreground/60' : 'text-muted-foreground')}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="flex items-end gap-2 border-t p-3 flex-shrink-0">
        <Badge variant="secondary" className={cn('mb-0.5 flex-shrink-0 gap-1.5 text-[11px]', channelClass)}>
          <ChannelIcon size={10} />
          {channelLabel}
        </Badge>
        <Textarea
          placeholder="Type a message…"
          rows={1}
          value={draft}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraft(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); setDraft('') } }}
          className="flex-1 min-h-0 resize-none text-sm"
        />
        <Button size="sm" className="flex-shrink-0" onClick={() => setDraft('')}>
          <SendIcon size={14} />
        </Button>
      </div>
    </>
  )
}
