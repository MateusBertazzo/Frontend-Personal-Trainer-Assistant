import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import DecodedToken from '../app/utils/token/decodedToken';
import { ReactNode } from 'react';

// Tipagem do aluno(response da requisição)
interface Aluno {
    userId: number;
    username: string;
    email: string;
    role: string;
    numeroTelefone: string | null;
}

// Tipagem do contexto
interface StudentsContextType {
    students: Aluno[];
    setStudents: React.Dispatch<React.SetStateAction<Aluno[]>>;
}


// Criar o contexto
const StudentsContext = createContext<StudentsContextType | undefined>(undefined);

// Componente provedor de contexto
export const StudentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    // States
    const [students, setStudents] = useState<Aluno[]>([]);

    // Hooks
    // useSession é um hook do next-auth que retorna o estado da sessão do usuário
    const { data: session } = useSession();

    // decodificando o token
    const token = DecodedToken(session?.response as string);

    useEffect(() => {
        const fetchStudents = async () => {
            try {

                // se session ainda nao estiver carregada, nao faz o fetch
                if (!session) {
                    return;
                }

                // request para o backend
                const response = await fetch(`http://localhost:8080/personal/get-all/students-by-personal/${token?.userId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${session?.response}`,
                    }
                });

                // se a resposta nao for ok, lança um erro
                if (!response.ok) {
                    throw new Error('Erro ao buscar alunos');
                }

                // transforma a resposta em json
                const data = await response.json();

                // Setando os alunos
                setStudents(data.response);
            } catch (error) {
                throw new Error('Erro ao buscar alunos');
            }
        };

        fetchStudents();
    }, [token?.userId, session]);

    return (
        <StudentsContext.Provider value={{ students, setStudents }}>
            {children}
        </StudentsContext.Provider>
    );
};

// Hook personalizado para consumir o contexto
export const useStudents = () => useContext(StudentsContext);
