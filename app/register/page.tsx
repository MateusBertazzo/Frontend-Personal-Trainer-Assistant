'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import InputText from '@/components/InputText';
import Button from '@/components/Button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  username: z.string().refine(value => !value.includes('@'), {
    message: 'O nome de usuário não pode conter o caractere "@"',
    path: ['username']
  }),
  email: z.string().email('Digite um e-mail válido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
  confirmPassword: z.string().min(8),
});

type FormValues = z.infer<typeof schema>;

export default function Register() {
  const route = useRouter()
  const path = usePathname()

  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const handleForm = async (data: FormValues) => {
    try {
      const response = await fetch('http://localhost:8080/users/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(handleSubmit),
      });

      // seta loading para true
      setLoading(true);
      

      if (!response.ok) {
        setLoading(false);
        throw new Error('Erro ao enviar os dados');
      }

      route.push('/login');

      if (path === '/login') {
        setLoading(false);
      }

      console.log('Dados enviados com sucesso');
    } catch (error) {
      setLoading(false);
      throw new Error('Erro ao enviar os dados');
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <form className='w-[400px] flex flex-col gap-6 px-12' onSubmit={handleSubmit(handleForm)}>
        <h1 className='text-3xl font-bold text-center'>Cadastre-se</h1> 
        
        <InputText type='text' placeholder='Digite seu nome de usuário' {...register('username')}/>

        <InputText type='text' placeholder='Digite seu e-mail' {...register('email')}/>

        <InputText type='password' placeholder='Digite sua senha' {...register('password')}/>
        
        <InputText type='password' placeholder='Confirme sua senha' {...register('confirmPassword')}/>

        <Button text='Cadastrar'/>

        <p className='text-center'>Já tem uma conta? <a href='/' className='text-[var(--orange)] font-bold'>Faça login.</a></p>
        </form>
    </div>
  );
}