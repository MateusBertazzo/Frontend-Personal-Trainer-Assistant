import { IoSearch } from "react-icons/io5";
import { useEffect } from "react";
import { useState, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import DecodedToken from "../app/utils/token/decodedToken";
import Link from "next/link";
import { IoMdAddCircle } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FiXCircle } from "react-icons/fi";

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

function SearchBar() {
    // States
    const [students, setStudents] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Hooks
    const { data: session } = useSession();

    // decodificando o token
    const token = DecodedToken(session?.response as string)
    
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
                    throw new Error("Erro ao buscar alunos");
                }
                
                // Data da resposta
                const data = await response.json();
                
                // Setando os alunos
                setStudents(data.response);
 
            } catch (error) {
                 throw new Error("Erro ao buscar alunos CATCH");
            }
        }
 
        responseData();
    }, [token?.userId, session]);

    // Filtrando os dados
    const filteredData = students.filter((student) => {

        // Só retornara os alunos se o campo de não estiver vazio e se o nome do aluno for igual ao que foi digitado
        if (searchTerm.trim() !== '') {
            return student.username.toLowerCase().includes(searchTerm.toLowerCase()); 
        }  
    }).slice(0, 4)

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
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                    {filteredData.map((result, index) => (
                        <li key={result.userId} className="flex flex-col text-center gap-1 py-2">
                            <div className="flex gap-3 items-center">
                                <div className="flex items-center">
                                    <CgProfile size={40} className="self-center cursor-pointer" />
                                    <p className="flex">{`${result.username}`}</p>
                                </div>

                                <IoMdAddCircle size={38} className="self-center text-green-600 rounded-full cursor-pointer" />
                                <FiXCircle size={38} className="self-center text-red-500 rounded-full cursor-pointer" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SearchBar;