import React, { useState } from 'react';
import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleForgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // Here you would make an API call to send a password reset email
      console.log('Password reset requested for:', email);
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // The form will show a success message after successful submission
      setIsLoading(false);
    } catch (error) {
      console.error('Password reset request failed:', error);
      // Handle error
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <Head>
        <title>Forgot Password | Luma</title>
        <meta name="description" content="Reset your Luma account password" />
      </Head>
      <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="/logo.svg"
            alt="Luma"
          />
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <ForgotPasswordForm onSubmit={handleForgotPassword} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </Layout>
  );
} 
