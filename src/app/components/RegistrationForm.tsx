"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import axios from 'axios'

export function RegistrationForm() {
    const [nome, setNome] = useState('')
    const [nomeCrianca, setNomeCrianca] = useState('')
    const [telefone, setTelefone] = useState('')
    const [showConfirmation, setShowConfirmation] = useState(false) // Controla a exibição da notificação
    const [editMode, setEditMode] = useState(false) // Controla o modo de edição

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Exibe a notificação com os dados preenchidos
        setShowConfirmation(true)
    }

    const handleConfirm = async () => {
        try {
            const api_url = process.env.NEXT_PUBLIC_API_URL
            const response = await axios(`${api_url}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                data: { nome, nomeCrianca, telefone }
            })

            console.log(response)

            if (!response.data) {
                throw new Error('Erro ao registrar os dados.')
            }

            const data = response.data
            const generatedId = data.id

            // Pergunta ao usuário se deseja enviar as informações para o WhatsApp
            const sendToWhatsApp = window.confirm(
                `Deseja enviar as informações para o número ${telefone}?`
            )

            if (sendToWhatsApp) {
                // Monta a mensagem que será enviada via WhatsApp
                const message = encodeURIComponent(
                    `Olá ${nome}, seu cadastro foi realizado com sucesso!\n` +
                    `ID do cadastro: ${generatedId}\n` +
                    `Nome da criança: ${nomeCrianca}`
                )

                // URL para enviar a mensagem via WhatsApp
                const whatsappURL = `https://wa.me/${telefone}?text=${message}`

                // Abre o WhatsApp em uma nova aba
                window.open(whatsappURL, '_blank')
            }

            // Fecha a notificação após o envio
            setShowConfirmation(false)
        } catch (error) {
            console.error(error)
            alert('Ocorreu um erro ao enviar os dados. Tente novamente.')
        }
    }

    const handleEdit = () => {
        // Habilita o modo de edição
        setEditMode(true)
        setShowConfirmation(false)
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 p-4">
            {/* Imagem (em cima no mobile, ao lado no desktop) */}
            <div className="order-1 md:order-none mb-1 md:mb-10 md:mr-1">
                <Image
                    src="/crianca.svg"
                    alt="Imagem de Exemplo"
                    width={100}
                    height={100}
                />
            </div>

            {/* Formulário */}
            <div className="w-full max-w-md space-y-8 order-2 md:order-none">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Enviar Dados</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Preencha suas informações para envio dos dados 🚀
                    </p>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="nome" className="text-sm font-medium text-gray-700">
                                    Nome do Responsável
                                </label>
                                <Input
                                    id="nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="João Silva"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="nomeCrianca" className="text-sm font-medium text-gray-700">
                                    Nome da criança
                                </label>
                                <Input
                                    id="nomeCrianca"
                                    value={nomeCrianca}
                                    onChange={(e) => setNomeCrianca(e.target.value)}
                                    placeholder="João Júnior"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="telefone" className="text-sm font-medium text-gray-700">
                                    Telefone
                                </label>
                                <Input
                                    id="telefone"
                                    type="tel"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                    placeholder="5511999999999"
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6">
                                Enviar dados
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Notificação de confirmação */}
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Card className="w-full max-w-md">
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirme os dados</h3>
                            <p className="text-gray-700">
                                <strong>Nome do Responsável:</strong> {nome}
                            </p>
                            <p className="text-gray-700">
                                <strong>Nome da Criança:</strong> {nomeCrianca}
                            </p>
                            <p className="text-gray-700">
                                <strong>Telefone:</strong> {telefone}
                            </p>

                            <div className="mt-6 flex gap-4">
                                <Button
                                    onClick={handleEdit}
                                    className="bg-gray-500 hover:bg-gray-600 text-white"
                                >
                                    Editar
                                </Button>
                                <Button
                                    onClick={handleConfirm}
                                    className="bg-blue-500 hover:bg-blue-600 text-white"
                                >
                                    Confirmar
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}