'use client';

import React from 'react';
import { toast } from 'sonner';

interface Props { children: React.ReactNode; }
interface State { hasError: boolean; }

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    toast.error("Something went wrong. Please try refreshing the page.");
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <h2 className="text-xl font-black text-slate-800">Application Error</h2>
          <p className="text-sm text-slate-500 mt-2">The page failed to render correctly.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-2 bg-sky-600 text-white rounded-lg text-xs font-bold"
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}