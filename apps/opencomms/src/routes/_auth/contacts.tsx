import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { PlusIcon, SearchIcon, SmsIcon, WhatsAppIcon } from '../-icons.tsx'

export const Route = createFileRoute('/_auth/contacts')({
  component: ContactsPage,
})

const CONTACTS = [
  { id: '1', name: 'Maria Gonzalez', phone: '+1 (555) 201-4832', channel: 'wa',  tags: ['Members', 'VIP'],        lastActive: '3h ago',     status: 'subscribed'   },
  { id: '2', name: 'David Park',     phone: '+1 (555) 348-9201', channel: 'sms', tags: ['Members'],               lastActive: '5h ago',     status: 'subscribed'   },
  { id: '3', name: 'Priya Nair',     phone: '+1 (555) 478-6620', channel: 'wa',  tags: ['Members', 'Volunteers'], lastActive: 'Yesterday',  status: 'subscribed'   },
  { id: '4', name: 'James Okafor',   phone: '+1 (555) 562-1199', channel: 'sms', tags: ['Members'],               lastActive: 'Yesterday',  status: 'unsubscribed' },
  { id: '5', name: 'Aisha Mensah',   phone: '+1 (555) 634-7752', channel: 'wa',  tags: ['Volunteers'],            lastActive: 'Mon',        status: 'subscribed'   },
  { id: '6', name: 'Carlos Reyes',   phone: '+1 (555) 701-3388', channel: 'sms', tags: ['Members', 'Donors'],     lastActive: 'Mon',        status: 'subscribed'   },
  { id: '7', name: 'Yuki Tanaka',    phone: '+1 (555) 813-4491', channel: 'wa',  tags: ['Donors'],                lastActive: 'Sun',        status: 'subscribed'   },
  { id: '8', name: 'Sofia Andersen', phone: '+1 (555) 922-6654', channel: 'sms', tags: ['Members'],               lastActive: 'Sat',        status: 'subscribed'   },
  { id: '9', name: 'Kwame Asante',   phone: '+1 (555) 101-2233', channel: 'wa',  tags: ['Members', 'Volunteers'], lastActive: '2 weeks ago', status: 'subscribed'  },
  { id: '10', name: 'Lena Fischer',  phone: '+1 (555) 244-8871', channel: 'sms', tags: ['Donors'],                lastActive: '3 weeks ago', status: 'subscribed'  },
]

function initials(n: string) { return n.split(' ').map((w) => w[0]).join('') }

function ContactsPage() {
  return (
    <>
      <header className="flex h-14 items-center justify-between border-b px-6 flex-shrink-0">
        <h1 className="text-sm font-semibold text-foreground">Contacts</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Import CSV</Button>
          <Button size="sm"><PlusIcon size={13} className="mr-1.5" />Add contact</Button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        {/* Filter bar */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-52 max-w-xs">
            <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search contacts…"
              className="w-full rounded-md border bg-background pl-8 pr-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
          </div>
          {(['All channels', 'SMS', 'WhatsApp'] as const).map((opt, i) => (
            <select key={opt} defaultValue={i === 0 ? '' : opt}
              className="rounded-md border bg-background px-3 py-1.5 text-sm text-muted-foreground outline-none focus:ring-1 focus:ring-primary">
              {i === 0 && <option value="">All channels</option>}
              {i === 1 && <><option value="">All channels</option><option>SMS</option><option>WhatsApp</option></>}
              {i === 2 && <><option value="">All tags</option><option>Members</option><option>Volunteers</option><option>Donors</option><option>VIP</option></>}
            </select>
          ))}
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {CONTACTS.map((c) => {
                const ChannelIcon = c.channel === 'wa' ? WhatsAppIcon : SmsIcon
                const channelClass = c.channel === 'wa' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'
                return (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-7 flex-shrink-0">
                          <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">
                            {initials(c.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{c.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{c.phone}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn('gap-1 text-xs', channelClass)}>
                        <ChannelIcon size={10} />
                        {c.channel === 'wa' ? 'WhatsApp' : 'SMS'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {c.tags.map((t) => (
                          <Badge key={t} variant="outline" className="text-[10px] py-0">{t}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{c.lastActive}</TableCell>
                    <TableCell>
                      <Badge
                        variant={c.status === 'subscribed' ? 'secondary' : 'destructive'}
                        className={cn('text-[10px]', c.status === 'subscribed' && 'text-green-600 dark:text-green-400')}
                      >
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link
                        to="/messages/$conversationId"
                        params={{ conversationId: c.id }}
                        className="text-xs text-primary hover:underline"
                      >
                        Message
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
