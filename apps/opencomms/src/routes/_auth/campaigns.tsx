import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
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

const STATUS: Record<string, { label: string; className: string }> = {
  sent:      { label: 'Sent',      className: 'text-green-600 dark:text-green-400' },
  scheduled: { label: 'Scheduled', className: 'text-yellow-600 dark:text-yellow-400' },
  draft:     { label: 'Draft',     className: 'text-muted-foreground' },
  failed:    { label: 'Failed',    className: 'text-destructive' },
}

const SUMMARY = [
  { label: 'Total campaigns',       value: String(CAMPAIGNS.length)                                                  },
  { label: 'Messages sent (all)',   value: CAMPAIGNS.reduce((a, c) => a + c.delivered, 0).toLocaleString()           },
  { label: 'Avg delivery rate',     value: '98.3%'                                                                   },
  { label: 'Scheduled',             value: String(CAMPAIGNS.filter((c) => c.status === 'scheduled').length)          },
]

function CampaignsPage() {
  return (
    <>
      <header className="flex h-14 items-center justify-between border-b px-6 flex-shrink-0">
        <h1 className="text-sm font-semibold text-foreground">Campaigns</h1>
        <Button size="sm"><PlusIcon size={13} className="mr-1.5" />New campaign</Button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Summary strip */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {SUMMARY.map((s) => (
            <Card key={s.label}>
              <CardHeader className="pb-1 pt-4 px-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{s.label}</p>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <p className="text-2xl font-bold tracking-tight text-foreground">{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="rounded-lg border">
          <div className="flex items-center justify-between border-b px-5 py-3">
            <CardTitle className="text-sm font-semibold">All campaigns</CardTitle>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Recipients</TableHead>
                <TableHead className="text-right">Delivered</TableHead>
                <TableHead className="text-right">Failed</TableHead>
                <TableHead>Sent / Scheduled</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CAMPAIGNS.map((c) => {
                const ChannelIcon = c.channel === 'wa' ? WhatsAppIcon : SmsIcon
                const channelClass = c.channel === 'wa' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'
                const rate = c.recipients > 0 ? `${Math.round((c.delivered / c.recipients) * 100)}%` : null
                const st = STATUS[c.status] ?? STATUS.draft
                return (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium text-sm">{c.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn('gap-1 text-xs', channelClass)}>
                        <ChannelIcon size={10} />
                        {c.channel === 'wa' ? 'WhatsApp' : 'SMS'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn('text-xs', st.className)}>{st.label}</Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {c.recipients > 0 ? c.recipients.toLocaleString() : '—'}
                    </TableCell>
                    <TableCell className="text-right">
                      {c.delivered > 0 ? (
                        <span className="text-sm text-foreground">
                          {c.delivered.toLocaleString()}
                          {rate && <span className="ml-1.5 text-xs text-muted-foreground">{rate}</span>}
                        </span>
                      ) : <span className="text-sm text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell className={cn('text-right text-sm', c.failed > 0 ? 'text-destructive' : 'text-muted-foreground')}>
                      {c.delivered > 0 ? c.failed : '—'}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{c.sentAt}</TableCell>
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
