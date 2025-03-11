import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout/Layout';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  
  const handleResetPassword = async (password: string) => {
    setIsLoading(true);
    try {
      // Here you would make an API call to reset the password using the token and new password
      console.log('Password reset with token:', token, 'New password length:', password.length);
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // The form will show a success message after successful reset
      setIsLoading(false);
    } catch (error) {
      console.error('Password reset failed:', error);
      // Handle error
      setIsLoading(false);
    }
  };
  
  // If no token is provided in the URL, show an error message
  if (!token && typeof window !== 'undefined') {
    return (
      <Layout>
        <Head>
          <title>Invalid Reset Link | Luma</title>
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
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
              <h2 className="text-3xl font-bold text-neutral-800 mb-4">Invalid Reset Link</h2>
              <p className="text-neutral-600 mb-6">
                The password reset link is invalid or has expired. Please request a new password reset link.
              </p>
              <a
                href="/auth/forgot-password"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Request New Link
              </a>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Head>
        <title>Reset Password | Luma</title>
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
            <ResetPasswordForm
              onSubmit={handleResetPassword}
              token={token as string}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
} 
