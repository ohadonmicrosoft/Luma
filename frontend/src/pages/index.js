import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Luma Home Page</h1>
      <p className="mb-4">Welcome to Luma - Tactical & Outdoor Equipment</p>
      <p className="mb-4">This is a simplified home page to test routing.</p>
      <Link href="/test" className="text-blue-500 hover:underline">
        Go to Test Page
      </Link>
    </div>
  );
} 
