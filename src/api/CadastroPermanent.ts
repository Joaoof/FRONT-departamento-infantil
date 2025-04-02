import axios, { AxiosError } from "axios"

interface ApiResponse {
    status: number;
    data: {
        cadastro?: string;
        details?: string;
    };
}

type CadastroPermanenteRequest = {
    nome: string,
    nomeResponsavel: string,
    telefone: string,
    email: string,
    endereco: string,
    cidade: string,
    estado: string,
    cep: string,
    alergias: string,
    observacoes: string,
    tipoCadastro: string[],
}

const CadastroPermanenteFuncao = async (data: CadastroPermanenteRequest): Promise<ApiResponse> => {
    try {
        const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
        const response = await axios.post(`${api_url}/api/form`, data)
        return { status: response.status, data: response.data }
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return {
                status: error.response?.status || 500,
                data: { details: error.response?.data?.details || "Erro ao cadastrar." },
            }
        }
        return {
            status: 500, data: { details: "Erro ao cadastrar." }
        }
    }
}

export default CadastroPermanenteFuncao
