import { createFileRoute } from '@tanstack/react-router'
import { MessagesIcon } from '../../-icons.tsx'

export const Route = createFileRoute('/_auth/messages/')({
  component: MessagesEmptyState,
})

function MessagesEmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center p-8" style={{ backgroundColor: '#ebf0f0' }}>
      <div
        className="flex size-14 items-center justify-center rounded-2xl"
        style={{ backgroundColor: '#7F8CAA14', color: '#7F8CAA' }}
      >
        <MessagesIcon size={24} />
      </div>
      <div>
        <p
          className="text-xs font-bold tracking-[0.22em] uppercase mb-1.5"
          style={{ color: '#7F8CAA' }}
        >
          Inbox
        </p>
        <h3
          className="text-base font-bold mb-1"
          style={{ color: '#0f172a' }}
        >
          Select a conversation
        </h3>
        <p className="text-sm" style={{ color: '#7F8CAA' }}>
          Choose a conversation from the list or start a new one.
        </p>
      </div>
    </div>
  )
}
