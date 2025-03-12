import React, { useState } from 'react';
import Link from 'next/link';
import { AccountLayout } from '@/components/account/AccountLayout';
import { Button } from '@/components/ui/Button';

interface SubscriptionItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface Subscription {
  id: string;
  status: 'active' | 'paused' | 'cancelled';
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'bimonthly' | 'quarterly';
  nextDeliveryDate: string;
  lastDeliveryDate?: string;
  startDate: string;
  items: SubscriptionItem[];
  totalPrice: number;
  autoRenew: boolean;
}

// Mock data for subscriptions
const mockSubscriptions: Subscription[] = [
  {
    id: 'sub-1',
    status: 'active',
    frequency: 'monthly',
    nextDeliveryDate: '2023-06-15',
    lastDeliveryDate: '2023-05-15',
    startDate: '2023-01-15',
    items: [
      {
        id: 'item-1',
        name: 'Premium Coffee Beans',
        price: 24.99,
        quantity: 1,
        imageUrl: '/images/products/coffee.jpg',
      },
      {
        id: 'item-2',
        name: 'Organic Tea Collection',
        price: 18.99,
        quantity: 1,
        imageUrl: '/images/products/tea.jpg',
      },
    ],
    totalPrice: 43.98,
    autoRenew: true,
  },
  {
    id: 'sub-2',
    status: 'paused',
    frequency: 'biweekly',
    nextDeliveryDate: '2023-06-01',
    lastDeliveryDate: '2023-05-15',
    startDate: '2023-02-15',
    items: [
      {
        id: 'item-3',
        name: 'Vitamin Pack',
        price: 35.99,
        quantity: 1,
        imageUrl: '/images/products/vitamins.jpg',
      },
    ],
    totalPrice: 35.99,
    autoRenew: false,
  },
];

