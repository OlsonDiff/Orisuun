'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import Input from './ui/input';
import Checbox from './ui/checbox';
import Button from './ui/button';
import { useForm } from 'react-hook-form';
import { SigninFormData, signinSchema } from '@/utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import ls from 'localstorage-slim';
import { signinAction } from '@/server-actions/signin';
import Link from 'next/link';
import { createUser } from '@/data/slices/user-slice';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
// import { cookies } from 'next/headers';

const SigninForm = ({
  setIsLoading,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const [remember, setRemember] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: ls.get('userData', { decrypt: true })
        ? ls.get<{ email?: string; password?: string }>('userData', {
          decrypt: true,
        })!.email
        : '',
      password: ls.get('userData')
        ? ls.get<{ email?: string; password?: string }>('userData', {
          decrypt: true,
        })!.password
        : '',
    },
  });

  const onSubmit = async (data: SigninFormData) => {
    try {
      setIsLoading(true);
      if (remember)
        ls.set('userData', data, {
          ttl: 60 * 60 * 4, // expires in 4 hours
          encrypt: true,
        });
      const response = await signinAction(data);

      console.log(response, 'Response');
      if (response.success == false) {
        toast.error(response?.errors?.response?.data?.Message || 'Invalid credentials');
      }

      const responseData = response.data;

      if (responseData?.Message === 'You are not a subscribed member') {
        // dispatch(setUser(responseData.user));
        // dispatch(setPaymentIntent(responseData.paymentIntent));

        toast.error('You are not subscribed');

        // Here you can handle successful signup (e.g., show a success message, redirect user)
        router.push(`/payment?userId=${responseData.Result.Id}`);
      }

      if (responseData?.Message === 'Login Success') {
        toast.success('Logged In Successfully');
        dispatch(createUser(responseData.Result));
        Cookies.set('token', responseData.Result.Token, { path: '/' });
        Cookies.set('userData', JSON.stringify(responseData.Result), { path: '/' });
        localStorage.setItem("userData", JSON.stringify(responseData.Result));

        if (responseData.Result.isBasicProfileDetailExist === false) {
          // Redirect to profile making page
          router.push('/my-profiles/new-profile');
        } else {
          // Redirect to dashboard page
          router.push('/dashboard');
        }
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.Message || 'Invalid credentials');
      setIsLoading(false);
      console.error('An error occurred during signin:', error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2 text-h8 2xl:text-scaled-h8">
        <label htmlFor="email">Email Address</label>

        <Input
          {...register('email')}
          id="email"
          type="email"
          placeholder="example@email.com"
          error={errors.email?.message}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password">Password</label>
        <Input
          {...register('password')}
          id="password"
          type="password"
          placeholder="***********"
          error={errors.password?.message}
        />
      </div>

      <div className="text-h9 2xl:text-scaled-h9 flex md:flex-row flex-col items-start md:items-center justify-between gap-2">
        <Checbox
          id="remember_password"
          checked={remember}
          onChange={(e) => {
            if (e.target.checked) {
              setRemember(true);
            } else {
              setRemember(false);
            }
          }}
        >
          <label htmlFor="remember_password">Remember Password</label>
        </Checbox>
        <Link href={'/forgot-password'}>
          <p className="text-omblue-500">Forgot Password?</p>
        </Link>
      </div>

      <div>
        <Button
          variant="primary"
          className={'py-2 font-normal mb-2'}
          title="Sign in"
        />
      </div>
    </form>
  );
};

export default SigninForm;
