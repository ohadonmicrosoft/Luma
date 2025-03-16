/**
 * Accessibility Testing Utility
 * 
 * Integrates axe-core for automated accessibility testing in development mode.
 * This file should only be imported in development environments.
 */

import React from 'react';

export const initA11yTesting = async (): Promise<void> => {
  if (process.env.NODE_ENV !== 'production') {
    try {
      const ReactDOM = await import('react-dom');
      const axe = await import('@axe-core/react');
      
      // Initialize axe-core
      axe.default(React, ReactDOM, 1000, {
        rules: [
          // Additional rule configuration can be added here
        ],
      });
      
      console.log('Accessibility testing initialized with axe-core');
    } catch (error) {
      console.error('Error initializing accessibility testing:', error);
    }
  }
}; 
