'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type LucideIcon } from 'lucide-react'

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

type NavItemsProps = {
  appName: string
  items: {
    name: string
    url: string
    icon: LucideIcon
    isActive?: boolean
  }[]
}

export function NavItems({ items }: NavItemsProps) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map(item => (
          <Link href={item.url} key={item.url}>
            <SidebarMenuItem>
              <SidebarMenuButton
                data-active={pathname == item.url}
                tooltip={item.name}
                className="data-[active=true]:bg-emerald-800/10 data-[active=true]:text-emerald-800 rounded-md"
              >
                {item.icon && <item.icon />}
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
