'use client'

import { ChangeEvent } from 'react';
import { useState } from 'react';

export default function Register() {

  const [formValue, setFormValue] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
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
            value={username} />

        <input 
            type="email" 
            name="email" 
            placeholder='Email'
            onChange={handleChange} 
            value={email} />
        
        <input
            type="password"
            name="password"
            placeholder='Senha'
            onChange={handleChange}
            value={password} />
        
        <input
            type="password"
            name="confirmPassword"
            placeholder='Confirmar Senha'
            onChange={handleChange}
            value={confirmPassword} />
        
        <button>Cadastrar</button>
        </form>
    </div>
  );
}