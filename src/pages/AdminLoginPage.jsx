import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogoMark } from '../components/common/LogoMark';
import { FormField } from '../components/common/FormField';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { BRAND } from '../utils/constants';
import { isFirebaseConfigured } from '../services/firebase';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, Loader2, ArrowLeft, KeyRound } from 'lucide-react';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect to admin dashboard
  useEffect(() => {
    if (user) {
      const origin = location.state?.from?.pathname || '/admin';
      navigate(origin, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await login(email, password);
      const origin = location.state?.from?.pathname || '/admin';
      navigate(origin, { replace: true });
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@ranimatrimony.com');
    setPassword('Admin@123');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--saas-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.25rem',
        position: 'relative'
      }}
    >
      {/* Back to Public Site Link */}
      <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}>
        <Link
          to="/"
          className="btn btn-secondary btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <ArrowLeft size={14} />
          <span>Back to Website</span>
        </Link>
      </div>

      <div
        className="card-clean"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '2.5rem 2rem',
          backgroundColor: '#ffffff',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-card)',
          borderRadius: 'var(--radius-md)'
        }}
      >
        {/* Card Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <LogoMark size={56} className="mx-auto" />
          <h1 className="font-tamil-brand" style={{ fontSize: '1.3rem', color: 'var(--maroon-950)', marginTop: '0.75rem', marginBottom: '0.2rem' }}>
            {BRAND.tamilName}
          </h1>
          <div style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 500 }}>
            Admin Portal Sign In
          </div>
        </div>

        {/* Error Notification */}
        <ErrorBanner message={error} onDismiss={() => setError(null)} />

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">
              <span>Admin Email</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ranimatrimony.com"
                required
                autoComplete="email"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label className="form-label" htmlFor="admin-password">
              <span>Password</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                autoComplete="current-password"
                className="form-input"
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
              />
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--muted)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.8rem' }}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <KeyRound size={16} />
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Mode Notice */}
        {!isFirebaseConfigured && (
          <div
            style={{
              marginTop: '1.5rem',
              padding: '0.85rem 1rem',
              backgroundColor: 'var(--surface-alt)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              fontSize: '0.775rem'
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--maroon-900)', marginBottom: '0.25rem' }}>
              💡 Local Demo Credentials:
            </div>
            <div style={{ color: 'var(--ink)' }}>
              Email: <code>admin@ranimatrimony.com</code>
              <br />
              Password: <code>Admin@123</code>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '0.5rem', width: '100%', fontSize: '0.75rem', padding: '0.3rem' }}
            >
              Auto-fill Demo Credentials
            </button>
          </div>
        )}

        <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--muted)', marginTop: '1.5rem' }}>
          Secure Firebase Authentication System
        </div>
      </div>
    </div>
  );
}
