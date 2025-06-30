'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LayoutPanelLeft, ListChecks } from 'lucide-react'

import { NavFooter } from '@/components/nav-footer'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

import logo from '../../public/logo.svg'

const data = {
  user: {
    name: 'User Name',
    email: 'user.email@servfaz.com.br',
    avatar: '/avatars/shadcn.jpg',
  },
  apps: [
    {
      title: 'Reserva de sala',
      url: '/reserve-room',
      icon: LayoutPanelLeft,
      isActive: true,
    },
  ],
  navApps: [
    {
      icon: ListChecks,
      name: 'Criadas',
      url: '/created',
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [activeItem, setActiveItem] = React.useState(data.apps[0])
  const { setOpen } = useSidebar()

  const activeBgColor = '#065F4614'

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      <Sidebar collapsible="none" className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                asChild
                className="md:h-8 md:p-0 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                <Link href="/">
                  <Image src={logo} alt="logo" className="h-8 w-8" />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Conecta</span>
                    <span className="truncate text-xs">Hub de aplicativos</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.apps.map(item => {
                  const isActive = pathname === item.url
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={{ children: item.title, hidden: false }}
                        onClick={() => {
                          setActiveItem(item)
                          setOpen(true)
                        }}
                        isActive={isActive}
                        className="px-2.5 md:px-2"
                        style={isActive ? { backgroundColor: activeBgColor } : undefined}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <NavFooter user={data.user} />
        </SidebarFooter>
      </Sidebar>

      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="py-4.5 border-b">
          <div className="flex w-full items-center justify-between my-auto">
            <div className="text-foreground text-base font-medium">{activeItem?.title}</div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              <SidebarMenu>
                {data.navApps.map(item => {
                  const isActive = pathname === item.url
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className="w-full justify-start px-4"
                        style={isActive ? { backgroundColor: activeBgColor } : undefined}
                      >
                        <Link href={item.url}>
                          <item.icon
                            className={`mr-2 h-4 w-4 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
                          />
                          {item.name}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
