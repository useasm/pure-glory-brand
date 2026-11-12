import { useState, type FormEvent } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../store/AuthContext';

type Mode = 'login' | 'register' | 'reset';

const TITLES: Record<Mode, string> = {
  login: 'Sign in',
  register: 'Sign up',
  reset: 'Reset password',
};

export function AuthPanel() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [resetSent, setResetSent] = useState(false);

  const switchLink = (target: Mode, label: string) => (
    <button
      type="button"
      className="cursor-pointer border-none bg-transparent p-0 underline"
      style={{
        color: 'var(--text-secondary)',
        fontSize: 'var(--fs-small)',
        textUnderlineOffset: 4,
      }}
      onClick={() => {
        setMode(target);
        setResetSent(false);
      }}
    >
      {label}
    </button>
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get('email') ?? '');
    const password = String(data.get('password') ?? '');
    const name = String(data.get('name') ?? '');

    if (mode === 'login') login(email, password);
    if (mode === 'register') register(name, email, password);
    if (mode === 'reset') setResetSent(true);
  };

  return (
    <div className="anim-fade-up flex flex-col gap-7" key={mode}>
      <div>
        <div
          className="font-display"
          style={{ fontSize: 'var(--fs-display-m)' }}
        >
          {TITLES[mode]}
        </div>
        <p
          className="mt-2"
          style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-small)' }}
        >
          {mode === 'login' &&
            'Your orders, addresses, bonuses and early access to new pieces.'}
          {mode === 'register' &&
            'An account keeps your order history and gets you early access to new work.'}
          {mode === 'reset' &&
            'Enter your email and I will send a reset link.'}
        </p>
      </div>

      {resetSent ? (
        <div
          className="anim-fade px-4 py-5"
          style={{
            border: '1px solid var(--border-hairline-strong)',
            fontSize: 'var(--fs-small)',
          }}
        >
          Email sent. Check your inbox, and the spam folder just in case.
        </div>
      ) : (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          {mode === 'register' && (
            <Input name="name" label="Name" placeholder="What should I call you" required />
          )}
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="you@domain.com"
            required
          />
          {mode !== 'reset' && (
            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              required
              minLength={4}
            />
          )}
          <Button variant="primary" type="submit" className="mt-2">
            {mode === 'login' && 'Sign in'}
            {mode === 'register' && 'Create account'}
            {mode === 'reset' && 'Send link'}
          </Button>
        </form>
      )}

      <div
        className="flex flex-col gap-2 pt-4"
        style={{ borderTop: '1px solid var(--border-hairline)' }}
      >
        {mode !== 'login' && switchLink('login', 'I already have an account')}
        {mode !== 'register' && switchLink('register', 'Create an account')}
        {mode === 'login' && switchLink('reset', 'Forgot your password?')}
      </div>

      <p style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-muted)' }}>
        Demo: any credentials work. An email starting with admin@ opens the
        admin panel.
      </p>
    </div>
  );
}
