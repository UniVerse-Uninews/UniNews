import axios from 'axios';

export const getRss = async (text: string) => {
    try {
        // Codifica o texto para ser utilizado como parte da URL
        const encodedText = encodeURIComponent(text);

        // Faz a requisição GET para a API utilizando a URL base e o texto codificado
        const response = await axios.get(`http://192.168.0.107/news/${encodedText}`);

        // Retorna os dados da resposta
        return response.data;
    } catch (error: any) {
        // Loga o erro no console e retorna null
        console.error('Erro ao buscar as notícias. Insira um texto válido!', error.message);
        return null;
    }
};
