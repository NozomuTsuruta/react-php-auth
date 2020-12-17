import React from 'react';
import { AuthForm } from '../components/AuthForm';
import { validation } from '../utils';

export default function SignIn() {
  const inputList = [
    { name: 'email', validate: validation.email },
    { name: 'password', validate: validation.password },
  ];

  const linkList = [
    { text: "Don't have an account? Sign Up", url: '/signup' },
    { text: 'Forgot password?', url: '/forgot' },
  ];

  return <AuthForm title="signin" inputList={inputList} linkList={linkList} />;
}
