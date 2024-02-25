import { IoSearch } from "react-icons/io5";
import { useEffect } from "react";
import { useState, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import DecodedToken from "../app/utils/token/decodedToken";
import Link from "next/link";
import { IoAddOutline } from "react-icons/io5";
import { IoAtOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FiXCircle } from "react-icons/fi";





interface User {
    id: number;
    userId: number;
    personalId: number;
    username: string;
    email: string;
    role: "ADMIN" | "PERSONAL" | "USER"; // Define um tipo para o campo 'role'
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
    })

    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="flex relative">
                <IoSearch size={28} className="absolute left-1 self-center text-gray-400" />
                <input
                    type="text"
                    className="w-full h-10 border border-gray-300 rounded-full bg-gray-200 pl-10 outline-none"
                    onChange={handleSearch}
                    placeholder="Buscar..."
                />
            </div>

            <div className="flex gap-4">
                <ul className="flex flex-wrap gap-4">
                    {filteredData.map((result, index) => (
                        <li key={result.userId} className="flex flex-col text-center gap-1 py-2">
                            <div className="flex gap-2">
                                <p className="flex"><CgProfile size={22} className="self-center cursor-pointer"/> {`${result.username}`}</p>
                                <IoAddOutline size={18} className="self-center bg-green-600 rounded-full cursor-pointer" />
                                <FiXCircle size={18} className="self-center bg-red-500 rounded-full cursor-pointer"/>
                            </div>
                        </li>
                    ))}
                </ul>
            
            </div>
        </div>
        
    );
}

export default SearchBar;