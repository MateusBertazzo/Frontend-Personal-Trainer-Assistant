import CardStudents from "./CardStudents";
import fakeStudents from "../app/fakecards/fakeData";
import { useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import DecodedToken from "../app/utils/token/decodedToken";

interface Aluno {
    userId: number;
    username: string;
    email: string;
    role: string;
    numeroTelefone: string | null;
  }

export default function Students() {

    // States
    const [students, setStudents] = useState<Aluno[]>([]);

    // Hooks
    const { data: session } = useSession();

    // decodificando o token
    const token = DecodedToken(session?.response as string)

    useEffect(() => {
        const responseData = async () => {
            try {
                
                // se session ainda nao estiver carregada, nao faz o fetch
                if (!session) {
                    return;
                }

                const response = await fetch(`http://localhost:8080/personal/get-all/students-by-personal/${token?.userId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${session?.response}`,
                    }
                });

                // se a resposta nao for ok, lanca um erro
                if (!response.ok) {
                    throw new Error("Erro ao buscar alunos");
                }

                const data = await response.json();

                setStudents(data.response);

            } catch (error) {
                throw new Error("Erro ao buscar alunos CATCH");
            }
        }

        responseData();
    }, [token?.userId, session]);

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Alunos</h1>
            <div className="flex flex-wrap gap-4">
                {
                    students.map((student, index) => {
                        return (
                                <CardStudents
                                    key={index}
                                    img={fakeStudents[0].img}
                                    name={student.username}
                                />
                        );
                    })
                }
            </div>
        </div>
    );
}