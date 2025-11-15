

import { Suspense } from 'react';
import LoginForm from './LoginForm'; 

function LoadingFallback() {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1 className="auth-title">Carregando...</h1>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main id="main-content">
      <Suspense fallback={<LoadingFallback />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}