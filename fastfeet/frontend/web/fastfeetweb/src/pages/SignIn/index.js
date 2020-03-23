import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet-logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .required('Senha é obrigatória')
    .min(6, 'A senha precisa de no mínimo 6 catacteres'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="FastFeet" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input
          name="email"
          label="SEU E-MAIL"
          type="email"
          placeholder="exemplo@email.com"
        />
        <Input
          name="password"
          label="SUA SENHA"
          type="password"
          placeholder="********"
        />
        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no Sistema'}
        </button>
      </Form>
    </>
  );
}
