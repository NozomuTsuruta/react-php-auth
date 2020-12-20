import React, { useState } from 'react';

import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';

type Props = {
  title: 'signin' | 'signup' | 'forgot';
  inputList: { name: string; validate: any }[];
  linkList: { text: string; url: string }[];
};

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const AuthForm: React.FC<Props> = ({ title, inputList, linkList }) => {
  const {
    register,
    handleSubmit,
    reset,
    errors,
    setError,
    clearErrors,
  } = useForm<FormData>();
  const [response, setResponse] = useState<{
    success: 0 | 1;
    message: string;
  }>({ success: 0, message: '' });
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      if (title === 'signup') {
        if (data.password !== data.passwordConfirm) {
          setError('passwordConfirm', {
            type: 'pattern',
            message: '一致しません。',
          });
          return;
        }
        clearErrors('passwordConfirm');
        const res = await axios.post('/signup.php', data);
        if (res.data) {
          setResponse({ success: res.data.success, message: res.data.message });
        } else {
          router.push('/signin');
        }
      } else if (title === 'signin') {
        const res = await axios.post('/signin.php', data);
        if (res.data.success === 1) {
          localStorage.setItem('loginToken', res.data.token);
          const loginToken = localStorage.getItem('loginToken');

          if (loginToken) {
            axios.defaults.headers.common['Authorization'] =
              'bearer ' + loginToken;
            const { data } = await axios.get('/index.php');
            console.log(data);
          }
        }
        setResponse({ success: res.data.success, message: res.data.message });
      } else {
        console.log(data);
      }
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        {title.toUpperCase()}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputList.map(({ name, validate }) => (
          <TextField
            key={name}
            variant="outlined"
            margin="normal"
            fullWidth
            label={name}
            name={name}
            inputRef={register(validate) as any}
            error={`${name}` in errors}
            helperText={
              errors[
                `${name}` as 'name' | 'email' | 'password' | 'passwordConfirm'
              ]?.message
            }
            InputLabelProps={{ shrink: true }}
            type={name.includes('password') ? 'password' : 'text'}
          />
        ))}
        <Button type="submit" fullWidth variant="contained" color="primary">
          {title === 'forgot' ? 'SEND' : title.toUpperCase()}
        </Button>
        <Grid container>
          {linkList.map(({ text, url }) => (
            <Grid item key={text}>
              <Link href={url}>{text}</Link>
            </Grid>
          ))}
        </Grid>
      </form>
    </Container>
  );
};
