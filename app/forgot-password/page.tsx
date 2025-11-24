'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [recoveryKey, setRecoveryKey] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(email)) {
      setError('E-mail inválido.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/reset-with-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, recoveryKey, newPassword }),
      });

      if (res.ok) {
        setMessage('Sucesso! A sua senha foi alterada.');
        setTimeout(() => router.push('/login'), 2500);
      } else {
        const text = await res.text();
        setError(text || 'Dados incorretos.');
      }
    } catch {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main id="main-content">
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h1 className="auth-title">Redefinir Senha</h1>

          {message && (
            <p className="auth-success"  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={18} style={{ marginRight: '6px' }} />
              {message}
            </p>
          )}

          <div className="auth-input-group">
            <label>Seu E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
          </div>

          <div className="auth-input-group">
            <label>Palavra de Recuperação</label>
            <input
              type="text"
              required
              value={recoveryKey}
              onChange={(e) => setRecoveryKey(e.target.value)}
              className="auth-input"
              placeholder="A palavra secreta criada no cadastro"
            />
          </div>

          <div className="auth-input-group">
            <label>Nova Senha</label>

            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="auth-input"
              placeholder="Mínimo 6 caracteres"
            />

            <button
              type="button"
              className="auth-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'A atualizar...' : 'Trocar Senha'}
          </button>

          <p className="auth-link" style={{ marginTop: '1rem' }}>
            <Link
              href="/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#c084fc',
                textDecoration: 'none'
              }}
            >
              <ArrowLeft size={16} />
              Voltar ao Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
