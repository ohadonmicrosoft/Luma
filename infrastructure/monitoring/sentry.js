/**
 * Sentry configuration for Luma e-commerce platform
 * 
 * This file contains the configuration for Sentry, which is used for:
 * - Error tracking and monitoring
 * - Performance monitoring
 * - Session replay
 * - Release tracking
 */

const Sentry = require('@sentry/node');
const { ProfilingIntegration } = require('@sentry/profiling-node');

const initSentry = (app) => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    integrations: [
      // Enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // Enable Express.js middleware tracing
      new Sentry.Integrations.Express({ app }),
      // Enable Node.js profiling
      new ProfilingIntegration(),
    ],
    // Performance monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    // Set sampling rate for profiling
    profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    // Capture 100% of errors in development, 10% in production
    sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    // Set a uniform sample rate for all users
    tracesSampler: (samplingContext) => {
      // Checkout and payment routes should always be monitored
      if (samplingContext.request && samplingContext.request.url) {
        const url = samplingContext.request.url;
        if (url.includes('/checkout') || url.includes('/payment')) {
          return 1.0;
        }
      }
      return process.env.NODE_ENV === 'production' ? 0.1 : 1.0;
    },
    // Capture breadcrumbs for better debugging
    maxBreadcrumbs: 50,
    // Sanitize sensitive data
    beforeSend: (event) => {
      // Don't send events in test environment
      if (process.env.NODE_ENV === 'test') {
        return null;
      }
      
      // Sanitize sensitive data
      if (event.request && event.request.data) {
        // Remove sensitive fields
        const sensitiveFields = ['password', 'credit_card', 'card_number', 'cvv'];
        sensitiveFields.forEach(field => {
          if (event.request.data[field]) {
            event.request.data[field] = '[REDACTED]';
          }
        });
      }
      
      return event;
    }
  });

  // The request handler must be the first middleware
  app.use(Sentry.Handlers.requestHandler());
  
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());
  
  // The error handler must be registered before any other error middleware
  // and after all controllers
  app.use(Sentry.Handlers.errorHandler());
};

module.exports = { initSentry }; 
