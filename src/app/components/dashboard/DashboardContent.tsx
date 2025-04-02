"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
    PlusCircle,
    Users,
    CalendarIcon,
    UserPlus,
    Search,
    Filter,
    Download,
    Printer,
    Mail,
    RefreshCw,
} from "lucide-react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    BarChart,
    Bar,
} from "recharts"
import { format } from "date-fns"
import { useState, useEffect, useCallback } from "react"

import { ChildrenTable } from "./CriancaTabela"
import { RegisterChildForm } from "./RegistrarCriancaForm"
import { DatePickerWithPresets } from "./Data"
import { toast } from "@/hooks/use-toast"
import { type Child, chartData, ageDistribution, registrations } from "../lib/data"

const COLORS = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b"]

export function DashboardContent() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [filteredRegistrations, setFilteredRegistrations] = useState(registrations)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchById, setSearchById] = useState("")
    const [showInactive, setShowInactive] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // Stats calculations
    const activeChildren = registrations.filter((child) => child.status === "Ativo").length
    const averageAge = (registrations.reduce((sum, child) => sum + child.age, 0) / registrations.length).toFixed(1)
    const lastActivityDate = new Date(Math.max(...registrations.map((r) => new Date(r.lastAttendance).getTime())))
    const childrenPresentOnLastActivity = registrations.filter(
        (r) => r.lastAttendance === format(lastActivityDate, "yyyy-MM-dd"),
    ).length

    const handleSearch = useCallback(() => {
        setIsLoading(true)

        // Simulate API call delay
        setTimeout(() => {
            const filtered = registrations.filter((child) => {
                const matchesSearch =
                    child.name.toLowerCase().includes(searchTerm.toLowerCase()) || child.id.toString().includes(searchById)

                const matchesStatus = showInactive ? true : child.status === "Ativo"

                const matchesDate = selectedDate ? new Date(child.date).toDateString() === selectedDate.toDateString() : true

                const matchesGroup = selectedGroup ? child.group === selectedGroup : true

                return matchesSearch && matchesStatus && matchesDate && matchesGroup
            })

            setFilteredRegistrations(filtered)
            setIsLoading(false)
        }, 500)
    }, [searchTerm, searchById, showInactive, selectedDate, selectedGroup])

    useEffect(() => {
        handleSearch()
    }, [handleSearch])

    const handleStatusChange = (id: number, newStatus: "Ativo" | "Inativo") => {
        // In a real application, this would update the database
        const updatedFiltered = filteredRegistrations.map((child) =>
            child.id === id ? { ...child, status: newStatus } : child,
        )

        setFilteredRegistrations(updatedFiltered)

        toast({
            title: "Status atualizado ✅",
            description: `Status da criança alterado para ${newStatus}.`,
        })
    }

    const handleRegisterChild = (childData: Partial<Child>) => {
        // In a real application, this would add to the database
        const newChild: Child = {
            id: registrations.length + 1,
            name: childData.name || "",
            age: childData.age || 0,
            parent: childData.parent || "",
            phone: childData.phone || "",
            date: childData.date || format(new Date(), "yyyy-MM-dd"),
            status: childData.status || "Ativo",
            allergies: childData.allergies || "",
            lastAttendance: childData.lastAttendance || format(new Date(), "yyyy-MM-dd"),
            birthDate: childData.birthDate,
            address: childData.address,
            emergencyContact: childData.emergencyContact,
            notes: childData.notes,
            group: childData.group,
        }

        // Update the lists (in a real app, this would be handled by a state management solution)
        registrations.push(newChild)

        // Refresh the filtered list
        handleSearch()

        toast({
            title: "Criança cadastrada 🎉",
            description: `${newChild.name} foi cadastrado com sucesso.`,
        })
    }

    const handleExport = (format: string) => {
        toast({
            title: "Exportando dados 📊",
            description: `Exportando lista de crianças em formato ${format}.`,
        })

        // In a real application, this would trigger a download
        console.log(`Exporting data in ${format} format`, filteredRegistrations)
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total de Crianças 👧👦</CardTitle>
                            <Users className="h-4 w-4 text-indigo-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{registrations.length}</div>
                            <p className="text-xs text-muted-foreground">+2.1% em relação ao mês passado</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Crianças Ativas ✅</CardTitle>
                            <UserPlus className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{activeChildren}</div>
                            <p className="text-xs text-muted-foreground">
                                {((activeChildren / registrations.length) * 100).toFixed(1)}% do total
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Média de Idade 🎂</CardTitle>
                            <CalendarIcon className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{averageAge}</div>
                            <p className="text-xs text-muted-foreground">anos</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Última Atividade 📅</CardTitle>
                            <CalendarIcon className="h-4 w-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{format(lastActivityDate, "dd/MM/yyyy")}</div>
                            <p className="text-xs text-muted-foreground">{childrenPresentOnLastActivity} crianças presentes</p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
            >
                <Card>
                    <CardHeader>
                        <CardTitle>📈 Registros e Presenças Mensais</CardTitle>
                        <CardDescription>Acompanhamento de cadastros e frequência</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <RechartsTooltip
                                    formatter={(value, name) => {
                                        return [value, name === "registrations" ? "Registros" : "Presenças"]
                                    }}
                                />
                                <Legend formatter={(value) => (value === "registrations" ? "Registros" : "Presenças")} />
                                <Line type="monotone" dataKey="registrations" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="attendance" stroke="#0ea5e9" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>🍰 Distribuição por Idade</CardTitle>
                        <CardDescription>Faixas etárias das crianças cadastradas</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-center justify-center">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={ageDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {ageDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mb-8"
            >
                <Card>
                    <CardHeader>
                        <CardTitle>📊 Estatísticas de Cadastro</CardTitle>
                        <CardDescription>Visão geral dos cadastros por período</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={[
                                    { name: "Jan", novos: 12, ativos: 45 },
                                    { name: "Fev", novos: 19, ativos: 58 },
                                    { name: "Mar", novos: 15, ativos: 68 },
                                    { name: "Abr", novos: 8, ativos: 72 },
                                    { name: "Mai", novos: 22, ativos: 90 },
                                    { name: "Jun", novos: 14, ativos: 100 },
                                ]}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <RechartsTooltip />
                                <Legend />
                                <Bar dataKey="novos" fill="#4f46e5" name="Novos Cadastros" />
                                <Bar dataKey="ativos" fill="#10b981" name="Total Ativos" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                <Card>
                    <CardHeader className="flex justify-between items-center">
                        <div>
                            <CardTitle>👧👦 Lista de Crianças</CardTitle>
                            <CardDescription>
                                {filteredRegistrations.length} de {registrations.length} crianças
                            </CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <PlusCircle className="h-4 w-4 mr-2" />
                                        Cadastrar
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                        <DialogTitle>✨ Cadastrar Nova Criança</DialogTitle>
                                    </DialogHeader>
                                    <RegisterChildForm onClose={() => setIsDialogOpen(false)} onSubmit={handleRegisterChild} />
                                </DialogContent>
                            </Dialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        <Download className="h-4 w-4 mr-2" />
                                        Exportar
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => handleExport("csv")}>
                                        <Download className="h-4 w-4 mr-2" />
                                        Exportar CSV
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleExport("pdf")}>
                                        <Printer className="h-4 w-4 mr-2" />
                                        Imprimir Lista
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleExport("email")}>
                                        <Mail className="h-4 w-4 mr-2" />
                                        Enviar por E-mail
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <Label htmlFor="searchName">Buscar por Nome</Label>
                                    <div className="relative">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="searchName"
                                            placeholder="Nome da criança"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="searchId">Buscar por ID</Label>
                                    <Input
                                        id="searchId"
                                        placeholder="ID da criança"
                                        value={searchById}
                                        onChange={(e) => setSearchById(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="groupFilter">Filtrar por Turma</Label>
                                    <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Todas as turmas" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todas as turmas</SelectItem>
                                            <SelectItem value="Turma A">Turma A</SelectItem>
                                            <SelectItem value="Turma B">Turma B</SelectItem>
                                            <SelectItem value="Turma C">Turma C</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="dateFilter">Filtrar por Data</Label>
                                    <DatePickerWithPresets date={selectedDate} setDate={setSelectedDate} />
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="showInactive"
                                        checked={showInactive}
                                        onCheckedChange={(checked) => setShowInactive(checked as boolean)}
                                    />
                                    <Label htmlFor="showInactive">Mostrar inativos</Label>
                                </div>
                                <Button onClick={handleSearch} disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                            Buscando...
                                        </>
                                    ) : (
                                        <>
                                            <Filter className="mr-2 h-4 w-4" />
                                            Aplicar Filtros
                                        </>
                                    )}
                                </Button>
                            </div>
                            <Separator />
                        </div>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="flex flex-col items-center">
                                    <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                                    <p className="mt-4 text-muted-foreground">Carregando dados...</p>
                                </div>
                            </div>
                        ) : (
                            <ChildrenTable data={filteredRegistrations} onStatusChange={handleStatusChange} />
                        )}

                        <div className="mt-4 text-sm text-muted-foreground text-center">
                            Mostrando {filteredRegistrations.length} de {registrations.length} crianças
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </>
    )
}

