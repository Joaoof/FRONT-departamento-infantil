"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar } from "@/components/ui/calendar"
import {
    PhoneIcon as WhatsappIcon,
    PlusCircle,
    Users,
    CalendarIcon,
    UserPlus,
    Search,
    MoreVertical,
    Filter,
    Download,
    Printer,
    Mail,
} from "lucide-react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Mock data for demonstration
const registrations = [
    {
        id: 1,
        name: "João Silva",
        age: 5,
        parent: "Maria Silva",
        phone: "5511999999999",
        date: "2023-06-15",
        status: "Ativo",
        allergies: "Nenhuma",
        lastAttendance: "2023-06-10",
    },
    {
        id: 2,
        name: "Ana Oliveira",
        age: 7,
        parent: "Carlos Oliveira",
        phone: "5511888888888",
        date: "2023-06-15",
        status: "Ativo",
        allergies: "Amendoim",
        lastAttendance: "2023-06-12",
    },
    {
        id: 3,
        name: "Pedro Santos",
        age: 6,
        parent: "Lucia Santos",
        phone: "5511777777777",
        date: "2023-05-20",
        status: "Inativo",
        allergies: "Lactose",
        lastAttendance: "2023-05-28",
    },
    {
        id: 4,
        name: "Mariana Costa",
        age: 4,
        parent: "Roberto Costa",
        phone: "5511666666666",
        date: "2023-04-10",
        status: "Ativo",
        allergies: "Nenhuma",
        lastAttendance: "2023-06-14",
    },
    {
        id: 5,
        name: "Lucas Ferreira",
        age: 8,
        parent: "Patricia Ferreira",
        phone: "5511555555555",
        date: "2023-03-05",
        status: "Ativo",
        allergies: "Glúten",
        lastAttendance: "2023-06-11",
    },
]

const chartData = [
    { name: "Jan", registrations: 65, attendance: 80 },
    { name: "Feb", registrations: 59, attendance: 70 },
    { name: "Mar", registrations: 80, attendance: 90 },
    { name: "Apr", registrations: 81, attendance: 85 },
    { name: "May", registrations: 56, attendance: 60 },
    { name: "Jun", registrations: 55, attendance: 65 },
]

const ageDistribution = [
    { name: "3-5 anos", value: 30 },
    { name: "6-8 anos", value: 45 },
    { name: "9-11 anos", value: 25 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const ChildrenTable = ({ data, onStatusChange }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Idade</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Data de Cadastro</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Presença</TableHead>
                <TableHead>Ações</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((child) => (
                <TableRow key={child.id}>
                    <TableCell className="font-medium">{child.name}</TableCell>
                    <TableCell>{child.age}</TableCell>
                    <TableCell>{child.parent}</TableCell>
                    <TableCell>{format(new Date(child.date), "dd/MM/yyyy")}</TableCell>
                    <TableCell>
                        <Select defaultValue={child.status} onValueChange={(value) => onStatusChange(child.id, value)}>
                            <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Ativo">Ativo</SelectItem>
                                <SelectItem value="Inativo">Inativo</SelectItem>
                            </SelectContent>
                        </Select>
                    </TableCell>
                    <TableCell>{format(new Date(child.lastAttendance), "dd/MM/yyyy")}</TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => sendWhatsAppMessage(child.phone)}>
                                    <WhatsappIcon className="mr-2 h-4 w-4" /> Enviar WhatsApp
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => viewChildDetails(child.id)}>
                                    <Search className="mr-2 h-4 w-4" /> Ver Detalhes
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => editChild(child.id)}>Editar</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
)

const sendWhatsAppMessage = (phone) => {
    const message = encodeURIComponent(
        "Olá! Gostaríamos de confirmar a presença do seu filho na nossa próxima atividade.",
    )
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
}

const viewChildDetails = (id) => {
    console.log(`Viewing details for child with id: ${id}`)
    // Implement view details functionality
}

const editChild = (id) => {
    console.log(`Editing child with id: ${id}`)
    // Implement edit functionality
}

const RegisterChildForm = ({ onClose }) => {
    const [childName, setChildName] = useState("")
    const [childAge, setChildAge] = useState("")
    const [parentName, setParentName] = useState("")
    const [parentPhone, setParentPhone] = useState("")
    const [allergies, setAllergies] = useState("")
    const [birthDate, setBirthDate] = useState<Date>()

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send this data to your backend
        console.log({ childName, childAge, parentName, parentPhone, allergies, birthDate })
        onClose()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="childName">Nome da Criança</Label>
                <Input id="childName" value={childName} onChange={(e) => setChildName(e.target.value)} required />
            </div>
            <div>
                <Label htmlFor="childAge">Idade</Label>
                <Input id="childAge" type="number" value={childAge} onChange={(e) => setChildAge(e.target.value)} required />
            </div>
            <div>
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Calendar
                    mode="single"
                    selected={birthDate}
                    onSelect={setBirthDate}
                    className="rounded-md border"
                    locale={ptBR}
                />
            </div>
            <div>
                <Label htmlFor="parentName">Nome do Responsável</Label>
                <Input id="parentName" value={parentName} onChange={(e) => setParentName(e.target.value)} required />
            </div>
            <div>
                <Label htmlFor="parentPhone">Telefone do Responsável</Label>
                <Input id="parentPhone" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} required />
            </div>
            <div>
                <Label htmlFor="allergies">Alergias</Label>
                <Input id="allergies" value={allergies} onChange={(e) => setAllergies(e.target.value)} />
            </div>
            <Button type="submit">Cadastrar</Button>
        </form>
    )
}

