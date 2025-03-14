import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout/Layout';

export default function IndexPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the home page
    router.replace('/home');
  }, [router]);
  
  return (
    <Layout>
      <div className="container mx-auto p-8 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Luma</h1>
          <p className="mb-4">Redirecting to home page...</p>
          <div className="animate-spin h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    </Layout>
  );
} 
