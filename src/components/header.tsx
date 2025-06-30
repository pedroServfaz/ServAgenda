'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from './ui/sidebar'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Check, Plus } from 'lucide-react'

import { useReserveFormStore } from '../../context/useReserveFormStore'
import Link from 'next/link'

type HeaderProps = {
  appName?: string
}

export function Header({ appName }: HeaderProps) {
  const routeNameMap: Record<string, string> = {
    'reserve-room': 'Reserva de sala',
    new: 'Nova',
    created: 'Criadas',
  }

  function formatSegment(segment: string) {
    return routeNameMap[segment] ?? segment
  }

  const pathname = usePathname()
  const showSubmitButton = pathname === '/new'
  const showCreateButton = pathname === '/created'

  const segments = pathname.split('/').filter(Boolean)

  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const isLast = index === segments.length - 1

    return (
      <BreadcrumbItem key={href}>
        {isLast ? (
          <BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
        ) : (
          <>
            <BreadcrumbLink href={href}>{formatSegment(segment)}</BreadcrumbLink>
            <BreadcrumbSeparator className="hidden md:block" />
          </>
        )}
      </BreadcrumbItem>
    )
  })

  const { submit, isSubmitting } = useReserveFormStore()

  return (
    <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">{appName || 'Reserva de sala'}</BreadcrumbLink>
            </BreadcrumbItem>

            {segments.length > 0 && <BreadcrumbSeparator className="hidden md:block" />}

            {breadcrumbs}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="ml-auto flex gap-2">
        {showSubmitButton && (
          <Button onClick={submit} disabled={isSubmitting} size="default" className="min-w-[150px]">
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Criando...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Criar reserva
              </>
            )}
          </Button>
        )}

        {showCreateButton && (
          <Button asChild size="default" className="min-w-[150px]">
            <Link href="/new">
              <Plus className="h-4 w-4 mr-2" />
              Nova reserva
            </Link>
          </Button>
        )}
      </div>
    </header>
  )
}
