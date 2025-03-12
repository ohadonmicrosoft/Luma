import React from 'react';
import Link from 'next/link';
import { AccountLayout } from '@/components/account/AccountLayout';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Mock data for recent orders
const recentOrders = [
  {
    id: '1234',
    date: 'May 10, 2023',
    total: 129.99,
    status: 'Delivered',
    items: 3,
  },
  {
    id: '1233',
    date: 'April 28, 2023',
    total: 89.50,
    status: 'Processing',
    items: 2,
  },
  {
    id: '1232',
    date: 'April 15, 2023',
    total: 52.25,
    status: 'Delivered',
    items: 1,
  },
];

export default function DashboardPage() {
  // In a real application, you would fetch this data from an API
  const user = {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    orders: {
      total: 12,
      completed: 10,
    },
    subscriptions: {
      active: 1,
    },
    points: 450,
  };

  return (
    <AccountLayout title="Account Dashboard" description="View your account overview and recent activity">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-600 mb-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-1">{user.name}</h3>
              <p className="text-sm text-neutral-500">{user.email}</p>
              <Link href="/account/settings">
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                >
                  Edit Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600 mb-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-1">Orders</h3>
              <p className="text-2xl font-bold text-neutral-900">{user.orders.total}</p>
              <p className="text-sm text-neutral-500">{user.orders.completed} completed</p>
              <Link href="/account/orders">
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                >
                  View Orders
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 text-purple-600 mb-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-1">Reward Points</h3>
              <p className="text-2xl font-bold text-neutral-900">{user.points}</p>
              <p className="text-sm text-neutral-500">50 points until next reward</p>
              <Link href="/account/rewards">
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                >
                  View Rewards
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Orders</CardTitle>
            <Link
              href="/account/orders"
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              View all
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Order #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                      #{order.id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {order.date}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {order.items} {order.items === 1 ? 'item' : 'items'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/account/orders/${order.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            {user.subscriptions.active > 0 ? (
              <div className="p-4 bg-primary-50 rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-medium text-primary-900">Premium Soap Bundle</h4>
                    <p className="text-sm text-primary-700">Monthly delivery</p>
                  </div>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                    Active
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-primary-700">Next delivery: June 15, 2023</span>
                  <Link href="/account/subscriptions">
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      Manage
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-neutral-500 mb-4">You don&apos;t have any active subscriptions.</p>
                <Link href="/subscriptions">
                  <Button
                    variant="outline"
                  >
                    Browse Subscriptions
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Saved Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-12 bg-neutral-200 rounded mr-3 flex items-center justify-center">
                    <svg className="h-4 w-4 text-neutral-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.5 4A1.5 1.5 0 001 5.5V8h22V5.5A1.5 1.5 0 0021.5 4h-19z" />
                      <path fillRule="evenodd" d="M1 9h22v9.5a1.5 1.5 0 01-1.5 1.5h-19A1.5 1.5 0 011 18.5V9zm5 7a1 1 0 011-1h3a1 1 0 110 2H7a1 1 0 01-1-1zm7 0a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Visa ending in 4242</p>
                    <p className="text-xs text-neutral-500">Expires 12/25</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                  Default
                </span>
              </div>
            </div>
            
            <Link href="/account/payment-methods">
              <Button
                size="sm"
                variant="outline"
                className="w-full"
              >
                Manage Payment Methods
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  );
} 
