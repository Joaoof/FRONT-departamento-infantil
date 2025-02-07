"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import axios from 'axios'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Camera } from 'lucide-react'

export function RegistrationForm() {

    const [step, setStep] = useState(1)
    const [showLoginModal, setShowLoginModal] = useState(false)

    // Step 1 (cadastro pra hoje)
    const [nome, setNome] = useState('')
    const [nomeCrianca, setNomeCrianca] = useState('')
    const [idade, setIdade] = useState('')
    const [telefone, setTelefone] = useState('+55')
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [tipoCadastro, setTipoCadastro] = useState('hoje')


    // Step 2 (cadastro permanente)
    // Step 2 fields
    const [email, setEmail] = useState('')
    const [endereco, setEndereco] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [cep, setCep] = useState('')
    const [alergias, setAlergias] = useState('')
    const [observacoes, setObservacoes] = useState('')
    const [fotoCrianca, setFotoCrianca] = useState<File | null>(null)
    const [fotoPreview, setFotoPreview] = useState('')

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFotoCrianca(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setFotoPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    // Ao submeter o formulário, apenas mostra a modal de confirmação com os dados preenchidos
    const handleStep1Submit = (e: React.FormEvent) => {
        e.preventDefault()
        if (tipoCadastro === 'permanente') {
            setStep(2)
        } else {
            console.log('Cadastro temporário', { nome, nomeCrianca, telefone, tipoCadastro });

        }
        setShowConfirmation(true)
    }

    const handleStep2Submit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle permanent registration submission
        console.log('Cadastro permanente:', {
            nome,
            nomeCrianca,
            idade,
            telefone,
            email,
            endereco,
            cidade,
            estado,
            cep,
            alergias,
            observacoes,
            fotoCrianca
        })
    }


    if (step === 2) {
        return (
            <div className="min-h-screen bg-blue-100 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-purple-900">Cadastro Permanente</h2>
                        <p className="mt-2 text-sm text-gray-600 font-thin">
                            Complete as informações adicionais para finalizar o cadastro permanente
                        </p>
                    </div>

                    <Card>
                        <CardContent className="pt-6">
                            <form onSubmit={handleStep2Submit} className="space-y-6">
                                <div className="space-y-6">
                                    {/* Foto da Criança */}
                                    <div className="space-y-2">
                                        <Label className='font-serif'>Foto da Criança</Label>
                                        <div className="flex items-center justify-center">
                                            <div className="relative w-40 h-40 border-2 border-dashed rounded-lg flex items-center justify-center">
                                                {fotoPreview ? (
                                                    <Image
                                                        src={fotoPreview || "/placeholder.svg"}
                                                        alt="Preview"
                                                        fill
                                                        className="object-cover rounded-lg bg-blue-50"

                                                    />
                                                ) : (
                                                    <div className="text-center">
                                                        <Camera className="mx-auto h-12 w-12 text-gray-400" />
                                                        <span className="mt-2 block text-sm text-gray-600 font-serif">
                                                            Clique para adicionar foto
                                                        </span>
                                                    </div>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Informações de Contato */}
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label className='font-serif' htmlFor="email">E-mail</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className='bg-blue-50'
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className='font-serif' htmlFor="cep">CEP</Label>
                                            <Input
                                                id="cep"
                                                value={cep}
                                                onChange={(e) => setCep(e.target.value)}
                                                required
                                                className='bg-blue-50'
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className='font-serif' htmlFor="endereco">Endereço</Label>
                                        <Input
                                            id="endereco"
                                            value={endereco}
                                            onChange={(e) => setEndereco(e.target.value)}
                                            required
                                            className='bg-blue-50'

                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label className='font-serif' htmlFor="cidade">Cidade</Label>
                                            <Input
                                                id="cidade"
                                                value={cidade}
                                                onChange={(e) => setCidade(e.target.value)}
                                                required
                                                className='bg-blue-50'
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className='font-serif' htmlFor="estado">Estado</Label>
                                            <Input
                                                id="estado"
                                                value={estado}
                                                onChange={(e) => setEstado(e.target.value)}
                                                required
                                                className='bg-blue-50'

                                            />
                                        </div>
                                    </div>

                                    {/* Informações Adicionais */}
                                    <div className="space-y-2">
                                        <Label className='font-serif' htmlFor="alergias">Alergias e Restrições Alimentares</Label>
                                        <Textarea
                                            id="alergias"
                                            value={alergias}
                                            onChange={(e) => setAlergias(e.target.value)}
                                            placeholder="Liste todas as alergias e restrições alimentares"
                                            className='bg-blue-50'

                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className='font-serif' htmlFor="observacoes">Observações Adicionais</Label>
                                        <Textarea
                                            id="observacoes"
                                            value={observacoes}
                                            onChange={(e) => setObservacoes(e.target.value)}
                                            placeholder="Informações importantes que precisamos saber"
                                            className='bg-blue-50'

                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setStep(1)}
                                        className="flex-1"
                                    >
                                        Voltar
                                    </Button>
                                    <Button type="submit" className="flex-1">
                                        Finalizar Cadastro
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    // Ao clicar em "Confirmar", abre imediatamente o pop-up e processa o envio
    const handleConfirm = async () => {

        const sanitizedPhone = telefone.replace(/\s+/g, '');

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
                { nome, nomeCrianca, telefone: sanitizedPhone },
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
            const whatsappURL = `https://wa.me/${sanitizedPhone}?text=${message}`

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

    const toggleLoginModal = () => {
        setShowLoginModal(!showLoginModal)
    }

    interface NavBarProps {
        onLoginClick: () => void;
    }

    return (
        <div>
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
                            <form onSubmit={handleStep1Submit} className="space-y-6">
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
                                    <RadioGroup value={tipoCadastro} onValueChange={setTipoCadastro}>
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
        </div>
    )
}

