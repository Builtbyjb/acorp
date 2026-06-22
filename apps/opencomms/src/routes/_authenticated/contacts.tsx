import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PlusIcon, SearchIcon, SmsIcon, WhatsAppIcon } from '../-icons.tsx'
import { useLayout } from '@/hooks/useLayout'
import { Filter, Download, MessageCircle } from 'lucide-react'
import { isNativePlatform, pickImage } from '@shared/mobile'

const CONTACTS = [
  { id: '1', name: 'Maria Gonzalez', phone: '+1 (555) 201-4832', channel: 'wa', tags: ['Members', 'VIP'], lastActive: '3h ago', status: 'subscribed' },
  { id: '2', name: 'David Park', phone: '+1 (555) 348-9201', channel: 'sms', tags: ['Members'], lastActive: '5h ago', status: 'subscribed' },
  { id: '3', name: 'Priya Nair', phone: '+1 (555) 478-6620', channel: 'wa', tags: ['Members', 'Volunteers'], lastActive: 'Yesterday', status: 'subscribed' },
  { id: '4', name: 'James Okafor', phone: '+1 (555) 562-1199', channel: 'sms', tags: ['Members'], lastActive: 'Yesterday', status: 'unsubscribed' },
  { id: '5', name: 'Aisha Mensah', phone: '+1 (555) 634-7752', channel: 'wa', tags: ['Volunteers'], lastActive: 'Mon', status: 'subscribed' },
  { id: '6', name: 'Carlos Reyes', phone: '+1 (555) 701-3388', channel: 'sms', tags: ['Members', 'Donors'], lastActive: 'Mon', status: 'subscribed' },
  { id: '7', name: 'Yuki Tanaka', phone: '+1 (555) 813-4491', channel: 'wa', tags: ['Donors'], lastActive: 'Sun', status: 'subscribed' },
  { id: '8', name: 'Sofia Andersen', phone: '+1 (555) 922-6654', channel: 'sms', tags: ['Members'], lastActive: 'Sat', status: 'subscribed' },
  { id: '9', name: 'Kwame Asante', phone: '+1 (555) 101-2233', channel: 'wa', tags: ['Members', 'Volunteers'], lastActive: '2 weeks ago', status: 'subscribed' },
  { id: '10', name: 'Lena Fischer', phone: '+1 (555) 244-8871', channel: 'sms', tags: ['Donors'], lastActive: '3 weeks ago', status: 'subscribed' },
]

const TAG_COLORS: Record<string, string> = {
  Members: 'bg-primary/10 text-primary hover:bg-primary/20',
  Volunteers: 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20',
  Donors: 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20',
  VIP: 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20',
}

function initials(n: string) { return n.split(' ').map((w) => w[0]).join('') }

function ContactsPage() {
  const { setTitle } = useLayout()
  const [search, setSearch] = useState('')
  const [avatars, setAvatars] = useState<Record<string, string>>({})
  useEffect(() => {
    setTitle('Contacts')
  }, [setTitle])

  const handlePickAvatar = async (id: string) => {
    const photo = await pickImage()
    if (photo?.dataUrl) {
      setAvatars((prev) => ({ ...prev, [id]: photo.dataUrl! }))
    }
  }

  const filtered = CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  )

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Contacts</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your community and keep conversations organised</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download size={14} className="mr-1.5" /> Import CSV
          </Button>
          <Button>
            <PlusIcon size={14} className="mr-1.5" /> Add contact
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base">Directory</CardTitle>
              <CardDescription>{filtered.length} contacts found</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search contacts…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-64 rounded-xl pl-9"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter size={14} className="mr-1.5" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6 w-20" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => {
                  const isWA = c.channel === 'wa'
                  const ChannelIcon = isWA ? WhatsAppIcon : SmsIcon
                  return (
                    <TableRow key={c.id} className="group">
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-2.5">
                          <Avatar
                            className={`size-7 flex-shrink-0 ${isNativePlatform() ? 'cursor-pointer' : ''}`}
                            onClick={() => isNativePlatform() && handlePickAvatar(c.id)}
                          >
                            {avatars[c.id] ? <AvatarImage src={avatars[c.id]} alt={c.name} /> : null}
                            <AvatarFallback className="text-white text-[10px] font-bold bg-primary">
                              {initials(c.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-foreground">{c.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{c.phone}</TableCell>
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
                        <div className="flex flex-wrap gap-1">
                          {c.tags.map((t) => (
                            <Badge key={t} variant="secondary" className={`text-[10px] ${TAG_COLORS[t] || 'bg-muted text-muted-foreground'}`}>
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{c.lastActive}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={c.status === 'subscribed'
                            ? 'bg-emerald-500/10 text-emerald-600 text-[10px]'
                            : 'bg-red-500/10 text-red-600 text-[10px]'
                          }
                        >
                          <span className={`size-1.5 rounded-full mr-1 ${c.status === 'subscribed' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          {c.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="pr-6">
                      <Link to="/messages/$conversationId" params={{ conversationId: c.id }}>
                        <Button variant="ghost" size="sm" className="text-primary h-8">
                          <MessageCircle size={14} className="mr-1" /> Message
                        </Button>
                      </Link>
                      </TableCell>
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

export const Route = createFileRoute('/_authenticated/contacts')({
  component: ContactsPage,
})
