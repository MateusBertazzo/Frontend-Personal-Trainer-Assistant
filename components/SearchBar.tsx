import { IoSearch } from "react-icons/io5";
import { useEffect } from "react";
import { useState, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import DecodedToken from "../app/utils/token/decodedToken";
import { IoMdAddCircle } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FiXCircle } from "react-icons/fi";
import { useStudents } from "../providers/StudentsProvider";

// Definindo a interface do usuário que é oque é retornado da requisição
interface User {
    id: number;
    userId: number;
    personalId: number;
    username: string;
    email: string;
    role: "ADMIN" | "PERSONAL" | "USER";
    foto: string | null;
    numeroTelefone: string | null;
    observacao: string | null;
    objetivo: string | null;
}

export default function SearchBar() {

    // States
    const [profile, setProfile] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Hooks
    const data = useStudents();
    const { data: session } = useSession();

    // decodificando o token
    const token = DecodedToken(session?.response as string);
    
    // Métodos
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const responseData = async () => {
            try {

                // se session ainda nao estiver carregada, nao faz o fetch
                if (!session) {
                    return;
                }
                
                // Fazendo a requisição
                const response = await fetch(`http://localhost:8080/profiles/get-all`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${session?.response}`,
                    }
                });
 
                 // se a resposta nao for ok, lança um erro
                if (!response.ok) {
                    throw new Error("Erro ao buscar alunos CATCH");
                }
                
                // Data da resposta
                const data = await response.json();
                
                // Setando os alunos
                setProfile(data.response);
 
            } catch (error) {
                 throw new Error("Erro ao buscar alunos CATCH");
            }
        }

        responseData();

    }, [token?.userId, session]);

    // Método para associar aluno a um personal
    const handleClickAdd = async (personalId: number, alunoId: number) => {
        try {
             
            // se session ainda nao estiver carregada, nao faz o fetch
           if (!session) {
               console.log('session nao carregada');
               return;
           }
           
           // Fazendo a requisição
           const response = await fetch(`http://localhost:8080/personal/${personalId}/associate-user/${alunoId}`, {
               method: 'POST',
               headers: {
                   Authorization: `Bearer ${session?.response}`,
               }
           });

            // se a resposta nao for ok, lança um erro
           if (!response.ok) {
               throw new Error("Erro ao associar aluno");
           }
           
           // Data da resposta
           const data = await response.json();

        } catch (error) {
            throw new Error("Erro ao associar aluno");
        }
    }

    // Método para desassociar aluno a um personal
    const handleClickRemove = async (alunoId: number) => {
        try {
             
            // se session ainda nao estiver carregada, nao faz o fetch
           if (!session) {
               return;
           }
           
           // Fazendo a requisição
           const response = await fetch(`http://localhost:8080/personal/${alunoId}/dissociate-user`, {
               method: 'POST',
               headers: {
                   Authorization: `Bearer ${session?.response}`,
               }
           });

            // se a resposta nao for ok, lança um erro
           if (!response.ok) {
               throw new Error("Erro ao associar aluno");
           }

           data?.setStudents(prevStudents => prevStudents.filter(student => student.userId !== alunoId));
        } catch (error) {
            throw new Error("Erro ao associar aluno");
        }
    }

    // Filtrando os dados
    const filteredData = profile.filter((profile) => {

        // Só retornara os alunos se o campo de não estiver vazio e se o nome do aluno for igual ao que foi digitado
        if (searchTerm.trim() !== '') {
            return profile.username.toLowerCase().includes(searchTerm.toLowerCase()); 
        }

    }).slice(0, 4);

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex relative">
                <IoSearch size={28} className="absolute left-1 self-center text-gray-400" />
                <input
                    type="text"
                    className="w-full h-10 border border-gray-300 rounded-full bg-gray-200 pl-10 outline-none"
                    onChange={handleSearch}
                    placeholder="Buscar..."
                />
            </div>

            <div className="flex flex-col items-center gap-4">
                <ul className="flex flex-wrap">
                    {filteredData.map((result, index) => (
                        <li key={result.userId} className="flex w-1/2 text-center gap-1 py-2">
                            <div className="flex w-full gap-3 items-center">
                                <div className="flex items-center">
                                    <CgProfile size={40} className="self-center cursor-pointer" />
                                    <p className="flex">{`${result.username}`}</p>
                                </div>
                                
                                <IoMdAddCircle
                                    onClick={() => handleClickAdd(token?.userId as number, result.userId)}
                                    size={38}
                                    className="self-center text-green-600 rounded-full cursor-pointer"
                                />
                
                                <FiXCircle
                                    onClick={() => handleClickRemove(result.userId)}
                                    size={38}
                                    className="self-center text-red-500 rounded-full cursor-pointer"
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}