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
           
            // adicionando o aluno associado no students para atualizar a lista dinamicamente
            data?.setStudents(prevStudents => {
            const updatedStudents = [...prevStudents];
            
            // pego o aluno que foi associado
            const aluno = profile.find(student => student.userId === alunoId);
            
            // verifico se o aluno existe
            if (aluno) {

                // verifico se o aluno ja esta associado se estiver não adiciono
                if (updatedStudents.find(student => student.userId === alunoId)) {
                    return updatedStudents;
                }
                
                // adiciono o aluno
                updatedStudents.push(aluno);
            }

            // retorno os alunos
            return updatedStudents;
        });   

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

            // removendo o aluno associado no students para atualizar a lista dinamicamente
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
                
                <input
                    type="text"
                    className="w-full p-4 h-10 border border-black rounded-full bg-white pl-10 outline-none"
                    onChange={handleSearch}
                    placeholder="Buscar..."
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 rounded-full">
                    <IoSearch size={28}/>
                </button>
            </div>

            {
                searchTerm.length > 0 && (
                    <div className="absolute top-36 p-4 bg-white w-96 text-white rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
                        {filteredData.map((result, index) => (

                            <div className="flex gap-3" key={index}>
                                <div className="flex gap-1">
                                    <CgProfile size={40} className="text-black" />
                                    <p className="flex self-center text-black">{`${result.username}`}</p>
                                </div>

                                <button onClick={() => handleClickAdd(token?.userId as number, result.userId)}>
                                    <span className="self-center px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-500">
                                        Adicionar aluno
                                    </span>
                                </button>

                                <button onClick={() => handleClickRemove(result.userId)}>
                                    <span className="self-center px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-500">
                                        Remover aluno
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                )
            }
            
        </div>
    )
}