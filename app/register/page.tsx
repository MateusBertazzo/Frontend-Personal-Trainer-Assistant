'use client'

import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Loading from '../../components/Loading';
import InputText from '@/components/InputText';
import Button from '@/components/Button';


export default function Register() {
  const route = useRouter()
  const path = usePathname()
  
  const [formValue, setFormValue] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });

    // se o campo email estiver em foco, limpa qualquer mensagem de erro
    if (name === 'email') {
      setEmailError('');
    }

    if (name === 'username') {
      setUsernameError('');
    }

    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  // valida email
  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(formValue.email);
  }

  // valida username (não pode conter @) e tem que ser maior que 3 e menor que 20
  const validateUsername = () => {
    return formValue.username.length > 3 && formValue.username.length < 20 && !formValue.username.includes('@');
  }

  // valida senha (tem que ser maior que 8 e tem que ser igual a confirmar senha)
  const validatePassword = () => {
    return formValue.password.length >= 8 && formValue.password === formValue.confirmPassword;
  }

  const handleSubmit = async () => {
    // valida email
    if (!validateEmail()) {
      setEmailError('Email inválido');
      return;
    }

    // valida username
    if (!validateUsername()) {
      setUsernameError('Usuário inválido');
      return;
    }

    // valida senha
    if (!validatePassword()) {
      setPasswordError('Senha inválida');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/users/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValue),
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

  const { email, username, password, confirmPassword } = formValue;

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <form className='w-[400px] flex flex-col gap-6 px-12'>
        <h1 className='text-3xl font-bold text-center'>Cadastre-se</h1> 
        
        <InputText type='text' placeholder='Digite seu nome de usuário' value={username} onChange={handleChange} error={{ border: usernameError ? '2px solid red' : '' ,  }} />

        <InputText type='text' placeholder='Digite seu e-mail' value={email} onChange={handleChange} error={{ border: emailError ? '2px solid red' : '' ,  }} />

        <InputText type='password' placeholder='Digite sua senha' value={password} onChange={handleChange} error={{ border: passwordError ? '2px solid red' : '' ,  }} />
        
        <InputText type='password' placeholder='Confirme sua senha' value={confirmPassword} onChange={handleChange} error={{ border: passwordError ? '2px solid red' : '' ,  }} />

        <Button text='Cadastrar' onClick={handleSubmit} />

        <p className='text-center'>Já tem uma conta? <a href='/' className='text-[var(--orange)] font-bold'>Faça login.</a></p>
        </form>
    </div>
  );
}