// Format date function
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Format frequency function
const formatFrequency = (frequency: string) => {
  switch (frequency) {
    case 'weekly':
      return 'Weekly';
    case 'biweekly':
      return 'Every 2 Weeks';
    case 'monthly':
      return 'Monthly';
    case 'bimonthly':
      return 'Every 2 Months';
    case 'quarterly':
      return 'Every 3 Months';
    default:
      return frequency;
  }
};

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFrequency, setEditFrequency] = useState<string>('');
  const [editAutoRenew, setEditAutoRenew] = useState(false);

  const handlePauseSubscription = (id: string) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === id ? { ...sub, status: 'paused' as const } : sub
      )
    );
  };

  const handleResumeSubscription = (id: string) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === id ? { ...sub, status: 'active' as const } : sub
      )
    );
  };

  const handleCancelSubscription = (id: string) => {
    if (confirm('Are you sure you want to cancel this subscription?')) {
      setSubscriptions(
        subscriptions.map((sub) =>
          sub.id === id ? { ...sub, status: 'cancelled' as const } : sub
        )
      );
    }
  };

  const handleRemoveItem = (subscriptionId: string, itemId: string) => {
    if (confirm('Are you sure you want to remove this item from your subscription?')) {
      setSubscriptions(
        subscriptions.map((sub) => {
          if (sub.id === subscriptionId) {
            const updatedItems = sub.items.filter(item => item.id !== itemId);
            const totalPrice = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            return {
              ...sub,
              items: updatedItems,
              totalPrice
            };
          }
          return sub;
        })
      );
    }
  };

  const handleUpdateQuantity = (subscriptionId: string, itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setSubscriptions(
      subscriptions.map((sub) => {
        if (sub.id === subscriptionId) {
          const updatedItems = sub.items.map(item => 
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          );
          const totalPrice = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
          return {
            ...sub,
            items: updatedItems,
            totalPrice
          };
        }
        return sub;
      })
    );
  };

  const handleEditSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setEditFrequency(subscription.frequency);
    setEditAutoRenew(subscription.autoRenew);
    setShowEditModal(true);
  };

  const handleSaveChanges = () => {
    if (!selectedSubscription) return;
    
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === selectedSubscription.id ? 
          { ...sub, frequency: editFrequency as any, autoRenew: editAutoRenew } : 
          sub
      )
    );
    
    setShowEditModal(false);
    setSelectedSubscription(null);
  };

  const activeSubscriptions = subscriptions.filter(sub => sub.status !== 'cancelled');
  const cancelledSubscriptions = subscriptions.filter(sub => sub.status === 'cancelled');

  return (
    <AccountLayout title="My Subscriptions">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">My Subscriptions</h1>
          <p className="text-neutral-600 mt-1">
            {activeSubscriptions.length} active {activeSubscriptions.length === 1 ? 'subscription' : 'subscriptions'}
          </p>
        </div>

        {activeSubscriptions.length === 0 ? (
          <div className="text-center p-8 border border-dashed border-neutral-300 rounded-lg">
            <svg
              className="mx-auto h-12 w-12 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-neutral-900">No active subscriptions</h3>
            <p className="mt-1 text-sm text-neutral-500">
              You don&apos;t have any active subscriptions at the moment.
            </p>
            <div className="mt-6">
              <Link href="/products?filter=subscription">
                <Button>
                  Browse Subscription Products
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {activeSubscriptions.map((subscription) => (
              <div
                key={subscription.id}
                className="bg-white rounded-lg border border-neutral-200 overflow-hidden"
              >
                <div className="p-6 border-b border-neutral-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                      <div className="text-sm text-neutral-500">Subscription #{subscription.id}</div>
                      <h3 className="text-lg font-medium mt-1">
                        {formatFrequency(subscription.frequency)} Delivery
                      </h3>
                      <div className="mt-1 text-sm text-neutral-600">
                        Started on {formatDate(subscription.startDate)}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:items-end gap-2">
                      <div className="flex items-center">
                        <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                          subscription.status === 'active' 
                            ? 'bg-green-500' 
                            : subscription.status === 'paused' 
                              ? 'bg-amber-500' 
                              : 'bg-red-500'
                        }`}></div>
                        <span className="font-medium text-sm">
                          {subscription.status === 'active' 
                            ? 'Active' 
                            : subscription.status === 'paused' 
                              ? 'Paused' 
                              : 'Cancelled'}
                        </span>
                      </div>
                      
                      <div className="text-sm">
                        {subscription.status === 'active' ? (
                          <>Next delivery: <span className="font-medium">{formatDate(subscription.nextDeliveryDate)}</span></>
                        ) : subscription.status === 'paused' ? (
                          <>Paused - <span className="font-medium">No upcoming deliveries</span></>
                        ) : (
                          <>Cancelled on {formatDate(subscription.lastDeliveryDate || subscription.startDate)}</>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditSubscription(subscription)}
                    >
                      Edit Subscription
                    </Button>
                    
                    {subscription.status === 'active' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePauseSubscription(subscription.id)}
                      >
                        Pause Deliveries
                      </Button>
                    ) : subscription.status === 'paused' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleResumeSubscription(subscription.id)}
                      >
                        Resume Deliveries
                      </Button>
                    ) : null}
                    
                    {subscription.status !== 'cancelled' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                        onClick={() => handleCancelSubscription(subscription.id)}
                      >
                        Cancel Subscription
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="bg-neutral-50 p-6">
                  <h4 className="font-medium mb-4">Items in this subscription</h4>
                  <div className="space-y-4">
                    {subscription.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-neutral-100 rounded-md flex-shrink-0">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-400">
                              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-grow">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-neutral-500">${item.price.toFixed(2)} each</div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(subscription.id, item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || subscription.status !== 'active'}
                            className="bg-neutral-200 hover:bg-neutral-300 w-6 h-6 rounded-full flex items-center justify-center disabled:opacity-50"
                          >
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          
                          <span className="w-8 text-center">{item.quantity}</span>
                          
                          <button
                            onClick={() => handleUpdateQuantity(subscription.id, item.id, item.quantity + 1)}
                            disabled={subscription.status !== 'active'}
                            className="bg-neutral-200 hover:bg-neutral-300 w-6 h-6 rounded-full flex items-center justify-center disabled:opacity-50"
                          >
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="text-right w-20 font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        
                        <button
                          onClick={() => handleRemoveItem(subscription.id, item.id)}
                          disabled={subscription.status !== 'active' || subscription.items.length <= 1}
                          className="text-neutral-400 hover:text-neutral-600 disabled:opacity-50"
                          aria-label="Remove item"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-neutral-200 flex justify-between">
                    <div className="font-medium">Subscription Total</div>
                    <div className="font-medium">${subscription.totalPrice.toFixed(2)}/delivery</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {cancelledSubscriptions.length > 0 && (
          <div className="pt-4">
            <h2 className="text-xl font-semibold mb-4">Cancelled Subscriptions</h2>
            <div className="space-y-4">
              {cancelledSubscriptions.map((subscription) => (
                <div
                  key={subscription.id}
                  className="bg-white rounded-lg border border-neutral-200 p-6"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-neutral-500">Subscription #{subscription.id}</div>
                      <h3 className="text-lg font-medium mt-1">
                        {formatFrequency(subscription.frequency)} Delivery
                      </h3>
                      <div className="mt-1 text-sm">
                        <span className="text-neutral-500">Started:</span> {formatDate(subscription.startDate)} • 
                        <span className="text-neutral-500"> Cancelled:</span> {formatDate(subscription.lastDeliveryDate || subscription.startDate)}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-medium">${subscription.totalPrice.toFixed(2)}</div>
                      <div className="text-sm text-neutral-500">{subscription.items.length} items</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Edit Subscription Modal */}
      {showEditModal && selectedSubscription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Subscription</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Delivery Frequency
                </label>
                <select
                  value={editFrequency}
                  onChange={(e) => setEditFrequency(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Every 2 Weeks</option>
                  <option value="monthly">Monthly</option>
                  <option value="bimonthly">Every 2 Months</option>
                  <option value="quarterly">Every 3 Months</option>
                </select>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="autoRenew"
                    checked={editAutoRenew}
                    onChange={(e) => setEditAutoRenew(e.target.checked)}
                    className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="autoRenew" className="font-medium text-neutral-700">
                    Auto-renew subscription
                  </label>
                  <p className="text-neutral-500">
                    Your subscription will automatically renew unless cancelled.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedSubscription(null);
                }}
              >
                Cancel
              </Button>
              
              <Button onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  );
} 
