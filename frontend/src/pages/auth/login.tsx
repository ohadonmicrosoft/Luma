import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Layout } from "@/components/layout/Layout";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Here you would make an API call to authenticate the user
      console.log("Login attempt with:", { email, password });

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // On successful login, redirect to the dashboard or home page
      router.push("/account/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Sign In | Luma</title>
        <meta name="description" content="Sign in to your Luma account" />
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
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
