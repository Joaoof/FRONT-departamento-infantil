"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { RefreshCw } from "lucide-react"
import { toast } from "@/hooks/use-toast"

import { AppSidebar } from "../components/app-siderbar"
import { DashboardContent } from "../components/dashboard/DashboardContent"
import { CommunicationContent } from "../components/comunicacao/ComunicaoContent"

export default function EnhancedAdminDashboard() {
    const [activeView, setActiveView] = useState("dashboard")
    const [isLoading, setIsLoading] = useState(false)

    const handleRefresh = () => {
        setIsLoading(true)

        // Simulate API call delay
        setTimeout(() => {
            setIsLoading(false)

            toast({
                title: "Dados atualizados 🔄",
                description: "Os dados foram atualizados com sucesso.",
            })
        }, 800)
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <AppSidebar activeView={activeView} setActiveView={setActiveView} />

                {/* Conteúdo principal */}
                <div className="flex-1 p-4 md:p-8 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-x-hidden">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 dark:text-indigo-300">
                                {activeView === "dashboard"
                                    ? "Painel de Administração 📊"
                                    : activeView === "communications"
                                        ? "Comunicados 📧"
                                        : "Mensagens 💬"}
                            </h1>
                            <p className="text-muted-foreground">
                                {activeView === "dashboard"
                                    ? "Gerencie cadastros e acompanhe estatísticas"
                                    : activeView === "communications"
                                        ? "Envie comunicados para os responsáveis"
                                        : "Sistema de mensagens diretas"}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                                Atualizar
                            </Button>
                            <SidebarTrigger className="md:hidden" />
                        </div>
                    </div>

                    {activeView === "dashboard" && (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <DashboardContent />
                        </motion.div>
                    )}

                    {activeView === "communications" && (
                        <motion.div
                            key="communications"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CommunicationContent />
                        </motion.div>
                    )}

                    {activeView === "messages" && (
                        <motion.div
                            key="messages"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                        </motion.div>
                    )}
                </div>
            </div>
        </SidebarProvider>
    )
}

