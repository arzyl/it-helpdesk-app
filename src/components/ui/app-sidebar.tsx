'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {

  const data = [
    {
      versions: ["1.0.1"],
      navMain: [
        {
          title: "IT Helpdesk",
          url: "#",
          items: [
            {
              title: "Job Queue",
              url: "/dashboard/jobqueue"
            },
            {
              title: "Inventory",
              url: "/dashboard/inventory"
            },
            {
              title: "History",
              url: "/dashboard/history"
            }
          ]
        }
      ]
    }
  ];

  return (
    <Sidebar {...props}>
      <SidebarHeader />
      <SidebarContent>
        {data.map((section) =>
          section.navMain.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((itemmenu) => (
                    <SidebarMenuItem key={itemmenu.title}>
                     <Button className="w-full bg-green-900">
                      <a href={itemmenu.url}>{itemmenu.title}</a>
                     </Button>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))
        )}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}