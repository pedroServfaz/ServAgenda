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

type HeaderProps = {
  appName?: string
}

export function Header({ appName }: HeaderProps) {
  const routeNameMap: Record<string, string> = {}

  function formatSegment(segment: string) {
    return routeNameMap[segment] ?? segment
  }

  const segments = usePathname().split('/').filter(Boolean)

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

  return (
    <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">{appName || 'App Name'}</BreadcrumbLink>
            </BreadcrumbItem>

            {segments.length > 0 && <BreadcrumbSeparator className="hidden md:block" />}

            {breadcrumbs}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
