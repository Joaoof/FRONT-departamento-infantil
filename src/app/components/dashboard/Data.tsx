"use client"

import { format, subDays } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarPlus2Icon as CalendarIcon2 } from "lucide-react"

export function DatePickerWithPresets({
    date,
    setDate,
}: {
    date: Date | undefined
    setDate: (date: Date | undefined) => void
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon2 className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} locale={ptBR} initialFocus />
                <div className="p-3 border-t border-border">
                    <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start text-left" onClick={() => setDate(new Date())}>
                            Hoje
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-left"
                            onClick={() => setDate(subDays(new Date(), 1))}
                        >
                            Ontem
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-left" onClick={() => setDate(undefined)}>
                            Limpar
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

