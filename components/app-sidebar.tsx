
"use client"

import * as React from "react"
import {
  IconDashboard,
  IconUsers,
  IconBook,
  IconSchool,
  IconCalendar,
  IconBell,
  IconSettings,
  IconBuilding,
  IconMessage,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// 🔥 Role-based menu configuration
const menuByRole = {
  admin: [
    { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    { title: "Teachers", url: "/teachers", icon: IconUsers },
    { title: "Students", url: "/students", icon: IconUserCircle },
    { title: "Departments", url: "/departments", icon: IconBuilding },
    { title: "Courses", url: "/courses", icon: IconBook },
    { title: "Schedules", url: "/schedules", icon: IconCalendar },
    { title: "Notifications", url: "/notifications", icon: IconBell },
    { title: "Settings", url: "/settings", icon: IconSettings },
  ],

  teacher: [
    { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    { title: "My Courses", url: "/my-courses", icon: IconBook },
    { title: "My Schedule", url: "/my-schedule", icon: IconCalendar },
    { title: "My Students", url: "/my-students", icon: IconUsers },
    { title: "Announcements", url: "/announcements", icon: IconMessage },
    { title: "Profile Settings", url: "/profile", icon: IconSettings },
  ],

  student: [
    { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    { title: "My Schedule", url: "/my-schedule", icon: IconCalendar },
    { title: "Courses", url: "/courses", icon: IconBook },
    { title: "Departments", url: "/departments", icon: IconBuilding },
    { title: "Notifications", url: "/notifications", icon: IconBell },
    { title: "Profile Settings", url: "/profile", icon: IconSettings },
  ],
}

// 🧠 Simulate a logged user
// You’ll later replace this with data from your AuthContext or Zustand store.
const user = {
  name: "Josué AOGA",
  email: "josh@example.com",
  avatar: "/avatars/josh.jpg",
  role: "student", // 👈 change to 'teacher' or 'student' to test
}

export function AppSidebar({ ...props }) {
  const navMain = menuByRole[user.role] || []

  const navSecondary = [
    { title: "Help", url: "/help", icon: IconMessage },
    { title: "Logout", url: "/logout", icon: IconLogout },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* HEADER */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconSchool className="!size-5 text-primary" />
                <span className="text-base font-semibold">Schedutable</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
