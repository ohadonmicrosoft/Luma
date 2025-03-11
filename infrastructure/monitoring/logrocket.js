/**
 * LogRocket configuration for Luma e-commerce platform
 * 
 * This file contains the configuration for LogRocket, which is used for:
 * - Session replay
 * - Frontend error tracking
 * - User behavior analysis
 * - Performance monitoring
 */

// This file is meant to be imported in the frontend application

const initLogRocket = (userId) => {
  if (typeof window === 'undefined') return;

  // Import LogRocket dynamically to avoid SSR issues
  import('logrocket').then((LogRocket) => {
    // Initialize LogRocket with your app ID
    LogRocket.default.init(process.env.NEXT_PUBLIC_LOGROCKET_APP_ID, {
      release: process.env.NEXT_PUBLIC_APP_VERSION,
      dom: {
        // Don't record input values for these sensitive selectors
        inputSanitizer: true,
        textSanitizer: true,
        // Specific elements to not record
        hideSelectors: [
          'input[type="password"]',
          'input[name="credit-card"]',
          'input[name="cvv"]',
          '.sensitive-data'
        ]
      },
      network: {
        // Don't record request/response bodies for these URLs
        requestSanitizer: (request) => {
          // Sanitize payment API requests
          if (request.url.includes('/api/payment') || request.url.includes('/api/checkout')) {
            request.body = '[REDACTED]';
          }
          return request;
        },
        responseSanitizer: (response) => {
          // Sanitize user data responses
          if (response.url.includes('/api/user') || response.url.includes('/api/profile')) {
            const responseBody = JSON.parse(response.body);
            if (responseBody.email) responseBody.email = '[REDACTED]';
            if (responseBody.phone) responseBody.phone = '[REDACTED]';
            response.body = JSON.stringify(responseBody);
          }
          return response;
        }
      }
    });

    // Identify the user if available
    if (userId) {
      LogRocket.default.identify(userId);
    }

    // Connect LogRocket with Sentry if available
    if (window.Sentry) {
      window.Sentry.configureScope(scope => {
        scope.addEventProcessor(event => {
          event.extra.sessionURL = LogRocket.default.sessionURL;
          return event;
        });
      });
    }
  });
};

export default initLogRocket; 
