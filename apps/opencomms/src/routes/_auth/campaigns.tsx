import { createFileRoute } from '@tanstack/react-router'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PlusIcon, SmsIcon, WhatsAppIcon } from '../-icons.tsx'

export const Route = createFileRoute('/_auth/campaigns')({
  component: CampaignsPage,
})

const CAMPAIGNS = [
  { id: '1', name: 'June Newsletter',              channel: 'sms', status: 'sent',      recipients: 1180, delivered: 1163, failed: 17,  sentAt: 'Jun 10 · 9:00 AM'  },
  { id: '2', name: 'Flash Sale — 20% off',         channel: 'wa',  status: 'sent',      recipients: 340,  delivered: 338,  failed: 2,   sentAt: 'Jun 10 · 7:30 AM'  },
  { id: '3', name: 'Event Reminder: Community BBQ', channel: 'sms', status: 'sent',     recipients: 892,  delivered: 879,  failed: 13,  sentAt: 'Jun 8 · 10:00 AM'  },
  { id: '4', name: 'Membership Renewal Nudge',      channel: 'wa',  status: 'scheduled', recipients: 204, delivered: 0,    failed: 0,   sentAt: 'Jun 15 · 9:00 AM'  },
  { id: '5', name: 'Welcome — New Members May',     channel: 'sms', status: 'sent',      recipients: 38,  delivered: 38,   failed: 0,   sentAt: 'Jun 1 · 8:00 AM'   },
  { id: '6', name: 'Volunteer Call-Out',            channel: 'wa',  status: 'draft',     recipients: 0,   delivered: 0,    failed: 0,   sentAt: '—'                  },
  { id: '7', name: 'May Monthly Update',            channel: 'sms', status: 'sent',      recipients: 1102, delivered: 1088, failed: 14, sentAt: 'May 10 · 9:00 AM'  },
]

const STATUS_STYLE: Record<string, { bg: string; color: string; dot: string }> = {
  sent:      { bg: '#16a34a12', color: '#16a34a', dot: '#16a34a' },
  scheduled: { bg: '#f59e0b12', color: '#b45309', dot: '#f59e0b' },
  draft:     { bg: '#7F8CAA12', color: '#7F8CAA', dot: '#7F8CAA' },
  failed:    { bg: '#dc262612', color: '#dc2626', dot: '#dc2626' },
}

const SUMMARY = [
  { label: 'Total campaigns',       value: String(CAMPAIGNS.length)                                         },
  { label: 'Messages sent',         value: CAMPAIGNS.reduce((a, c) => a + c.delivered, 0).toLocaleString()  },
  { label: 'Avg delivery rate',     value: '98.3%'                                                          },
  { label: 'Scheduled',             value: String(CAMPAIGNS.filter((c) => c.status === 'scheduled').length) },
]

function CampaignsPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header
        className="flex h-14 items-center justify-between px-6 flex-shrink-0 bg-white"
        style={{ borderBottom: '1px solid #7F8CAA18' }}
      >
        <div>
          <p className="text-xs font-bold tracking-[0.22em] uppercase" style={{ color: '#7F8CAA' }}>Broadcasting</p>
          <h1 className="text-sm font-bold" style={{ color: '#0f172a' }}>Campaigns</h1>
        </div>
        <button
          className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white rounded-full transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: '#4382df', boxShadow: '0 2px 12px #4382df35' }}
        >
          <PlusIcon size={11} />New campaign
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Summary strip */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {SUMMARY.map((s, i) => (
            <div
              key={s.label}
              className="animate-fade-up bg-white rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                boxShadow: '0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07',
                animationDelay: `${0.05 + i * 0.07}s`,
              }}
            >
              <p
                className="text-xs font-bold tracking-[0.18em] uppercase mb-2"
                style={{ color: '#7F8CAA' }}
              >
                {s.label}
              </p>
              <p
                className="text-2xl font-extrabold tracking-tight"
                style={{ color: '#0f172a', letterSpacing: '-0.03em' }}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div
          className="animate-fade-up bg-white rounded-3xl overflow-hidden"
          style={{
            boxShadow: '0 1px 4px #0f172a0a, 0 0 0 1px #0f172a06',
            animationDelay: '0.32s',
          }}
        >
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #7F8CAA14' }}>
            <div>
              <p className="text-xs font-bold tracking-[0.22em] uppercase mb-0.5" style={{ color: '#7F8CAA' }}>History</p>
              <h2 className="text-sm font-bold" style={{ color: '#0f172a' }}>All Campaigns</h2>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow style={{ borderBottomColor: '#7F8CAA14' }}>
                <TableHead className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: '#7F8CAA' }}>Campaign</TableHead>
                <TableHead className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: '#7F8CAA' }}>Channel</TableHead>
                <TableHead className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: '#7F8CAA' }}>Status</TableHead>
                <TableHead className="text-xs font-bold tracking-[0.18em] uppercase text-right" style={{ color: '#7F8CAA' }}>Recipients</TableHead>
                <TableHead className="text-xs font-bold tracking-[0.18em] uppercase text-right" style={{ color: '#7F8CAA' }}>Delivered</TableHead>
                <TableHead className="text-xs font-bold tracking-[0.18em] uppercase text-right" style={{ color: '#7F8CAA' }}>Failed</TableHead>
                <TableHead className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: '#7F8CAA' }}>Sent / Scheduled</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CAMPAIGNS.map((c) => {
                const isWA = c.channel === 'wa'
                const ChannelIcon = isWA ? WhatsAppIcon : SmsIcon
                const rate = c.recipients > 0 ? `${Math.round((c.delivered / c.recipients) * 100)}%` : null
                const st = STATUS_STYLE[c.status] ?? STATUS_STYLE.draft
                return (
                  <TableRow
                    key={c.id}
                    className="hover:bg-[#7F8CAA04] transition-colors"
                    style={{ borderBottomColor: '#7F8CAA10' }}
                  >
                    <TableCell className="font-semibold text-sm" style={{ color: '#0f172a' }}>{c.name}</TableCell>
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
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{ backgroundColor: st.bg, color: st.color }}
                      >
                        <span className="size-1.5 rounded-full" style={{ backgroundColor: st.dot }} />
                        {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-sm" style={{ color: '#7F8CAA' }}>
                      {c.recipients > 0 ? c.recipients.toLocaleString() : '—'}
                    </TableCell>
                    <TableCell className="text-right">
                      {c.delivered > 0 ? (
                        <span className="text-sm" style={{ color: '#0f172a' }}>
                          {c.delivered.toLocaleString()}
                          {rate && <span className="ml-1.5 text-xs" style={{ color: '#7F8CAA' }}>{rate}</span>}
                        </span>
                      ) : <span className="text-sm" style={{ color: '#7F8CAA' }}>—</span>}
                    </TableCell>
                    <TableCell className="text-right text-sm" style={{ color: c.failed > 0 ? '#dc2626' : '#7F8CAA' }}>
                      {c.delivered > 0 ? c.failed : '—'}
                    </TableCell>
                    <TableCell className="text-xs" style={{ color: '#7F8CAA' }}>{c.sentAt}</TableCell>
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
