import { createFileRoute } from '@tanstack/react-router'
import { MessagesIcon } from '../../-icons.tsx'

export const Route = createFileRoute('/_auth/messages/')({
  component: MessagesEmptyState,
})

function MessagesEmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center p-8">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <MessagesIcon size={26} />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground">Select a conversation</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Choose a conversation from the list or start a new one.
        </p>
      </div>
    </div>
  )
}
