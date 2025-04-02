"use client"

import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface TemporaryRegistrationFormProps {
    setStep: (step: number) => void;
    setShowConfirmation: (show: boolean) => void;
    setTipoCadastro: (tipo: string[]) => void;
    tipoCadastro: string[];
    nome: string;
    setNome: (nome: string) => void;
    nomeCrianca: string;
    setNomeCrianca: (nome: string) => void;
    telefone: string;
    setTelefone: (telefone: string) => void;
    handleConfirm: () => void;
    handleEdit: () => void;
    showConfirmation: boolean;
}
export function TemporaryRegistrationForm({ setStep, setShowConfirmation, setTipoCadastro, tipoCadastro, nome, setNome, nomeCrianca, setNomeCrianca, telefone, setTelefone, handleConfirm, handleEdit, showConfirmation }: TemporaryRegistrationFormProps) {
    return (
        <div>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 p-4">
                <div className="order-1 md:order-none mb-4 md:mb-10 md:mr-4">
                    <Image
                        src="/crianca.svg"
                        alt="Imagem de Exemplo"
                        width={100}
                        height={100}
                    />
                </div>

                <div className="w-full max-w-md space-y-8 order-2 md:order-none">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Enviar Dados</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Preencha suas informações para envio dos dados 🚀
                        </p>
                    </div>
                    <Card>
                        <CardContent className="pt-6">
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                setShowConfirmation(true)
                            }} className="space-y-6">
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
                                <div className="space-y-2">
                                    <Label>Tipo de Cadastro</Label>
                                    <RadioGroup value={tipoCadastro[0]} onValueChange={(value) => {
                                        setTipoCadastro([value]) // Atualiza o tipo de cadastro
                                        if (value === "permanente") {
                                            setStep(2) // Muda para o formulário permanente
                                        }
                                    }}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="hoje" id="hoje" />
                                            <Label htmlFor="hoje">Apenas para hoje</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="permanente" id="permanente" />
                                            <Label htmlFor="permanente">Cadastro permanente</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6">
                                    Enviar dados
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

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
        </div>
    )
}