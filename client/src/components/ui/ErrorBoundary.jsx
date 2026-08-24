import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
          <AlertTriangle className="size-10 text-amber-500" aria-hidden="true" />
          <h1 className="text-xl font-bold text-slate-900 dark:text-zinc-100">
            कुछ ग़लत हो गया · Something went wrong
          </h1>
          <button
            onClick={() => window.location.reload()}
            className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Reload / पुनः लोड करें
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
