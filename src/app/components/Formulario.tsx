"use client"

import { useState } from 'react'
import axios from 'axios'
import { TemporaryRegistrationForm } from './CadastroTemporario'
import { CadastroPermanente } from './CadastroPermanente'

export function RegistrationForm() {
    const [step, setStep] = useState(1)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [tipoCadastro, setTipoCadastro] = useState('hoje')

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
            let imageUrl = ''
            // if (fotoCrianca) {
            //     imageUrl = await uploadImage(fotoCrianca, formId)
            // }

            setTipoCadastro("permanente"); // 🔥 Garante que está como permanente


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
                    tipoCadastro: 'permanente'
                },
                { headers: { 'Content-Type': 'application/json' } }
            )

            if (response.data) {
                alert('Cadastro permanente realizado com sucesso!')
            } else {
                console.error("Erro no cadastro")
            }
        } catch (error) {
            console.error(error)
            alert('Ocorreu um erro ao enviar os dados. Tente novamente.')
        }
    }

    const handleConfirm = async () => {
        const sanitizedPhone = telefone.replace(/\s+/g, '')

        const popup = window.open('', '_blank')
        if (!popup) {
            alert('Popup bloqueado pelo navegador. Por favor, permita pop-ups para este site.')
            return
        }

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

            const generatedId = response.data.redirectRoute.id

            const message = encodeURIComponent(
                `Olá ${nome}, seu cadastro foi realizado com sucesso!\n` +
                `ID do cadastro: ${generatedId}\n` +
                `Nome da criança: ${nomeCrianca}`
            )
            const whatsappURL = `https://wa.me/${sanitizedPhone}?text=${message}`

            popup.location.href = whatsappURL
            setShowConfirmation(false)
        } catch (error) {
            console.error(error)
            alert('Ocorreu um erro ao enviar os dados. Tente novamente.')
            popup.close()
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