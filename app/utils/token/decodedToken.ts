import jwt from 'jsonwebtoken';

interface DecodedTokenProps {
  sub: string;
  role: number;
  iss: 'app-personal'
  exp: number;
  userId: number;
  email: string;
  username: string;
}

// Função para decodificar o token JWT e acessar suas informações
const decodeToken = (token: string) => {
  try {
    // Decodifica o token
    const decodedToken = jwt.decode(token);
    return decodedToken as DecodedTokenProps;

  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
}



export default decodeToken;