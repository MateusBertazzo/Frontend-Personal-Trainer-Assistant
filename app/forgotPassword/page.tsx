'use client'

import React from 'react';
import Image from 'next/image';
import Logo from '../../public/logo.png';
import { useForm } from 'react-hook-form';


export default function ForgotPassword() {
    const [email, setEmail] = React.useState('')

    const { handleSubmit, register } = useForm();

    const handleForm = async (data) => {
        try {
            const response = await fetch('http://localhost:8080/email/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({to: data.email}),
            })

            console.log(response)

            // se a resposta nao for ok, lança um erro
            if (!response.ok) {
                throw new Error("Erro ao mandar E-mail de recuperação de senha");
            }
        } catch (error) {
            throw new Error("Erro ao buscar mandar E-mail de recuperação de senha");
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

                    <button 
                        type='submit'
                        className='flex justify-center items-center h-12 rounded-md bg-[var(--orange)] hover:bg-orange-400 transition-all duration-500 ease-in-out font-bold text-white'>
                            Enviar
                    </button>

                    <a className='self-center' href="/">Lembrou ? <span className='text-[var(--orange)] font-bold'>Faça login</span></a>
                </form>
        </div>
    );
}