'use client'

import * as React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { LayoutDashboard, LayoutPanelLeft } from 'lucide-react'

import { NavItems } from '@/components/nav-main'
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
      title: 'Application',
      url: '#',
      icon: LayoutPanelLeft,
      isActive: true,
    },
  ],
  navApps: [{ icon: LayoutDashboard, name: 'Item Navigation', url: '/' }],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.apps[0])

  const { setOpen } = useSidebar()

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
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
                {data.apps.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item)

                        setOpen(true)
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavFooter user={data.user} />
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="py-4.5 border-b">
          <div className="flex w-full items-center justify-between my-auto">
            <div className="text-foreground text-base font-medium">{activeItem?.title}</div>
          </div>
          {/* <SidebarInput placeholder="Type to search..." /> */}
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              <SidebarContent>
                <NavItems appName="App Name" items={data.navApps} />
              </SidebarContent>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
