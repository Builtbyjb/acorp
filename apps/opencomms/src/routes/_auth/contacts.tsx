import { createFileRoute, Link } from '@tanstack/react-router'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header
        className="flex h-14 items-center justify-between px-6 flex-shrink-0 bg-white"
        style={{ borderBottom: '1px solid #7F8CAA18' }}
      >
        <div>
          <p className="text-xs font-bold tracking-[0.22em] uppercase" style={{ color: '#7F8CAA' }}>Directory</p>
          <h1 className="text-sm font-bold" style={{ color: '#0f172a' }}>Contacts</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
            style={{ color: '#7F8CAA', borderColor: '#7F8CAA45' }}
          >
            Import CSV
          </button>
          <button
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white rounded-full transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#4382df', boxShadow: '0 2px 12px #4382df35' }}
          >
            <PlusIcon size={11} />Add contact
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        {/* Filter bar */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-52 max-w-xs">
            <SearchIcon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7F8CAA]" />
            <input
              type="search"
              placeholder="Search contacts…"
              className="w-full rounded-full border bg-white pl-8 pr-4 py-1.5 text-sm outline-none focus:ring-2 placeholder:text-sm"
              style={{
                borderColor: '#c8d5e0',
                color: '#0f172a',
              }}
            />
          </div>
          <select
            className="rounded-full border bg-white px-4 py-1.5 text-sm outline-none focus:ring-2 appearance-none pr-8"
            style={{ borderColor: '#c8d5e0', color: '#7F8CAA' }}
          >
            <option value="">All channels</option>
            <option>SMS</option>
            <option>WhatsApp</option>
          </select>
          <select
            className="rounded-full border bg-white px-4 py-1.5 text-sm outline-none focus:ring-2 appearance-none pr-8"
            style={{ borderColor: '#c8d5e0', color: '#7F8CAA' }}
          >
            <option value="">All tags</option>
            <option>Members</option>
            <option>Volunteers</option>
            <option>Donors</option>
            <option>VIP</option>
          </select>
        </div>

        {/* Table card */}
        <div
          className="bg-white rounded-3xl overflow-hidden"
          style={{ boxShadow: '0 1px 4px #0f172a0a, 0 0 0 1px #0f172a06' }}
        >
          <Table>
            <TableHeader>
              <TableRow style={{ borderBottomColor: '#7F8CAA14' }}>
                <TableHead className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: '#7F8CAA' }}>Name</TableHead>
                <TableHead className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: '#7F8CAA' }}>Phone</TableHead>
                <TableHead className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: '#7F8CAA' }}>Channel</TableHead>
                <TableHead className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: '#7F8CAA' }}>Tags</TableHead>
                <TableHead className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: '#7F8CAA' }}>Last Active</TableHead>
                <TableHead className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: '#7F8CAA' }}>Status</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {CONTACTS.map((c) => {
                const isWA = c.channel === 'wa'
                const ChannelIcon = isWA ? WhatsAppIcon : SmsIcon
                return (
                  <TableRow key={c.id} className="hover:bg-[#7F8CAA04] transition-colors" style={{ borderBottomColor: '#7F8CAA10' }}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-7 flex-shrink-0">
                          <AvatarFallback
                            className="text-white text-[10px] font-bold"
                            style={{ backgroundColor: '#4382df' }}
                          >
                            {initials(c.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium" style={{ color: '#0f172a' }}>{c.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs" style={{ color: '#7F8CAA' }}>{c.phone}</TableCell>
                    <TableCell>
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{
                          backgroundColor: isWA ? '#22c55e12' : '#4382df0e',
                          color: isWA ? '#16a34a' : '#4382df',
                        }}
                      >
                        <ChannelIcon size={9} />
                        {isWA ? 'WhatsApp' : 'SMS'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {c.tags.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border"
                            style={{ borderColor: '#7F8CAA28', color: '#7F8CAA' }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs" style={{ color: '#7F8CAA' }}>{c.lastActive}</TableCell>
                    <TableCell>
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                        style={
                          c.status === 'subscribed'
                            ? { backgroundColor: '#16a34a12', color: '#16a34a' }
                            : { backgroundColor: '#dc262612', color: '#dc2626' }
                        }
                      >
                        <span
                          className="size-1.5 rounded-full"
                          style={{ backgroundColor: c.status === 'subscribed' ? '#16a34a' : '#dc2626' }}
                        />
                        {c.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Link
                        to="/messages/$conversationId"
                        params={{ conversationId: c.id }}
                        className="text-xs font-semibold transition-opacity hover:opacity-70"
                        style={{ color: '#4382df' }}
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
    </div>
  )
}