export default function EnhancedAdminDashboard() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [filteredRegistrations, setFilteredRegistrations] = useState(registrations)

    const [searchTerm, setSearchTerm] = useState("")
    const [searchById, setSearchById] = useState("")
    const [showInactive, setShowInactive] = useState(false)

    const handleSearch = useCallback(() => {
        const filtered = registrations.filter((child) => {
            const matchesSearch =
                child.name.toLowerCase().includes(searchTerm.toLowerCase()) || child.id.toString().includes(searchById)
            const matchesStatus = showInactive ? true : child.status === "Ativo"
            const matchesDate = selectedDate ? new Date(child.date).toDateString() === selectedDate.toDateString() : true

            return matchesSearch && matchesStatus && matchesDate
        })
        setFilteredRegistrations(filtered)
    }, [searchTerm, searchById, showInactive, selectedDate])

    useEffect(() => {
        handleSearch()
    }, [handleSearch])

    const handleStatusChange = (id, newStatus) => {
        const updatedRegistrations = registrations.map((child) =>
            child.id === id ? { ...child, status: newStatus } : child,
        )
        setFilteredRegistrations(updatedRegistrations)
    }

    const handleDateSelect = useCallback(
        (date: Date | undefined) => {
            setSelectedDate(date)
            handleSearch()
        },
        [handleSearch],
    )

    useEffect(() => {
        // Initial filter
        handleDateSelect(selectedDate)
    }, [selectedDate, handleDateSelect])

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-center mb-8"
            >
                <h1 className="text-4xl font-bold text-purple-800">Painel de Administração</h1>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total de Crianças</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
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
                            <CardTitle className="text-sm font-medium">Crianças Ativas</CardTitle>
                            <UserPlus className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {registrations.filter((child) => child.status === "Ativo").length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {(
                                    (registrations.filter((child) => child.status === "Ativo").length / registrations.length) *
                                    100
                                ).toFixed(1)}
                                % do total
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
                            <CardTitle className="text-sm font-medium">Média de Idade</CardTitle>
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {(registrations.reduce((sum, child) => sum + child.age, 0) / registrations.length).toFixed(1)}
                            </div>
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
                            <CardTitle className="text-sm font-medium">Última Atividade</CardTitle>
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {format(
                                    new Date(Math.max(...registrations.map((r) => new Date(r.lastAttendance).getTime()))),
                                    "dd/MM/yyyy",
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {
                                    registrations.filter(
                                        (r) =>
                                            r.lastAttendance ===
                                            format(
                                                new Date(Math.max(...registrations.map((r) => new Date(r.lastAttendance).getTime()))),
                                                "yyyy-MM-dd",
                                            ),
                                    ).length
                                }{" "}
                                crianças presentes
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Registros e Presenças Mensais</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="registrations" stroke="#8884d8" name="Registros" />
                                <Line type="monotone" dataKey="attendance" stroke="#82ca9d" name="Presenças" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Distribuição por Idade</CardTitle>
                    </CardHeader>
                    <CardContent>
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
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <Card>
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle>Lista de Crianças</CardTitle>
                        <div className="flex space-x-2">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>
                                        <PlusCircle className="h-4 w-4 mr-2" />
                                        Cadastrar Criança
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Cadastrar Nova Criança</DialogTitle>
                                    </DialogHeader>
                                    <RegisterChildForm onClose={() => { }} />
                                </DialogContent>
                            </Dialog>
                            <Button variant="outline">
                                <Filter className="h-4 w-4 mr-2" />
                                Filtrar
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        <Download className="h-4 w-4 mr-2" />
                                        Exportar
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <Download className="h-4 w-4 mr-2" />
                                        Exportar CSV
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Printer className="h-4 w-4 mr-2" />
                                        Imprimir Lista
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Mail className="h-4 w-4 mr-2" />
                                        Enviar por E-mail
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 mb-4">
                            <div className="flex flex-wrap gap-4">
                                <div className="flex-1 min-w-[200px]">
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
                                <div className="flex-1 min-w-[200px]">
                                    <Label htmlFor="searchId">Buscar por ID</Label>
                                    <Input
                                        id="searchId"
                                        placeholder="ID da criança"
                                        value={searchById}
                                        onChange={(e) => setSearchById(e.target.value)}
                                    />
                                </div>
                                <div className="flex-1 min-w-[200px]">
                                    <Label htmlFor="dateFilter">Filtrar por Data</Label>
                                    <Calendar
                                        id="dateFilter"
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={handleDateSelect}
                                        className="rounded-md border"
                                        locale={ptBR}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="showInactive"
                                    checked={showInactive}
                                    onCheckedChange={(checked) => setShowInactive(checked as boolean)}
                                />
                                <Label htmlFor="showInactive">Mostrar inativos</Label>
                            </div>
                            <Button onClick={handleSearch}>Aplicar Filtros</Button>
                        </div>
                        <ChildrenTable data={filteredRegistrations} onStatusChange={handleStatusChange} />
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

