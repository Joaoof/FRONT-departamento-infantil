"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Mail, Search, RefreshCw } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { registrations } from "../lib/data"

export function CommunicationContent() {
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [selectedRecipients, setSelectedRecipients] = useState<"all" | "active" | "custom">("all")
    const [selectedChildren, setSelectedChildren] = useState<number[]>([])

    const handleSendCommunication = () => {
        toast({
            title: "Comunicado enviado ✉️",
            description: `Comunicado enviado para ${selectedRecipients === "all"
                ? "todos os responsáveis"
                : selectedRecipients === "active"
                    ? "responsáveis das crianças ativas"
                    : `${selectedChildren.length} responsáveis selecionados`
                }`,
        })
    }

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card>
                    <CardHeader>
                        <CardTitle>📧 Comunicado Geral</CardTitle>
                        <CardDescription>Envie um comunicado para os responsáveis das crianças</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="recipients">Destinatários 👥</Label>
                            <Select
                                value={selectedRecipients}
                                onValueChange={(value: "all" | "active" | "custom") => setSelectedRecipients(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione os destinatários" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos os responsáveis</SelectItem>
                                    <SelectItem value="active">Somente crianças ativas</SelectItem>
                                    <SelectItem value="custom">Seleção personalizada</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {selectedRecipients === "custom" && (
                            <div>
                                <Label>Selecione as crianças 👶</Label>
                                <div className="border rounded-md p-3 h-60 overflow-y-auto mt-2">
                                    {registrations.map((child) => (
                                        <div key={child.id} className="flex items-center space-x-2 py-2">
                                            <Checkbox
                                                id={`child-${child.id}`}
                                                checked={selectedChildren.includes(child.id)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setSelectedChildren([...selectedChildren, child.id])
                                                    } else {
                                                        setSelectedChildren(selectedChildren.filter((id) => id !== child.id))
                                                    }
                                                }}
                                            />
                                            <Label htmlFor={`child-${child.id}`} className="flex-1 cursor-pointer">
                                                {child.name} - Responsável: {child.parent}
                                            </Label>
                                            <Badge variant={child.status === "Ativo" ? "default" : "destructive"}>{child.status}</Badge>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">{selectedChildren.length} crianças selecionadas</p>
                            </div>
                        )}

                        <div>
                            <Label htmlFor="subject">Assunto 📝</Label>
                            <Input
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Informe o assunto do comunicado"
                            />
                        </div>

                        <div>
                            <Label htmlFor="message">Mensagem 💬</Label>
                            <Textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Digite a mensagem do comunicado"
                                className="min-h-32"
                            />
                        </div>

                        <div className="pt-4 flex justify-end space-x-2">
                            <Button variant="outline">Salvar rascunho 💾</Button>
                            <Button onClick={handleSendCommunication} disabled={!subject || !message}>
                                <Mail className="h-4 w-4 mr-2" />
                                Enviar comunicado
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>📨 Comunicados Recentes</CardTitle>
                        <CardDescription>Histórico dos últimos comunicados enviados</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                {
                                    id: 1,
                                    subject: "Festa Junina 🎉",
                                    date: "10/06/2023",
                                    recipients: "Todos",
                                    status: "Enviado",
                                    preview: "Informamos que nossa festa junina será realizada no dia 24/06/2023...",
                                },
                                {
                                    id: 2,
                                    subject: "Reunião de Pais 👨‍👩‍👧",
                                    date: "25/05/2023",
                                    recipients: "Ativos",
                                    status: "Enviado",
                                    preview: "Convidamos para a reunião de pais que acontecerá no próximo dia...",
                                },
                                {
                                    id: 3,
                                    subject: "Vacinação 💉",
                                    date: "15/05/2023",
                                    recipients: "Personalizado (15)",
                                    status: "Enviado",
                                    preview: "Informamos que a campanha de vacinação acontecerá na próxima semana...",
                                },
                            ].map((comm) => (
                                <div key={comm.id} className="border rounded-md p-4 hover:bg-muted/40 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-medium">{comm.subject}</h4>
                                            <p className="text-sm text-muted-foreground">Enviado para: {comm.recipients}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm">{comm.date}</p>
                                            <Badge variant="outline" className="mt-1">
                                                {comm.status}
                                            </Badge>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{comm.preview}</p>
                                    <div className="flex justify-end mt-2 space-x-2">
                                        <Button variant="ghost" size="sm">
                                            <Search className="h-4 w-4 mr-1" /> Ver
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <RefreshCw className="h-4 w-4 mr-1" /> Reenviar
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

