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
    const [telefone, setTelefone] = useState('+55')
    const [showConfirmation, setShowConfirmation] = useState(false)

    // Ao submeter o formulário, apenas mostra a modal de confirmação com os dados preenchidos
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setShowConfirmation(true)
    }

    // Ao clicar em "Confirmar", abre imediatamente o pop-up e processa o envio
    const handleConfirm = async () => {
        // Abre o pop-up imediatamente (ação diretamente disparada pelo clique do usuário)
        const popup = window.open('', '_blank')
        if (!popup) {
            alert('Popup bloqueado pelo navegador. Por favor, permita pop-ups para este site.')
            return
        }
        try {
            const api_url = process.env.NEXT_PUBLIC_API_URL
            const response = await axios.post(
                `${api_url}/api/register`,
                { nome, nomeCrianca, telefone },
                { headers: { 'Content-Type': 'application/json' } }
            )

            if (!response.data) {
                throw new Error('Erro ao registrar os dados.')
            }

            const data = response.data
            const generatedId = data.id

            // Monta a mensagem para o WhatsApp
            const message = encodeURIComponent(
                `Olá ${nome}, seu cadastro foi realizado com sucesso!\n` +
                `ID do cadastro: ${generatedId}\n` +
                `Nome da criança: ${nomeCrianca}`
            )
            const whatsappURL = `https://wa.me/${telefone}?text=${message}`

            // Atualiza a URL do pop-up para redirecionar para o WhatsApp
            popup.location.href = whatsappURL

            // Fecha a modal de confirmação
            setShowConfirmation(false)
        } catch (error) {
            console.error(error)
            alert('Ocorreu um erro ao enviar os dados. Tente novamente.')
            popup.close()
        }
    }

    // Permite voltar à edição dos dados
    const handleEdit = () => {
        setShowConfirmation(false)
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 p-4">
            {/* Imagem (em cima no mobile, ao lado no desktop) */}
            <div className="order-1 md:order-none mb-4 md:mb-10 md:mr-4">
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
                                    Nome da Criança
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

            {/* Modal de Confirmação */}
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Card className="w-full max-w-md mx-4">
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirme seus Dados</h3>
                            <p className="text-gray-700 mb-2">
                                <strong>Nome do Responsável:</strong> {nome}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>Nome da Criança:</strong> {nomeCrianca}
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Telefone:</strong> {telefone}
                            </p>
                            <p className="text-gray-800 mb-6">
                                Deseja enviar os dados para o número <span className="font-semibold">{telefone}</span>?
                            </p>
                            <div className="flex justify-end gap-4">
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
