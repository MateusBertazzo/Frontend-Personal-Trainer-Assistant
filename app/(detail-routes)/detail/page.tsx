'use client';

import Image from "next/image";
import { MdAlternateEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import DecodedToken from "../../utils/token/decodedToken";
import  UserDetails  from "../../../types/next-auth";


export default function Detail() {
    // States
    const [data, setData] = useState<UserDetails>();

    // Hooks
    const { data: session } = useSession();
    
    // decodificando o token
    const token = DecodedToken(session?.response as string);

    useEffect(() => {
        const fetchDetailUser = async () => {
            try {

                if (!session) {
                    return;
                }

                const response = await fetch(`http://localhost:8080/profiles/get/${token?.userId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${session?.response}`,
                    }
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error('Erro ao buscar Profile de aluno');
                }

                setData(data.response);

                console.log(data.response);
            } catch (error) {
                throw new Error('Erro ao buscar Profile de aluno');
            }
        }

        fetchDetailUser();
    }, [token?.userId, session]);

    return (
        <div className="flex flex-col justify-center items-center bg-gray-200 gap-2">
            <Image 
                src="/students.jpeg"
                alt="foto aluno"
                width={200}
                height={200}
                className="rounded-xl py-2"
            />

            {/*Informações do Aluno */}
            <div className="flex flex-col shadow-md bg-white w-48 gap-2 rounded-md px-2 py-2 ">
                <div className="flex flex-col">
                    <h1 className="font-bold text-orange-600">{data?.username}</h1>
                    <span className="text-gray-400 text-xs mb-1">{`Aluno desde ${data?.userMetrics.dataStart}`}</span>
                </div>
                
                <p className="flex items-center gap-1 font-semibold text-sm">
                    <span>
                            <MdAlternateEmail className="text-orange-600"/>
                    </span>
                    {data?.email}
                </p>

                <p className="flex items-center gap-1 font-semibold text-sm"> 
                    <span>
                        <FaWhatsapp className="text-orange-600"/>
                    </span>
                    {data?.numeroTelefone}
                </p>
            </div>

            {/*Objetivo do Aluno */}
            <div className="flex flex-col shadow-md bg-white w-48 gap-2 rounded-md px-2 py-2">
                <h2 className="font-semibold">Objetivos</h2>

                <div className="flex gap-2">
                    <span className="self-center px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-orange-600 text-white">{data?.objetivo}</span>
                    <MdAddCircle size={24} className="rounded-full"/>
                </div>
            </div>

            {/*Métricas do Aluno */}
            <div className="flex flex-col shadow-md bg-white w-48 gap-2 rounded-md px-2 py-2">
                <h2 className="font-semibold">Métricas do aluno</h2>
                <div>
                    <h3 className="text-orange-600 font-bold">Braço</h3>
                    <p className="text-xs font-semibold">{`Direito: ${data?.userMetrics.rightArm}`}</p>
                    <p className="text-xs font-semibold">{`Esquerdo: ${data?.userMetrics.leftArm}`}</p>
                </div>

                <div>
                    <h3 className="text-orange-600 font-bold">Perna</h3>
                    <p className="text-xs font-semibold">{`Direita: ${data?.userMetrics.rightLeg}`}</p>
                    <p className="text-xs font-semibold">{`Esquerda: ${data?.userMetrics.leftLeg}`}</p>
                </div>

                <div>
                    <h3 className="text-orange-600 font-bold">Panturrilha</h3>
                    <p className="text-xs font-semibold">{`Direita: ${data?.userMetrics.rightCalf}`}</p>
                    <p className="text-xs font-semibold">{`Esquerda: ${data?.userMetrics.leftCalf}`}</p>
                </div>

                <div className="flex gap-3">
                    <div className="flex flex-col gap-2">
                        <div className="bg-orange-200 rounded-md px-1 py-1">
                            <h3 className="text-orange-600 font-bold">Peso</h3>
                            <p className="text-xs font-semibold">{`${data?.userMetrics.weight} kg`}</p>
                        </div>
                       
                        <div className="bg-orange-200 rounded-md px-1 py-1">
                            <h3 className="text-orange-600 font-bold">Tronco</h3>
                            <p className="text-xs font-semibold">{`${data?.userMetrics.torso} cm`}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="bg-orange-200 rounded-md px-1 py-1">
                            <h3 className="text-orange-600 font-bold">Altura</h3>
                            <p className="text-xs font-semibold">{`${data?.userMetrics.height} cm`}</p>
                        </div>
                       
                        <div className="bg-orange-200 rounded-md px-1 py-1">
                            <h3 className="text-orange-600 font-bold">Quadril</h3>
                            <p className="text-xs font-semibold">{`${data?.userMetrics.hip} cm`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}