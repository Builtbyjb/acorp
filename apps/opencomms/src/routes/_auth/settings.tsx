import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/_auth/settings')({
  component: SettingsPage,
})

const TEAM = [
  { name: 'Jane Smith',    email: 'jane@acmecorp.com',   role: 'Admin',  joined: 'Jan 2024' },
  { name: 'Marcus Lee',    email: 'marcus@acmecorp.com', role: 'Member', joined: 'Mar 2024' },
  { name: 'Rachel Torres', email: 'rachel@acmecorp.com', role: 'Member', joined: 'May 2024' },
]

function initials(n: string) { return n.split(' ').map((w) => w[0]).join('') }

function OrgTab() {
  return (
    <div className="space-y-8 max-w-lg">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="org-name">Organisation name</Label>
          <Input id="org-name" defaultValue="Acme Corp" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="org-website">Website</Label>
          <Input id="org-website" type="url" defaultValue="https://acmecorp.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tz">Timezone</Label>
          <select id="tz" className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary">
            <option>(UTC-05:00) Eastern Time</option>
            <option>(UTC-06:00) Central Time</option>
            <option>(UTC-07:00) Mountain Time</option>
            <option>(UTC-08:00) Pacific Time</option>
            <option>(UTC+00:00) UTC</option>
            <option>(UTC+01:00) London</option>
          </select>
        </div>
        <Button>Save changes</Button>
      </div>

      <div>
        <Separator className="mb-6" />
        <div className="rounded-lg border border-destructive/30 p-4 space-y-3">
          <p className="text-sm font-semibold text-destructive">Danger zone</p>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">Delete organisation</p>
              <p className="text-xs text-muted-foreground">Permanently delete this workspace. This cannot be undone.</p>
            </div>
            <Button variant="destructive" size="sm">Delete</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChannelsTab() {
  return (
    <div className="space-y-6 max-w-lg">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">SMS</CardTitle>
            <Badge variant="secondary" className="text-green-600 dark:text-green-400 text-xs">Connected</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm font-semibold text-foreground">+1 (800) 555-0199</p>
          <p className="text-xs text-muted-foreground">Twilio &middot; United States</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Configure</Button>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Disconnect</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">WhatsApp Business</CardTitle>
            <Badge variant="secondary" className="text-xs text-muted-foreground">Not connected</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground">
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">Team members</p>
        <Button size="sm">Invite member</Button>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-16" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {TEAM.map((m) => (
              <TableRow key={m.email}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar className="size-7">
                      <AvatarFallback className="bg-primary/10 text-primary text-[10px]">{initials(m.name)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{m.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{m.email}</TableCell>
                <TableCell>
                  <Badge variant={m.role === 'Admin' ? 'default' : 'secondary'} className="text-xs">
                    {m.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{m.joined}</TableCell>
                <TableCell>
                  <button type="button" className="text-xs text-destructive hover:underline">Remove</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function BillingTab() {
  const USAGE = [
    { label: 'SMS messages',       pct: 64, used: 3204,  total: 5000 },
    { label: 'WhatsApp messages',  pct: 28, used: 1388,  total: 5000 },
    { label: 'Contacts',           pct: 57, used: 2841,  total: 5000 },
  ]

  return (
    <div className="space-y-6 max-w-lg">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Current plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-lg font-bold text-foreground">Growth</p>
              <p className="text-2xl font-bold tracking-tight text-foreground">$79<span className="text-sm font-normal text-muted-foreground"> / month</span></p>
            </div>
            <Button variant="outline" size="sm">Upgrade plan</Button>
          </div>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {['Up to 5,000 contacts', 'Unlimited broadcasts', 'SMS & WhatsApp channels', '3 team members', '24/7 email support'].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Usage this month</p>
        {USAGE.map((u) => (
          <div key={u.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{u.label}</span>
              <span className="text-foreground font-medium">{u.used.toLocaleString()} / {u.total.toLocaleString()}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={cn('h-full rounded-full bg-primary transition-all', u.pct > 80 ? 'bg-destructive' : 'bg-primary')}
                style={{ width: `${u.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SettingsPage() {
  const [tab, setTab] = useState('organisation')

  return (
    <>
      <header className="flex h-14 items-center border-b px-6 flex-shrink-0">
        <h1 className="text-sm font-semibold text-foreground">Settings</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="organisation">Organisation</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="organisation"><OrgTab /></TabsContent>
          <TabsContent value="channels"><ChannelsTab /></TabsContent>
          <TabsContent value="team"><TeamTab /></TabsContent>
          <TabsContent value="billing"><BillingTab /></TabsContent>
        </Tabs>
      </div>
    </>
  )
}
