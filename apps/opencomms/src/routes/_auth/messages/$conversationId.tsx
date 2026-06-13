import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
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

  const isWA = conv.channel === 'wa'
  const ChannelIcon = isWA ? WhatsAppIcon : SmsIcon
  const channelLabel = isWA ? 'WhatsApp' : 'SMS'

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-3 flex-shrink-0"
        style={{ borderBottom: '1px solid #7F8CAA14' }}
      >
        <Avatar className="size-9">
          <AvatarFallback
            className="text-white text-xs font-bold"
            style={{ backgroundColor: '#4382df' }}
          >
            {initials(conv.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold" style={{ color: '#0f172a' }}>{conv.name}</p>
          <p className="text-xs" style={{ color: '#7F8CAA' }}>{conv.phone}</p>
        </div>
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: isWA ? '#22c55e12' : '#4382df0e',
            color: isWA ? '#16a34a' : '#4382df',
          }}
        >
          <ChannelIcon size={11} />
          {channelLabel}
        </span>
      </div>

      {/* Thread */}
      <ScrollArea className="flex-1 p-5" style={{ backgroundColor: '#ebf0f0' }}>
        <div className="flex flex-col gap-3">
          {conv.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.direction === 'outgoing' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className="max-w-[70%] space-y-1 rounded-2xl px-4 py-2.5 text-sm"
                style={
                  msg.direction === 'outgoing'
                    ? {
                        backgroundColor: '#4382df',
                        color: '#ffffff',
                        borderBottomRightRadius: '4px',
                      }
                    : {
                        backgroundColor: '#ffffff',
                        color: '#0f172a',
                        borderBottomLeftRadius: '4px',
                        boxShadow: '0 1px 2px #0f172a0a',
                      }
                }
              >
                <p className="leading-relaxed">{msg.text}</p>
                <p
                  className="text-[10px]"
                  style={{ color: msg.direction === 'outgoing' ? '#ffffff99' : '#7F8CAA' }}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input bar */}
      <div
        className="flex items-end gap-2 px-4 py-3 flex-shrink-0 bg-white"
        style={{ borderTop: '1px solid #7F8CAA14' }}
      >
        <span
          className="mb-0.5 flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold"
          style={{
            backgroundColor: isWA ? '#22c55e12' : '#4382df0e',
            color: isWA ? '#16a34a' : '#4382df',
          }}
        >
          <ChannelIcon size={9} />
          {channelLabel}
        </span>
        <Textarea
          placeholder="Type a message…"
          rows={1}
          value={draft}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraft(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); setDraft('') }
          }}
          className="flex-1 min-h-0 resize-none text-sm rounded-2xl border"
          style={{ borderColor: '#c8d5e0' }}
        />
        <button
          onClick={() => setDraft('')}
          className="flex-shrink-0 flex size-8 items-center justify-center rounded-full text-white transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: '#4382df', boxShadow: '0 2px 10px #4382df35' }}
        >
          <SendIcon size={13} />
        </button>
      </div>
    </div>
  )
}
