import React from 'react';
import Link from 'next/link';

export default function TestPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Test Page</h1>
      <p className="mb-4">This is a test page to verify that routing is working correctly.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go to Home Page
      </Link>
    </div>
  );
} 
