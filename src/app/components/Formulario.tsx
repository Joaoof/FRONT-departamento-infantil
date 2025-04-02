"use client"

import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { CadastroPermanente } from './CadastroPermanente'
import { TemporaryRegistrationForm } from './CadastroTemporario'

export function RegistrationForm() {
    const [step, setStep] = useState(1)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [tipoCadastro, setTipoCadastro] = useState<string[]>(['hoje'])

    // Campos comuns
    const [nome, setNome] = useState('')
    const [nomeCrianca, setNomeCrianca] = useState('')
    const [telefone, setTelefone] = useState('+55')

    // Campos específicos do cadastro permanente
    const [email, setEmail] = useState('')
    const [endereco, setEndereco] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [cep, setCep] = useState('')
    const [alergias, setAlergias] = useState('')
    const [observacoes, setObservacoes] = useState('')
    const [fotoCrianca, setFotoCrianca] = useState<File | null>(null)
    const [fotoPreview, setFotoPreview] = useState('')
    const [nomeResponsavel, setNomeResponsavel] = useState('')

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

    // const uploadImage = async (fotoCrianca: File, formId: number) => {
    //     const formData = new FormData();
    //     formData.append('file', fotoCrianca); // Adiciona a imagem com a chave 'file'

    //     try {
    //         const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    //         // Substitua :id pelo formId
    //         const response = await axios.post(`${api_url}/api/form/${formId}/upload-image`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });

    //         console.log(response.data);

    //         if (response.data) {
    //             return response.data.imageUrl; // Supondo que a API retorne a URL da imagem
    //         } else {
    //             throw new Error('Erro ao fazer upload da imagem');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         throw new Error('Ocorreu um erro ao fazer upload da imagem. Tente novamente.');
    //     }
    // };

    const handleCadastroPermanente = async () => {
        console.log('Enviando dados para o servidor...')

        try {
            const imageUrl = ''

            const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
            const response = await axios.post(
                `${api_url}/api/form`,
                {
                    email,
                    endereco,
                    cidade,
                    estado,
                    cep,
                    alergias,
                    observacoes,
                    fotoCrianca: imageUrl,
                    tipoCadastro: ['permanente']
                },
                { headers: { 'Content-Type': 'application/json' } }
            )

            console.log(response)


            if (response.status !== 201) {
                console.log(response)

                if (response.data.details && Array.isArray(response.data.details)) {
                    response.data.details.forEach((error: Error) => toast.error(error.message))
                } else {
                    toast.error("Erro desconhecido ao cadastrar.")
                }
            } else {
                toast.success("Cadastro realizado com sucesso!")
            }
        } catch (error: unknown) {
            console.log(error)
            if (error instanceof Error)
                toast.error(error.message || "Erro ao cadastrar. Por favor, tente novamente.")
        }
    }
    const validateForm = () => {
        if (!nome || !nomeCrianca || !telefone) {
            toast.error('Por favor, preencha todos os campos obrigatórios.')
            return false
        }
        return true
    }


    const handleConfirm = async () => {
        // toast.info('Validando informações...')

        // Validação dos campos obrigatórios
        if (!validateForm()) {
            return
        }

        const sanitizedPhone = telefone.replace(/\s+/g, '')

        try {
            const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
            const response = await axios.post(
                `${api_url}/api/register`,
                { nome, nomeCrianca, telefone: sanitizedPhone, tipoCadastro },
                { headers: { 'Content-Type': 'application/json' } }
            )

            if (!response.data) {
                throw new Error('Erro ao registrar os dados.')
            }

            if (response.status !== 201) {
                console.log(response)

                if (response.data.details && Array.isArray(response.data.details)) {
                    response.data.details.forEach((error: Error) => {
                        toast.error(error.message)
                    })
                } else {
                    toast.error('Erro desconhecido ao cadastrar.')
                }
            } else {
                toast.success('Cadastro realizado com sucesso!')

                // Gera a mensagem para o WhatsApp
                const generatedId = response.data.redirectRoute.id
                const message = encodeURIComponent(
                    `Olá ${nome}, seu cadastro foi realizado com sucesso!\n` +
                    `ID do cadastro: ${generatedId}\n` +
                    `Nome da criança: ${nomeCrianca}`
                )
                const whatsappURL = `https://wa.me/${sanitizedPhone}?text=${message}`

                // Exibe uma notificação interativa perguntando se o usuário deseja enviar para o WhatsApp
                toast.info(
                    <div>
                        <p>Deseja enviar os dados para o WhatsApp?</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <button
                                style={{
                                    padding: '5px 10px',
                                    backgroundColor: '#25D366',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    const popup = window.open(whatsappURL, '_blank')
                                    if (!popup) {
                                        toast.error('Popup bloqueado pelo navegador. Por favor, permita pop-ups para este site.')
                                    }
                                    toast.dismiss() // Fecha a notificação
                                }}
                            >
                                Sim, enviar
                            </button>
                            <button
                                style={{
                                    padding: '5px 10px',
                                    backgroundColor: '#ff4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => toast.dismiss()} // Fecha a notificação
                            >
                                Não, obrigado
                            </button>
                        </div>
                    </div>,
                    {
                        autoClose: false, // Impede que a notificação feche automaticamente
                        closeButton: false, // Remove o botão de fechar padrão
                    }
                )

                setShowConfirmation(false)
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError)
                if (error.response?.data?.details && Array.isArray(error.response.data.details)) {
                    error.response.data.details.forEach((error: Error) => {
                        toast.error(error.message)
                    })
                } else {
                    toast.error('Erro ao cadastrar. Por favor, tente novamente.')
                }
        }
    }


    const handleEdit = () => {
        setShowConfirmation(false)
    }

    return (
        <>
            {step === 1 ? (
                <TemporaryRegistrationForm
                    setStep={setStep}
                    setShowConfirmation={setShowConfirmation}
                    setTipoCadastro={setTipoCadastro}
                    tipoCadastro={tipoCadastro}
                    nome={nome}
                    setNome={setNome}
                    nomeCrianca={nomeCrianca}
                    setNomeCrianca={setNomeCrianca}
                    telefone={telefone}
                    setTelefone={setTelefone}
                    handleConfirm={handleConfirm}
                    handleEdit={handleEdit}
                    showConfirmation={showConfirmation}
                />
            ) : (
                <CadastroPermanente
                    setStep={setStep}
                    email={email}
                    setEmail={setEmail}
                    endereco={endereco}
                    setEndereco={setEndereco}
                    cidade={cidade}
                    setCidade={setCidade}
                    estado={estado}
                    setEstado={setEstado}
                    cep={cep}
                    setCep={setCep}
                    alergias={alergias}
                    setAlergias={setAlergias}
                    observacoes={observacoes}
                    setObservacoes={setObservacoes}
                    fotoCrianca={fotoCrianca}
                    setFotoCrianca={setFotoCrianca}
                    fotoPreview={fotoPreview}
                    setFotoPreview={setFotoPreview}
                    setTipoCadastro={setTipoCadastro}
                    tipoCadastro={tipoCadastro}
                    nome={nome}
                    setNome={setNome}
                    nomeResponsavel={nomeResponsavel}
                    setNomeResponsavel={setNomeResponsavel}
                    telefone={telefone}
                    setTelefone={setTelefone}
                    handleImageChange={handleImageChange}
                    handleCadastroPermanente={handleCadastroPermanente}
                />
            )}
        </>
    )
}