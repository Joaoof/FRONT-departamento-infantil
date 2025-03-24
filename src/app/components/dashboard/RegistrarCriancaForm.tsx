"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DialogFooter } from "@/components/ui/dialog"
import { DatePickerWithPresets } from "./Data"
import type { Child } from "../lib/data"

interface RegisterChildFormProps {
    onClose: () => void
    onSubmit: (childData: Partial<Child>) => void
}

export function RegisterChildForm({ onClose, onSubmit }: RegisterChildFormProps) {
    const [childName, setChildName] = useState("")
    const [childAge, setChildAge] = useState("")
    const [parentName, setParentName] = useState("")
    const [parentPhone, setParentPhone] = useState("")
    const [allergies, setAllergies] = useState("")
    const [birthDate, setBirthDate] = useState<Date>()
    const [group, setGroup] = useState("")
    const [address, setAddress] = useState("")
    const [emergencyContact, setEmergencyContact] = useState("")
    const [notes, setNotes] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const childData: Partial<Child> = {
            name: childName,
            age: Number.parseInt(childAge),
            parent: parentName,
            phone: parentPhone,
            allergies,
            birthDate: birthDate ? format(birthDate, "yyyy-MM-dd") : undefined,
            group,
            address,
            emergencyContact,
            notes,
            status: "Ativo",
            date: format(new Date(), "yyyy-MM-dd"),
            lastAttendance: format(new Date(), "yyyy-MM-dd"),
        }

        onSubmit(childData)
        onClose()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Tabs defaultValue="basic">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">Informações Básicas 📋</TabsTrigger>
                    <TabsTrigger value="additional">Informações Adicionais ➕</TabsTrigger>
                </TabsList>
                <TabsContent value="basic" className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="childName">Nome da Criança* 👶</Label>
                            <Input id="childName" value={childName} onChange={(e) => setChildName(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="childAge">Idade* 🎂</Label>
                            <Input
                                id="childAge"
                                type="number"
                                value={childAge}
                                onChange={(e) => setChildAge(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="birthDate">Data de Nascimento* 📅</Label>
                        <DatePickerWithPresets date={birthDate} setDate={setBirthDate} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="parentName">Nome do Responsável* 👨‍👩‍👧</Label>
                            <Input id="parentName" value={parentName} onChange={(e) => setParentName(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="parentPhone">Telefone do Responsável* 📱</Label>
                            <Input
                                id="parentPhone"
                                value={parentPhone}
                                onChange={(e) => setParentPhone(e.target.value)}
                                placeholder="5511999999999"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="group">Turma 👨‍👩‍👧‍👦</Label>
                        <Select value={group} onValueChange={setGroup}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione uma turma" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Turma A">Turma A</SelectItem>
                                <SelectItem value="Turma B">Turma B</SelectItem>
                                <SelectItem value="Turma C">Turma C</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </TabsContent>

                <TabsContent value="additional" className="space-y-4 pt-4">
                    <div>
                        <Label htmlFor="address">Endereço 🏠</Label>
                        <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div>
                        <Label htmlFor="emergencyContact">Contato de Emergência 🚨</Label>
                        <Input
                            id="emergencyContact"
                            value={emergencyContact}
                            onChange={(e) => setEmergencyContact(e.target.value)}
                            placeholder="5511999999999"
                        />
                    </div>

                    <div>
                        <Label htmlFor="allergies">Alergias ⚠️</Label>
                        <Input id="allergies" value={allergies} onChange={(e) => setAllergies(e.target.value)} />
                    </div>

                    <div>
                        <Label htmlFor="notes">Observações 📝</Label>
                        <Input id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
                    </div>
                </TabsContent>
            </Tabs>

            <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>
                    Cancelar
                </Button>
                <Button type="submit">Cadastrar ✅</Button>
            </DialogFooter>
        </form>
    )
}

