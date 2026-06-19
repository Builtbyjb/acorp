import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { SmsIcon, WhatsAppIcon } from '../-icons.tsx'
import { useLayout } from '@/hooks/useLayout'
import { Shield, Lock, Eye, FileText, Users, CreditCard, Building2, Link2, Check } from 'lucide-react'

const TEAM = [
  { name: 'Jane Smith', email: 'jane@acmecorp.com', role: 'Admin', joined: 'Jan 2024' },
  { name: 'Marcus Lee', email: 'marcus@acmecorp.com', role: 'Member', joined: 'Mar 2024' },
  { name: 'Rachel Torres', email: 'rachel@acmecorp.com', role: 'Member', joined: 'May 2024' },
]

const TABS = [
  { id: 'organisation', label: 'Organisation', icon: Building2 },
  { id: 'channels', label: 'Channels', icon: Link2 },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
]

function initials(n: string) { return n.split(' ').map((w) => w[0]).join('') }

function FieldGroup({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-xs font-bold text-foreground">
        {label}
      </Label>
      {children}
    </div>
  )
}

function OrgTab() {
  return (
    <div className="space-y-6 max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>Organisation Details</CardTitle>
          <CardDescription>Update your workspace information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup label="Organisation name" htmlFor="org-name">
            <Input id="org-name" defaultValue="Acme Corp" className="h-10 rounded-xl" />
          </FieldGroup>
          <FieldGroup label="Website" htmlFor="org-website">
            <Input id="org-website" type="url" defaultValue="https://acmecorp.com" className="h-10 rounded-xl" />
          </FieldGroup>
          <FieldGroup label="Timezone" htmlFor="tz">
            <select
              id="tz"
              className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm outline-none"
            >
              <option>(UTC-05:00) Eastern Time</option>
              <option>(UTC-06:00) Central Time</option>
              <option>(UTC-07:00) Mountain Time</option>
              <option>(UTC-08:00) Pacific Time</option>
              <option>(UTC+00:00) UTC</option>
              <option>(UTC+01:00) London</option>
            </select>
          </FieldGroup>
          <Button>Save changes</Button>
        </CardContent>
      </Card>

      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Danger zone</CardTitle>
          <CardDescription>Permanently delete this workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Delete organisation</p>
              <p className="text-xs text-muted-foreground">This cannot be undone. All data will be permanently removed.</p>
            </div>
            <Button variant="destructive" size="sm">Delete</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ChannelsTab() {
  return (
    <div className="space-y-4 max-w-xl">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <SmsIcon size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">SMS</p>
                <p className="text-xs text-muted-foreground">Twilio · United States</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 text-[10px]">
              <span className="size-1.5 rounded-full bg-emerald-500 mr-1" />
              Connected
            </Badge>
          </div>
          <p className="text-sm font-semibold text-foreground mb-4">+1 (800) 555-0199</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Configure</Button>
            <Button variant="ghost" size="sm" className="text-destructive">Disconnect</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#16A34A]">
                <WhatsAppIcon size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">WhatsApp Business</p>
                <p className="text-xs text-muted-foreground">Meta Business API</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-[10px]">
              <span className="size-1.5 rounded-full bg-muted-foreground animate-pulse mr-1" />
              Not connected
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            Connect your WhatsApp Business account to send and receive WhatsApp messages.
          </p>
          <Button size="sm">Connect WhatsApp</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function TeamTab() {
  return (
    <div className="space-y-4 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">Team members</h3>
          <p className="text-sm text-muted-foreground">Manage who can access this workspace</p>
        </div>
        <Button>Invite member</Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="pr-6 w-16" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {TEAM.map((m) => (
                <TableRow key={m.email}>
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-7">
                        <AvatarFallback className="text-white text-[10px] font-bold bg-primary">
                          {initials(m.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-foreground">{m.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{m.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={m.role === 'Admin' ? 'bg-primary/10 text-primary text-[10px]' : 'bg-muted text-muted-foreground text-[10px]'}
                    >
                      {m.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{m.joined}</TableCell>
                  <TableCell className="pr-6">
                    <Button variant="ghost" size="sm" className="text-destructive h-8">Remove</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function SecurityTab() {
  const features = [
    { icon: Lock, title: 'Encrypted storage', desc: 'All messages and contact data are encrypted at rest with AES-256.' },
    { icon: Shield, title: 'GDPR compliance', desc: 'Built-in opt-in/opt-out management, data deletion, and export tools.' },
    { icon: Eye, title: 'Audit logs', desc: 'Track every admin action, message send, and login in one place.' },
    { icon: FileText, title: 'Data residency', desc: 'Choose where your data is stored. EU and US regions available.' },
  ]

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-bold text-foreground">Security & compliance</h3>
        <p className="text-sm text-muted-foreground">How we protect your organisation and community data</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {features.map((f) => (
          <Card key={f.title} className="hover:-translate-y-0.5 transition-transform">
            <CardContent className="p-5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                <f.icon size={18} />
              </div>
              <h4 className="font-semibold text-foreground mb-1">{f.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compliance checklist</CardTitle>
          <CardDescription>Your current security posture</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            'Two-factor authentication enabled for admins',
            'Data retention policy configured',
            'Opt-in consent recorded for all contacts',
            'Regular security reviews scheduled',
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <div className="flex size-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <Check size={12} />
              </div>
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function BillingTab() {
  const USAGE = [
    { label: 'SMS messages', pct: 64, used: 3204, total: 5000 },
    { label: 'WhatsApp messages', pct: 28, used: 1388, total: 5000 },
    { label: 'Contacts', pct: 57, used: 2841, total: 5000 },
  ]

  return (
    <div className="space-y-6 max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>Current plan</CardTitle>
          <CardDescription>You are on the Growth plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-2xl font-extrabold tracking-tight text-foreground">Growth</p>
              <p className="text-3xl font-extrabold tracking-tight mt-1 text-foreground">
                $79<span className="text-sm font-normal text-muted-foreground ml-1">/ month</span>
              </p>
            </div>
            <Button variant="outline" size="sm">Upgrade plan</Button>
          </div>
          <ul className="space-y-2">
            {['Up to 5,000 contacts', 'Unlimited broadcasts', 'SMS & WhatsApp channels', '3 team members', '24/7 email support'].map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Check size={14} className="text-primary" />
                {f}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>This month</CardTitle>
          <CardDescription>Your current usage against plan limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {USAGE.map((u) => (
            <div key={u.label} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{u.label}</span>
                <span className="font-semibold text-foreground">
                  {u.used.toLocaleString()} / {u.total.toLocaleString()}
                </span>
              </div>
              <Progress value={u.pct} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function SettingsPage() {
  const { setTitle } = useLayout()
  useEffect(() => {
    setTitle('Settings')
  }, [setTitle])

  const [tab, setTab] = useState('organisation')

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure your workspace, channels, and security</p>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="mb-6 flex-wrap h-auto gap-1 bg-muted/50 p-1.5 rounded-2xl">
          {TABS.map((t) => (
            <TabsTrigger
              key={t.id}
              value={t.id}
              className="rounded-xl px-4 py-2 data-[active]:bg-background data-[active]:shadow-sm"
            >
              <t.icon className="h-4 w-4 mr-2" />
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="organisation"><OrgTab /></TabsContent>
        <TabsContent value="channels"><ChannelsTab /></TabsContent>
        <TabsContent value="team"><TeamTab /></TabsContent>
        <TabsContent value="security"><SecurityTab /></TabsContent>
        <TabsContent value="billing"><BillingTab /></TabsContent>
      </Tabs>
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/settings')({
  component: SettingsPage,
})
