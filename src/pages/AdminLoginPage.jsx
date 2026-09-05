import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogoMark } from '../components/common/LogoMark';
import { FormField } from '../components/common/FormField';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { OrnateCorner, GoldDivider } from '../components/common/DecorativeElements';
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
      setError('மின்னஞ்சல் மற்றும் கடவுச்சொல்லை உள்ளிடவும் (Please enter email & password).');
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
      setError(err.message || 'உள்நுழைவதில் பிழை ஏற்பட்டது. தகவல்களை சரிபார்க்கவும்.');
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
        backgroundColor: 'var(--ivory)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.25rem',
        position: 'relative'
      }}
    >
      {/* Back to Site Link */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
        <Link
          to="/"
          className="btn btn-secondary btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <ArrowLeft size={16} />
          <span>தளத்திற்கு திரும்பு (Back to Website)</span>
        </Link>
      </div>

      <div
        className="card-ornate"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '2.5rem 2rem',
          backgroundColor: 'var(--paper)',
          border: '2px solid var(--gold-500)',
          boxShadow: 'var(--shadow-hover)',
          position: 'relative'
        }}
      >
        <OrnateCorner position="top-left" />
        <OrnateCorner position="top-right" />

        {/* Card Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <LogoMark size={64} className="mx-auto" />
          <h1 className="font-tamil-serif" style={{ fontSize: '1.4rem', color: 'var(--maroon-950)', marginTop: '0.75rem', marginBottom: '0.2rem' }}>
            {BRAND.tamilName}
          </h1>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'var(--maroon-900)', color: 'var(--gold-100)', padding: '0.2rem 0.75rem', borderRadius: 'var(--radius-pill)', fontSize: '0.75rem', fontWeight: 700, marginTop: '0.35rem' }}>
            <ShieldCheck size={13} />
            <span>நிர்வாக உள்நுழைவு (Admin Login)</span>
          </div>
        </div>

        {/* Error Notification */}
        <ErrorBanner message={error} onDismiss={() => setError(null)} />

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">
              <span className="form-label-tamil">நிர்வாக மின்னஞ்சல் (Admin Email)</span>
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
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--maroon-700)' }} />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label className="form-label" htmlFor="admin-password">
              <span className="form-label-tamil">கடவுச்சொல் (Password)</span>
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
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--maroon-700)' }} />
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
                  padding: '4px'
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem' }}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                <span>உள்நுழைகிறது... (Authenticating...)</span>
              </>
            ) : (
              <>
                <KeyRound size={18} />
                <span>உள்நுழைக (Sign In to Admin)</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Mode / Helper Box */}
        {!isFirebaseConfigured && (
          <div
            style={{
              marginTop: '1.75rem',
              padding: '1rem',
              backgroundColor: 'var(--cream)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              fontSize: '0.8rem'
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--maroon-900)', marginBottom: '0.35rem' }}>
              💡 டெமோ பயன்முறை (Local Demo Credentials):
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
              தானாக நிரப்புக (Auto-fill Demo Credentials)
            </button>
          </div>
        )}

        <GoldDivider />

        <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--muted)' }}>
          பாதுகாப்பான Firebase நிர்வாக அங்கீகாரம்
        </div>
      </div>
    </div>
  );
}
