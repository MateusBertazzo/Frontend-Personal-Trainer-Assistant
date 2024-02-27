'use client'

import Button from '../../components/Button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const schema = z.object({
    password: z
      .string()
      .min(8, 'A senha deve conter no mínimo 8 caracteres.')
      .max(100, { message: 'Senha deve conter no máximo 100 caracteres' }),
    
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
});
  
  // Tipagem do formulário
type FormProps = z.infer<typeof schema>;


export default function ResetPassword() {

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormProps>({
        
        mode: 'onBlur',
        resolver: zodResolver(schema),
    });

    const handleForm = async (data : FormProps) => {
        try {
            const response = await fetch('http://localhost:8080/email/reset-password', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
             
            if (!response.ok) {
            console.log('Erro ao redefinir senha');
            throw new Error('Erro ao redefinir senha');
            }

            console.log('Senha redefinida com sucesso!');
        } catch (error) {
            console.error('Erro ao redefinir senha', error);
            throw new Error('Erro ao redefinir senha');
        }
        
      };


    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            
            <form className='w-[400px] flex flex-col gap-6 px-12' onSubmit={handleSubmit(handleForm)}>
                <h1 className='self-center font-bold text-xl'>Redefina sua Senha</h1>
                <div className='flex flex-col'>
                    <input
                        {...register('password')}
                        type="password"
                        placeholder="Digite sua senha"
                        className={`flex flex-col h-12 rounded-md p-2 bg-gray-100 border border-gray-300`}
                    />
                </div>

                <div className='flex flex-col'>
                    <input
                        {...register('confirmPassword')}
                        type="password"
                        placeholder="Confirme sua senha"
                        className={`flex flex-col h-12 rounded-md p-2 bg-gray-100 border border-gray-300`}
                    />
                </div>

                <Button text='Cadastra-se' style='bg-[var(--orange)]' type='submit' />
            </form>
        </div>
    );
}