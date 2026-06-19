import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { PlusIcon, SmsIcon, WhatsAppIcon } from '../-icons.tsx'
import { useLayout } from '@/hooks/useLayout'
import { Megaphone, Calendar, BarChart3, Share2 } from 'lucide-react'
import { shareText, scheduleNotification } from '@shared/mobile'

const CAMPAIGNS = [
  { id: '1', name: 'June Newsletter', channel: 'sms', status: 'sent', recipients: 1180, delivered: 1163, failed: 17, sentAt: 'Jun 10 · 9:00 AM' },
  { id: '2', name: 'Flash Sale — 20% off', channel: 'wa', status: 'sent', recipients: 340, delivered: 338, failed: 2, sentAt: 'Jun 10 · 7:30 AM' },
  { id: '3', name: 'Event Reminder: Community BBQ', channel: 'sms', status: 'sent', recipients: 892, delivered: 879, failed: 13, sentAt: 'Jun 8 · 10:00 AM' },
  { id: '4', name: 'Membership Renewal Nudge', channel: 'wa', status: 'scheduled', recipients: 204, delivered: 0, failed: 0, sentAt: 'Jun 15 · 9:00 AM' },
  { id: '5', name: 'Welcome — New Members May', channel: 'sms', status: 'sent', recipients: 38, delivered: 38, failed: 0, sentAt: 'Jun 1 · 8:00 AM' },
  { id: '6', name: 'Volunteer Call-Out', channel: 'wa', status: 'draft', recipients: 0, delivered: 0, failed: 0, sentAt: '—' },
  { id: '7', name: 'May Monthly Update', channel: 'sms', status: 'sent', recipients: 1102, delivered: 1088, failed: 14, sentAt: 'May 10 · 9:00 AM' },
]

const STATUS_STYLE: Record<string, { class: string; label: string; dot: string }> = {
  sent: { class: 'bg-emerald-500/10 text-emerald-600', label: 'Sent', dot: 'bg-emerald-500' },
  scheduled: { class: 'bg-amber-500/10 text-amber-600', label: 'Scheduled', dot: 'bg-amber-500' },
  draft: { class: 'bg-muted text-muted-foreground', label: 'Draft', dot: 'bg-muted-foreground' },
  failed: { class: 'bg-red-500/10 text-red-600', label: 'Failed', dot: 'bg-red-500' },
}

const SUMMARY = [
  { label: 'Total campaigns', value: String(CAMPAIGNS.length), icon: Megaphone },
  { label: 'Messages sent', value: CAMPAIGNS.reduce((a, c) => a + c.delivered, 0).toLocaleString(), icon: BarChart3 },
  { label: 'Avg delivery rate', value: '98.3%', icon: BarChart3 },
  { label: 'Scheduled', value: String(CAMPAIGNS.filter((c) => c.status === 'scheduled').length), icon: Calendar },
]

function CampaignsPage() {
  const { setTitle } = useLayout()
  const scheduledRef = useRef(false)
  useEffect(() => {
    setTitle('Campaigns')

    if (scheduledRef.current) return
    scheduledRef.current = true

    CAMPAIGNS.filter((c) => c.status === 'scheduled').forEach((c) => {
      // Parse a fake scheduled date relative to now for demo purposes.
      const scheduleAt = new Date(Date.now() + 60_000 * Number(c.id))
      scheduleNotification({
        id: 1000 + Number(c.id),
        title: 'Campaign reminder',
        body: `${c.name} is scheduled to send soon.`,
        scheduleAt,
      }).catch(() => {
        // ignore permission errors
      })
    })
  }, [setTitle])

  const handleShare = async () => {
    const summary = `OpenComms campaigns: ${SUMMARY.map((s) => `${s.label}: ${s.value}`).join('\n')}`
    await shareText(summary, 'Campaign Summary')
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Campaigns</h1>
          <p className="text-sm text-muted-foreground mt-1">Broadcast the right message to the right people</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 size={14} className="mr-1.5" /> Share
          </Button>
          <Button>
            <PlusIcon size={14} className="mr-1.5" /> New campaign
          </Button>
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SUMMARY.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label} className="hover:-translate-y-0.5 transition-transform">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={16} />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
                </div>
                <p className="text-2xl font-extrabold tracking-tight">{s.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">All Campaigns</CardTitle>
          <CardDescription>Track delivery and engagement for every broadcast</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Campaign</TableHead>
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
                  const isWA = c.channel === 'wa'
                  const ChannelIcon = isWA ? WhatsAppIcon : SmsIcon
                  const rate = c.recipients > 0 ? Math.round((c.delivered / c.recipients) * 100) : 0
                  const st = STATUS_STYLE[c.status] ?? STATUS_STYLE.draft
                  return (
                    <TableRow key={c.id} className="group">
                      <TableCell className="pl-6 font-semibold text-sm text-foreground">{c.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] font-semibold gap-1 ${
                            isWA ? 'bg-[#25D366]/10 text-[#16A34A]' : 'bg-primary/10 text-primary'
                          }`}
                        >
                          <ChannelIcon size={9} />
                          {isWA ? 'WhatsApp' : 'SMS'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`text-[10px] font-semibold gap-1 ${st.class}`}>
                          <span className={`size-1.5 rounded-full ${st.dot}`} />
                          {st.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {c.recipients > 0 ? c.recipients.toLocaleString() : '—'}
                      </TableCell>
                      <TableCell className="text-right">
                        {c.delivered > 0 ? (
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-sm font-medium text-foreground">
                              {c.delivered.toLocaleString()}
                            </span>
                            <div className="w-20">
                              <Progress value={rate} className="h-1" />
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className={`text-right text-sm ${c.failed > 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
                        {c.delivered > 0 ? c.failed : '—'}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{c.sentAt}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/campaigns')({
  component: CampaignsPage,
})
