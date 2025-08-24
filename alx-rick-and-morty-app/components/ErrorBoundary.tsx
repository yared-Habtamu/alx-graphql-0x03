import React, { ReactNode, ErrorInfo } from 'react'; 
import * as Sentry from '@sentry/react';
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    // Store the error itself in the state.
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Sentry.captureException(error, { extra: errorInfo });

    // Optionally, you can also log to the console for debugging purposes
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          <h2>Something went wrong.</h2>
          <p>{this.state.error ? this.state.error.message : 'An unknown error occurred.'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;