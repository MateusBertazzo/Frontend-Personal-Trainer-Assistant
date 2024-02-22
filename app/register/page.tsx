'use client'

import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Loading from '../../components/Loading';


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
    <div className='box-signup'>
      <form className='form-signup'>
        <h1>Cadastre-se</h1> 

        <input
            type="text"
            name="username"
            placeholder='Usuario'
            onChange={handleChange}
            value={username} 
            style={{ border: usernameError ? '2px solid red' : '' ,  }}
            />

        <input 
            type="text" 
            name="email" 
            placeholder='Email'
            onChange={handleChange} 
            value={email} 
            style={{ border: emailError ? '2px solid red' : '' }}
            />
        <input
            type="password"
            name="password"
            placeholder='Senha'
            onChange={handleChange}
            value={password} 
            style={{ border: passwordError ? '2px solid red' : '' }}
            />
        
        <input
            type="password"
            name="confirmPassword"
            placeholder='Confirmar Senha'
            onChange={handleChange}
            value={confirmPassword} />

        <button type="button" onClick={handleSubmit}>
          Cadastrar
        </button>
        <p>{loading ? <Loading /> : ''}</p>

        </form>
    </div>
  );
}