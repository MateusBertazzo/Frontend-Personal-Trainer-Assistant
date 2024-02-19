'use client'

import Image from 'next/image';
import Logo from '../../public/logo.png';
import { ChangeEvent } from 'react';
import { useState } from 'react';

export default function Login() {

  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
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

  const {username, password} = formValue;
  return (
    <div className='box-signup'>
      <form className='form-signup'>
        <Image src={Logo} alt="Logo" width={220} />
        <input
          type="text"
          name="username"
          placeholder='Usuario ou Email'
          onChange={handleChange} 
          value={username} />
        <div className='div-password'>
          <input
            type="password"
            name="password"
            placeholder='Senha'
            onChange={handleChange}
            value={password} />
        <a href="/">Esqueci minha senha.</a>
      </div>
        <button>Entrar</button> 
      </form>
    </div>
  );
}