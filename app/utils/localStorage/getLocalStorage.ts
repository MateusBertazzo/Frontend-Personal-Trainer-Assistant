import decodeToken from '../token/decodedToken'; // Importe a função decodeToken

// Função para obter o token do localStorage e decodificá-lo
const getTokenAndDecode = (): object | null => {
try {
    // Obtenha o token armazenado no localStorage
    const token = localStorage.getItem('token');
    
    // Se não houver token no localStorage, retorne null
    if (!token) {
        console.error('Nenhum token encontrado no localStorage');
        return null;
    }

    return decodeToken(token) as object | null;
} catch (error) {
    console.error('Erro ao obter e decodificar o token:', error);
    return null;
  }
}

export default getTokenAndDecode;