import jwt from 'jsonwebtoken';


// Função para decodificar o token JWT e acessar suas informações
const decodeToken = (token: string) => {
  try {
    // Decodifica o token
    const decodedToken = jwt.decode(token);
    return decodedToken;

  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
}



export default decodeToken;