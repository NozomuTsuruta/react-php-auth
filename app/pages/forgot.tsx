import React from 'react';
import { AuthForm } from '../components/AuthForm';
import { validation } from '../utils';

export default function Forgot() {
  const inputList = [{ name: 'email', validate: validation.email }];

  const linkList = [{ text: 'Sign in', url: '/signin' }];

  return <AuthForm title="forgot" inputList={inputList} linkList={linkList} />;
}
