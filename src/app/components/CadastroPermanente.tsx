"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Camera, Upload, CheckCircle } from 'lucide-react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

interface CadastroPermanenteProps {
    setStep: (step: number) => void;
    email: string;
    setEmail: (email: string) => void;
    endereco: string;
    setEndereco: (endereco: string) => void;
    cidade: string;
    setCidade: (cidade: string) => void;
    estado: string;
    setEstado: (estado: string) => void;
    cep: string;
    setCep: (cep: string) => void;
    alergias: string;
    setAlergias: (alergias: string) => void;
    observacoes: string;
    setObservacoes: (observacoes: string) => void;
    fotoCrianca: File | null;
    setFotoCrianca: (foto: File | null) => void;
    fotoPreview: string;
    setFotoPreview: (preview: string) => void;
    nome: string;
    setNome: (nome: string) => void;
    nomeResponsavel: string;
    setNomeResponsavel: (nome: string) => void;
    telefone: string;
    tipoCadastro: string;
    setTipoCadastro: (tipo: string) => void;
    setTelefone: (telefone: string) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCadastroPermanente: () => void;
}

export function CadastroPermanente({
    setStep,
    email,
    setEmail,
    endereco,
    setEndereco,
    cidade,
    setCidade,
    estado,
    setEstado,
    cep,
    setCep,
    alergias,
    setAlergias,
    observacoes,
    setObservacoes,
    fotoCrianca,
    setFotoCrianca,
    fotoPreview,
    setFotoPreview,
    handleImageChange,
    handleCadastroPermanente,
    nome,
    setNome,
    nomeResponsavel,
    setNomeResponsavel,
    telefone,
    setTelefone,
}: CadastroPermanenteProps) {

    const [isCadastroConcluido, setIsCadastroConcluido] = useState(false);
    const [formId, setFormId] = useState<string | number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const router = useRouter();

    const handleCadastro = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            const response = await axios.post(`${api_url}/api/form`, {
                email,
                endereco,
                cidade,
                estado,
                cep,
                alergias,
                observacoes,
                nome,
                nomeResponsavel,
                telefone
            });

            console.log(response.data);


            if (response.data) {
                setFormId(response.data.cadastro);
                setIsCadastroConcluido(true);
            } else {
                throw new Error("Resposta inválida do servidor");
            }
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            alert("Erro ao cadastrar. Por favor, tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUploadImage = async () => {
        if (!fotoCrianca || !formId) {
            alert("Selecione uma foto e complete o cadastro primeiro.");
            return;
        }

        const formData = new FormData();
        formData.append("fotoCrianca", fotoCrianca);

        try {
            const api_url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
            const response = await axios.post(`${api_url}/api/form/${formId}/upload-image`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
                    setUploadProgress(percentCompleted);
                }
            });

            if (response.data.success) {
                alert("Cadastro concluído com sucesso!");
                router.push("/confirmacao");
            } else {
                throw new Error("Falha no upload da imagem");
            }
        } catch (error) {
            console.error("Erro ao enviar foto:", error);
            alert("Erro ao enviar foto. Por favor, tente novamente.");
        } finally {
            setUploadProgress(0);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-bold text-purple-900 text-center">Cadastro Permanente</h2>
                    <p className="mt-2 text-center text-gray-600 font-light">
                        Complete as informações para finalizar seu cadastro
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!isCadastroConcluido ? (
                        <motion.div
                            key="cadastro-form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="backdrop-blur-sm bg-white/30">
                                <CardHeader>
                                    <CardTitle>Informações Pessoais</CardTitle>
                                    <CardDescription>Preencha os dados abaixo com atenção</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleCadastro} className="space-y-6">
                                        <div>
                                            <Label htmlFor="nome" className="text-sm font-medium text-gray-700">Nome da Criança</Label>
                                            <Input
                                                id="nome"
                                                value={nome}
                                                onChange={(e) => setNome(e.target.value)}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="nomeResponsavel" className="text-sm font-medium text-gray-700">Nome do Responsavel</Label>
                                            <Input
                                                id="nomeResponsavel"
                                                value={nomeResponsavel}
                                                onChange={(e) => setNomeResponsavel(e.target.value)}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="telefone" className="text-sm font-medium text-gray-700">Telefone</Label>
                                            <Input
                                                id="telefone"
                                                value={telefone}
                                                onChange={(e) => setTelefone(e.target.value)}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="endereco" className="text-sm font-medium text-gray-700">Endereço</Label>
                                                <Input
                                                    id="endereco"
                                                    value={endereco}
                                                    onChange={(e) => setEndereco(e.target.value)}
                                                    required
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="cidade" className="text-sm font-medium text-gray-700">Cidade</Label>
                                                    <Input
                                                        id="cidade"
                                                        value={cidade}
                                                        onChange={(e) => setCidade(e.target.value)}
                                                        required
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="estado" className="text-sm font-medium text-gray-700">Estado</Label>
                                                    <Input
                                                        id="estado"
                                                        value={estado}
                                                        onChange={(e) => setEstado(e.target.value)}
                                                        required
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Label htmlFor="cep" className="text-sm font-medium text-gray-700">CEP</Label>
                                                <Input
                                                    id="cep"
                                                    value={cep}
                                                    onChange={(e) => setCep(e.target.value)}
                                                    required
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="alergias" className="text-sm font-medium text-gray-700">Alergias</Label>
                                                <Textarea
                                                    id="alergias"
                                                    value={alergias}
                                                    onChange={(e) => setAlergias(e.target.value)}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                                                    placeholder="Liste quaisquer alergias ou restrições alimentares"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="observacoes" className="text-sm font-medium text-gray-700">Observações</Label>
                                                <Textarea
                                                    id="observacoes"
                                                    value={observacoes}
                                                    onChange={(e) => setObservacoes(e.target.value)}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                                                    placeholder="Informações adicionais importantes"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <Button
                                                type="submit"
                                                disabled={isLoading}
                                                className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                            >
                                                {isLoading ? "Processando..." : "Concluir Cadastro"}
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="upload-image"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <Card className="backdrop-blur-sm bg-white/30">
                                <CardHeader>
                                    <CardTitle>
                                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                                        Cadastro Realizado com Sucesso!
                                    </CardTitle>
                                    <CardDescription>Agora, vamos adicionar uma foto da criança</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div className="flex justify-center">
                                            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-purple-200 hover:border-purple-400 transition-colors duration-300">
                                                {fotoPreview ? (
                                                    <Image
                                                        src={fotoPreview || "/placeholder.svg"}
                                                        alt="Preview"
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full bg-gray-100">
                                                        <Camera className="w-12 h-12 text-gray-400" />
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
                                        {fotoPreview && (
                                            <Button
                                                onClick={handleUploadImage}
                                                className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                            >
                                                <Upload className="w-4 h-4 mr-2" />
                                                Enviar Foto
                                            </Button>
                                        )}
                                        {uploadProgress > 0 && uploadProgress < 100 && (
                                            <div className="w-full">
                                                <Progress value={uploadProgress} className="w-full" />
                                                <p className="text-sm text-gray-600 mt-2">Enviando... {uploadProgress}%</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}