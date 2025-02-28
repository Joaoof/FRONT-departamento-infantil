import axios from "axios";

interface ApiResponse {
    status: number;
    data: {
        cadastro?: string;
        details?: string;
    };
}

const CadastroPermanenteFuncao = async (data: any): Promise<ApiResponse> => {
    try {
        const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await axios.post(`${api_url}/api/form`, data);
        return { status: response.status, data: response.data };
    } catch (error: any) {
        return {
            status: error.response?.status || 500,
            data: { details: error.response.data.details || "Erro ao cadastrar." },
        };
    }
};

export default CadastroPermanenteFuncao;