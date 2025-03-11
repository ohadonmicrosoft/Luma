import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export interface ForgotPasswordFormProps {
  onSubmit: (email: string) => void;
  isLoading?: boolean;
}

export function ForgotPasswordForm({ onSubmit, isLoading = false }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(email);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <svg
          className="mx-auto h-12 w-12 text-primary-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-center text-neutral-800 mt-6 mb-2">
          Check your email
        </h2>
        <p className="text-neutral-600 mb-6">
          We've sent a password reset link to <span className="font-semibold">{email}</span>.
          Please check your inbox and follow the instructions to reset your password.
        </p>
        <p className="text-neutral-500 text-sm">
          Didn't receive the email?{' '}
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Try again
          </button>{' '}
          or contact{' '}
          <Link href="/support" className="font-medium text-primary-600 hover:text-primary-500">
            customer support
          </Link>
        </p>
        
        <div className="mt-8">
          <Link href="/auth/login" className="text-sm font-medium text-primary-600 hover:text-primary-500">
            ← Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center text-neutral-800 mb-3">Forgot password?</h2>
      <p className="text-center text-neutral-600 mb-8">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          placeholder="you@example.com"
          disabled={isLoading}
        />
        <Button type="submit" fullWidth={true} disabled={isLoading}>
          {isLoading ? 'Sending reset link...' : 'Send reset link'}
        </Button>
      </form>
      <div className="mt-8 text-center">
        <Link href="/auth/login" className="text-sm font-medium text-primary-600 hover:text-primary-500">
          ← Back to sign in
        </Link>
      </div>
    </div>
  );
} 
