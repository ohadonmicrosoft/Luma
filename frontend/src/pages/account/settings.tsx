import React, { useState } from 'react';
import { AccountLayout } from '@/components/account/AccountLayout';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  // Profile form state
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phone: '(555) 123-4567',
  });

  // Password form state
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  // Email preferences state
  const [emailPreferences, setEmailPreferences] = useState({
    marketing: true,
    orderUpdates: true,
    promotions: false,
    newProducts: true,
    newsletter: false,
  });

  // Profile form handlers
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user's profile
    alert('Profile updated successfully!');
  };

  // Password form handlers
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value,
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!password.current || !password.new || !password.confirm) {
      alert('All password fields are required.');
      return;
    }
    
    if (password.new !== password.confirm) {
      alert('New passwords do not match.');
      return;
    }
    
    if (password.new.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
    
    // In a real app, this would update the user's password
    alert('Password updated successfully!');
    
    // Reset form
    setPassword({
      current: '',
      new: '',
      confirm: '',
    });
  };

  // Email preferences handlers
  const handleEmailPreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEmailPreferences({
      ...emailPreferences,
      [name]: checked,
    });
  };

  const handleEmailPreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user's email preferences
    alert('Email preferences updated successfully!');
  };

  return (
    <AccountLayout title="Account Settings">
      <div className="space-y-10">
        {/* Profile Information */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </section>
        
        {/* Change Password */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="current" className="block text-sm font-medium text-neutral-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current"
                    name="current"
                    value={password.current}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="new" className="block text-sm font-medium text-neutral-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new"
                    name="new"
                    value={password.new}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    required
                    minLength={8}
                  />
                  <p className="mt-1 text-sm text-neutral-500">
                    Must be at least 8 characters long
                  </p>
                </div>
                
                <div>
                  <label htmlFor="confirm" className="block text-sm font-medium text-neutral-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirm"
                    name="confirm"
                    value={password.confirm}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </section>
        
        {/* Email Preferences */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Email Preferences</h2>
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <form onSubmit={handleEmailPreferencesSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="marketing"
                      name="marketing"
                      checked={emailPreferences.marketing}
                      onChange={handleEmailPreferenceChange}
                      className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="marketing" className="font-medium text-neutral-700">
                      Marketing Communications
                    </label>
                    <p className="text-neutral-500">Receive updates about new features and improvements.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="orderUpdates"
                      name="orderUpdates"
                      checked={emailPreferences.orderUpdates}
                      onChange={handleEmailPreferenceChange}
                      className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="orderUpdates" className="font-medium text-neutral-700">
                      Order Updates
                    </label>
                    <p className="text-neutral-500">Receive updates about your order status and shipping.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="promotions"
                      name="promotions"
                      checked={emailPreferences.promotions}
                      onChange={handleEmailPreferenceChange}
                      className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="promotions" className="font-medium text-neutral-700">
                      Promotions & Discounts
                    </label>
                    <p className="text-neutral-500">Receive exclusive offers, discounts, and promotion codes.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="newProducts"
                      name="newProducts"
                      checked={emailPreferences.newProducts}
                      onChange={handleEmailPreferenceChange}
                      className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="newProducts" className="font-medium text-neutral-700">
                      New Product Announcements
                    </label>
                    <p className="text-neutral-500">Be the first to know about new product launches.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      checked={emailPreferences.newsletter}
                      onChange={handleEmailPreferenceChange}
                      className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="newsletter" className="font-medium text-neutral-700">
                      Weekly Newsletter
                    </label>
                    <p className="text-neutral-500">Receive our weekly newsletter with tips and trends.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">
                  Save Preferences
                </Button>
              </div>
            </form>
          </div>
        </section>
        
        {/* Danger Zone */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>
          <div className="bg-white rounded-lg border border-red-200 p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-red-600">Delete Account</h3>
              <p className="text-neutral-600">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <div>
                <Button 
                  variant="outline" 
                  className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                      // In a real app, this would delete the user's account
                      alert('Account deletion request submitted. We will process your request within 24 hours.');
                    }
                  }}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AccountLayout>
  );
} 
