import React from 'react';
import { AuthForm } from '../components/AuthForm';
import { validation } from '../utils';

export default function SignUp() {
  const inputList = [
    { name: 'name', validate: validation.required },
    { name: 'email', validate: validation.email },
    { name: 'password', validate: validation.password },
    { name: 'passwordConfirm', validate: validation.password },
  ];

  const linkList = [
    { text: 'Already have an account? Sign in', url: '/signin' },
  ];

  return <AuthForm title="signup" inputList={inputList} linkList={linkList} />;
}
