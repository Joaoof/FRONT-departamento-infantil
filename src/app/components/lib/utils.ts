import { type ClassValue, clsx } from "clsx"
import { format, isToday, isYesterday } from "date-fns"
import { ptBR } from "date-fns/locale"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatPhoneNumber(phone: string) {
    if (!phone) return ""
    // Format Brazilian phone numbers: (11) 99999-9999
    return phone.replace(/^55(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
}

export function formatDate(dateString: string) {
    const date = new Date(dateString)
    if (isToday(date)) {
        return "Hoje"
    } else if (isYesterday(date)) {
        return "Ontem"
    }
    return format(date, "dd/MM/yyyy", { locale: ptBR })
}

