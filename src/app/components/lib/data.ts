export interface Child {
    id: number
    name: string
    age: number
    parent: string
    phone: string
    date: string
    status: "Ativo" | "Inativo"
    allergies: string
    lastAttendance: string
    birthDate?: string
    address?: string
    emergencyContact?: string
    notes?: string
    group?: string
}

export interface ChartDataPoint {
    name: string
    registrations: number
    attendance: number
}

export interface AgeDistribution {
    name: string
    value: number
}

// Mock data for demonstration
export const registrations: Child[] = [
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
        birthDate: "2018-01-15",
        address: "Rua das Flores, 123",
        emergencyContact: "5511988888888",
        notes: "Gosta de desenhar",
        group: "Turma A",
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
        birthDate: "2016-03-22",
        address: "Av. Paulista, 1000",
        emergencyContact: "5511977777777",
        notes: "Alérgica a amendoim",
        group: "Turma B",
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
        birthDate: "2017-07-10",
        address: "Rua Augusta, 500",
        emergencyContact: "5511966666666",
        notes: "Intolerante a lactose",
        group: "Turma A",
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
        birthDate: "2019-11-05",
        address: "Rua Oscar Freire, 200",
        emergencyContact: "5511955555555",
        notes: "",
        group: "Turma C",
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
        birthDate: "2015-09-18",
        address: "Alameda Santos, 800",
        emergencyContact: "5511944444444",
        notes: "Intolerante a glúten",
        group: "Turma B",
    },
]

export const chartData: ChartDataPoint[] = [
    { name: "Jan", registrations: 65, attendance: 80 },
    { name: "Fev", registrations: 59, attendance: 70 },
    { name: "Mar", registrations: 80, attendance: 90 },
    { name: "Abr", registrations: 81, attendance: 85 },
    { name: "Mai", registrations: 56, attendance: 60 },
    { name: "Jun", registrations: 55, attendance: 65 },
]

export const ageDistribution: AgeDistribution[] = [
    { name: "3-5 anos", value: 30 },
    { name: "6-8 anos", value: 45 },
    { name: "9-11 anos", value: 25 },
]

