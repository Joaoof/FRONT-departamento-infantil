"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { HomeIcon, MessageCircle, CalendarDays, FileText, Settings, BellRing, LogOut, Mail } from "lucide-react"

interface AppSidebarProps {
    activeView: string
    setActiveView: (view: string) => void
}

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
    return (
        <Sidebar className="border-r">
            <SidebarHeader className="flex justify-center items-center py-4">
                <div className="flex flex-col items-center gap-2">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg?height=50&width=50" alt="Logo" />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <h2 className="text-lg font-bold">Sistema Crianças 👶</h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => setActiveView("dashboard")} isActive={activeView === "dashboard"}>
                            <HomeIcon className="h-4 w-4 mr-2" />
                            Dashboard
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => setActiveView("communications")}
                            isActive={activeView === "communications"}
                        >
                            <Mail className="h-4 w-4 mr-2" />
                            Comunicados 📧
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => setActiveView("messages")} isActive={activeView === "messages"}>
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Mensagens 💬
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <CalendarDays className="h-4 w-4 mr-2" />
                            Agenda 📅
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <FileText className="h-4 w-4 mr-2" />
                            Relatórios 📊
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <BellRing className="h-4 w-4 mr-2" />
                            Notificações 🔔
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarSeparator />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Settings className="h-4 w-4 mr-2" />
                            Configurações ⚙️
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <LogOut className="h-4 w-4 mr-2" />
                            Sair 🚪
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-4">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">Admin 👨‍💼</p>
                        <p className="text-xs text-muted-foreground">admin@sistema.com</p>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

