import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: 40,
          textAlign: 'center',
        }}>
          <h1 style={{ color: '#ef4444', marginBottom: 12 }}>Что-то пошло не так</h1>
          <p style={{ color: '#a0a0b8', marginBottom: 24, maxWidth: 400, lineHeight: 1.6 }}>
            Произошла ошибка при отображении страницы.
          </p>
          {this.state.error && (
            <pre style={{
              background: '#1a1a2e',
              border: '1px solid #2a2a4a',
              borderRadius: 8,
              padding: '12px 16px',
              color: '#ef4444',
              fontSize: 13,
              maxWidth: '100%',
              overflow: 'auto',
              marginBottom: 24,
            }}>
              {this.state.error.message}
            </pre>
          )}
          <button
            onClick={this.handleReset}
            style={{
              padding: '12px 32px',
              background: 'linear-gradient(135deg, #f59e0b, #e85d04)',
              border: 'none',
              borderRadius: 12,
              color: '#0f0f1a',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Попробовать снова
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
