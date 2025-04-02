"use client"

import {
    AlertCircle,
    ArrowUpDown,
    CheckCircle2,
    ChevronDown,
    MoreVertical,
    PhoneIcon,
    Search,
    XCircle,
} from "lucide-react"
import { useMemo,useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"

import type { Child } from "../lib/data"
import { formatDate } from "../lib/utils"

// Components
const StatusBadge = ({ status }: { status: "Ativo" | "Inativo" }) => {
    const STATUS_COLORS = {
        Ativo: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        Inativo: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    }

    return (
        <Badge variant="outline" className={STATUS_COLORS[status]}>
            {status === "Ativo" ? <CheckCircle2 className="mr-1 h-3 w-3" /> : <XCircle className="mr-1 h-3 w-3" />}
            {status}
        </Badge>
    )
}

export function ChildrenTable({
    data,
    onStatusChange,
}: {
    data: Child[]
    onStatusChange: (id: number, status: "Ativo" | "Inativo") => void
}) {
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Child
        direction: "ascending" | "descending"
    } | null>(null)

    const sortedData = useMemo(() => {
        const sortableData = [...data]
        if (sortConfig !== null) {
            sortableData.sort((a, b) => {
                if (
                    sortConfig &&
                    a[sortConfig.key] !== undefined &&
                    b[sortConfig.key] !== undefined &&
                    a[sortConfig.key] !== null &&
                    b[sortConfig.key] !== null &&
                    (a[sortConfig.key]?.toString() ?? "") < (b[sortConfig.key]?.toString() ?? "")
                ) {
                    return sortConfig.direction === "ascending" ? -1 : 1
                }
                if (
                    sortConfig &&
                    a[sortConfig.key] !== undefined &&
                    b[sortConfig.key] !== undefined &&
                    a[sortConfig.key] !== null &&
                    b[sortConfig.key] !== null &&
                    (a[sortConfig.key]?.toString() ?? "") > (b[sortConfig.key]?.toString() ?? "")
                ) {
                    return sortConfig.direction === "ascending" ? 1 : -1
                }
                return 0
            })
        }
        return sortableData
    }, [data, sortConfig])

    const requestSort = (key: keyof Child) => {
        let direction: "ascending" | "descending" = "ascending"
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending"
        }
        setSortConfig({ key, direction })
    }

    const getSortIcon = (columnName: keyof Child) => {
        if (sortConfig?.key !== columnName) {
            return <ArrowUpDown className="ml-2 h-4 w-4" />
        }
        return sortConfig.direction === "ascending" ? (
            <ChevronDown className="ml-2 h-4 w-4" />
        ) : (
            <ChevronDown className="ml-2 h-4 w-4 rotate-180" />
        )
    }

    const sendWhatsAppMessage = (phone: string, name: string) => {
        const message = encodeURIComponent(
            `Olá! Gostaríamos de confirmar a presença de ${name} na nossa próxima atividade.`,
        )
        window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
        toast({
            title: "Mensagem enviada 📱",
            description: `Redirecionando para WhatsApp para enviar mensagem para responsável de ${name}.`,
        })
    }

    const viewChildDetails = (child: Child) => {
        console.log(`Viewing details for child:`, child)
        toast({
            title: "Detalhes da criança 👀",
            description: `Visualizando detalhes de ${child.name}.`,
        })
    }

    const editChild = (child: Child) => {
        console.log(`Editing child:`, child)
        toast({
            title: "Editar criança ✏️",
            description: `Editando informações de ${child.name}.`,
        })
    }

    return (
        <div className="rounded-md border overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="cursor-pointer" onClick={() => requestSort("name")}>
                            <div className="flex items-center">
                                Nome
                                {getSortIcon("name")}
                            </div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => requestSort("age")}>
                            <div className="flex items-center">
                                Idade
                                {getSortIcon("age")}
                            </div>
                        </TableHead>
                        <TableHead>Responsável</TableHead>
                        <TableHead className="cursor-pointer" onClick={() => requestSort("date")}>
                            <div className="flex items-center">
                                Data de Cadastro
                                {getSortIcon("date")}
                            </div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => requestSort("status")}>
                            <div className="flex items-center">
                                Status
                                {getSortIcon("status")}
                            </div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => requestSort("lastAttendance")}>
                            <div className="flex items-center">
                                Última Presença
                                {getSortIcon("lastAttendance")}
                            </div>
                        </TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedData.length > 0 ? (
                        sortedData.map((child) => (
                            <TableRow key={child.id}>
                                <TableCell className="font-medium">{child.name}</TableCell>
                                <TableCell>{child.age} anos</TableCell>
                                <TableCell>{child.parent}</TableCell>
                                <TableCell>{formatDate(child.date)}</TableCell>
                                <TableCell>
                                    <Select
                                        defaultValue={child.status}
                                        onValueChange={(value: "Ativo" | "Inativo") => onStatusChange(child.id, value)}
                                    >
                                        <SelectTrigger className="w-[110px]">
                                            <SelectValue placeholder="Status">
                                                <StatusBadge status={child.status} />
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Ativo">
                                                <div className="flex items-center">
                                                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                                    Ativo
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="Inativo">
                                                <div className="flex items-center">
                                                    <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                                    Inativo
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>{formatDate(child.lastAttendance)}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Abrir menu</span>
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => sendWhatsAppMessage(child.phone, child.name)}>
                                                <PhoneIcon className="mr-2 h-4 w-4" /> Enviar WhatsApp
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => viewChildDetails(child)}>
                                                <Search className="mr-2 h-4 w-4" /> Ver Detalhes
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => editChild(child)}>Editar</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                                <div className="flex flex-col items-center justify-center text-muted-foreground">
                                    <AlertCircle className="h-8 w-8 mb-2" />
                                    <p>Nenhuma criança encontrada 😕</p>
                                    <p className="text-sm">Tente ajustar os filtros ou cadastre uma nova criança</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

