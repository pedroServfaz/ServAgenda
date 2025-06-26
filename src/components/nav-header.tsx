import * as React from 'react'

import logo from '../../public/logo.svg'

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import Image from 'next/image'
import Link from 'next/link'
import { Separator } from './ui/separator'

export function NavHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-2"
          asChild
        >
          <Link href="/">
            <Image src={logo} alt="logo" className="h-8 w-8" />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Conecta</span>
              <span className="truncate text-xs">Hub de aplicativos</span>
            </div>
          </Link>
        </SidebarMenuButton>
        <Separator orientation="horizontal" className="mt-[7px]" />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
