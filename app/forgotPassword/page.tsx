'use client'

import React from 'react';
import Image from 'next/image';
import Logo from '../../public/logo.png';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Button from '@/components/Button';

// Interface para tipar o retorno da requisição
interface responseData {
    success: boolean;
    message: string;
    response: string | null;
}

export default function ForgotPassword() {

    // States
    const [responseData, setResponseData] = useState<responseData>()
    const [isLoading, setIsLoading] = useState(false);

    // Hooks
    const { handleSubmit, register } = useForm();

    // Métodos

    // Função para enviar o email de recuperação de senha
    const handleForm = async (data: any) => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:8080/email/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({to: data.email}),
            })

            // se a resposta nao for ok, lança um erro
            if (!response.ok) {
                setIsLoading(false);
                throw new Error("Erro ao mandar E-mail de recuperação de senha");
            }
            
            const responseData = await response.json();
            
            setResponseData(responseData);

            setIsLoading(false);
        } catch (error) {
            throw new Error("Erro ao buscar E-mail de recuperação de senha");
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col gap-6 self-center bg-white p-8 rounded-lg">
                <Image
                    src={Logo} 
                    alt="Logo" 
                    width={220} 
                    className="flex self-center"
                />
                <h1 className="text-2xl self-center font-bold mb-4">Problemas para entrar?</h1>
                <p className="text-gray-700 mb-8">Insira seu email e enviaremos um link para você voltar a acessar sua conta.</p>
            </div>
                <form className="w-[400px] flex flex-col gap-6 px-12" onSubmit={handleSubmit(handleForm)}>
                    <input
                        {...register('email')}
                        type="text"
                        placeholder="Digite seu E-mail..."
                        className={`flex flex-col h-12 rounded-md p-2 bg-gray-100 border border-gray-300`}
                    />

                    <div className='flex flex-col gap-2'>
                        <Button 
                            text='Enviar' 
                            loading={isLoading} 
                            style='bg-[var(--orange)]' 
                            type='submit' 
                        />

                        <p className='self-center'>{responseData?.success && <span className='p-1 text-sm font-bold text-green-600'>{responseData.message}</span>}</p>
                    </div>
                    
                    <a className='self-center' href="/">Lembrou? <span className='text-[var(--orange)] font-bold'>Faça login</span></a>
                </form>
        </div>
    );
}