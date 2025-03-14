import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export interface ResetPasswordFormProps {
  onSubmit: (password: string) => void;
  token: string;
  isLoading?: boolean;
}

export function ResetPasswordForm({
  onSubmit,
  token,
  isLoading = false,
}: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: { password?: string; confirmPassword?: string } = {};
    let isValid = true;

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(password);
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center text-neutral-800 mt-6 mb-2">
          Password Reset Successfully
        </h2>
        <p className="text-neutral-600 mb-6">
          Your password has been successfully reset. You can now use your new
          password to log in to your account.
        </p>
        <Link href="/auth/login">
          <Button className="mt-4">Sign in</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center text-neutral-800 mb-3">
        Reset your password
      </h2>
      <p className="text-center text-neutral-600 mb-8">
        Enter your new password below to update your account.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="password"
          label="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          helperText="Must be at least 8 characters long"
          disabled={isLoading}
        />
        <Input
          type="password"
          label="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          disabled={isLoading}
        />
        <input type="hidden" name="token" value={token} />
        <Button type="submit" fullWidth={true} disabled={isLoading}>
          {isLoading ? "Resetting password..." : "Reset password"}
        </Button>
      </form>
      <div className="mt-8 text-center">
        <Link
          href="/auth/login"
          className="text-sm font-medium text-primary-600 hover:text-primary-500"
        >
          ← Back to sign in
        </Link>
      </div>
    </div>
  );
}
