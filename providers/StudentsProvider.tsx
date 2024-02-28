import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import DecodedToken from '../app/utils/token/decodedToken';
import { ReactNode } from 'react';

interface Aluno {
    userId: number;
    username: string;
    email: string;
    role: string;
    numeroTelefone: string | null;
}

interface StudentsContextType {
    students: Aluno[]; // Certifique-se de ter uma interface Aluno definida ou utilize any por enquanto
    setStudents: React.Dispatch<React.SetStateAction<Aluno[]>>;
}


// Criar o contexto
const StudentsContext = createContext<StudentsContextType | undefined>(undefined);

// Componente provedor de contexto
export const StudentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [students, setStudents] = useState<Aluno[]>([]);
    const { data: session } = useSession();
    const token = DecodedToken(session?.response as string);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                if (!session) {
                    return;
                }

                const response = await fetch(`http://localhost:8080/personal/get-all/students-by-personal/${token?.userId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${session?.response}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar alunos');
                }

                const data = await response.json();
                setStudents(data.response);
            } catch (error) {
                console.error('Erro ao buscar alunos:', error);
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
