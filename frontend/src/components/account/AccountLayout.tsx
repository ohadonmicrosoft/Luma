import React from 'react';
import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { AccountSidebar } from '@/components/account/AccountSidebar';

export interface AccountLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function AccountLayout({ children, title, description }: AccountLayoutProps) {
  return (
    <Layout>
      <Head>
        <title>{title} | Luma</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <div className="bg-neutral-50 py-8">
        <div className="container">
          <h1 className="text-3xl font-bold text-neutral-900 mb-6">{title}</h1>
          
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
            <AccountSidebar />
            
            <main className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
              {children}
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
