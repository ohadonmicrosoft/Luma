import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout/Layout';
import { RegisterForm, RegisterFormData } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRegister = async (userData: RegisterFormData) => {
    setIsLoading(true);
    try {
      // Here you would make an API call to register the user
      console.log('Register attempt with:', userData);
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // On successful registration, redirect to the login page or dashboard
      router.push('/auth/login?registered=true');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <Head>
        <title>Create Account | Luma</title>
        <meta name="description" content="Create a new Luma account" />
      </Head>
      <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="relative h-12 w-32 mx-auto">
            <Image
              src="/logo.svg"
              alt="Luma"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </Layout>
  );
} 
