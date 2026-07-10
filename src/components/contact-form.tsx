import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Check, AlertCircle, Send } from 'lucide-react';
import { EMAIL } from '@/lib/contact';

type Status = 'idle' | 'sending' | 'sent' | 'error';

interface ContactFormProps {
  source?: string;
  onSent?: () => void;
  /* 'card' wraps in a panel; 'bare' just the fields, for use in a dialog */
  variant?: 'card' | 'bare';
}

const ContactForm = ({ source = 'website', onSent, variant = 'card' }: ContactFormProps) => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Something went wrong.');
      }
      setStatus('sent');
      form.reset();
      onSent?.();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  if (status === 'sent') {
    return (
      <div className={variant === 'card' ? 'rounded-2xl bg-card shadow-card p-8 text-center' : 'text-center py-6'}>
        <div className="mx-auto w-12 h-12 rounded-full bg-success/15 text-success flex items-center justify-center mb-4">
          <Check className="w-6 h-6" strokeWidth={3} />
        </div>
        <h3 className="font-heading font-bold text-lg text-foreground mb-1">Message sent</h3>
        <p className="text-sm text-muted-foreground">
          Thanks. A confirmation just landed in your inbox, and I'll get back to you within one business day.
        </p>
      </div>
    );
  }

  const fieldClass =
    'w-full rounded-xl border-2 border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary transition-colors';

  const fields = (
    <form onSubmit={submit} className="space-y-3">
      {/* honeypot: hidden from humans, catches bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid sm:grid-cols-2 gap-3">
        <input name="name" required placeholder="Your name" className={fieldClass} autoComplete="name" />
        <input name="email" type="email" required placeholder="Email" className={fieldClass} autoComplete="email" />
      </div>
      <input name="company" placeholder="Company (optional)" className={fieldClass} autoComplete="organization" />
      <textarea
        name="message"
        required
        rows={4}
        placeholder="What's still manual in your business? What would you like to automate?"
        className={`${fieldClass} resize-none`}
      />

      {status === 'error' && (
        <p className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error} You can also email me at {EMAIL}.
        </p>
      )}

      <Button type="submit" disabled={status === 'sending'} className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-bold">
        {status === 'sending' ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" /> Send message
          </>
        )}
      </Button>
      <p className="text-[11px] text-muted-foreground text-center">
        Goes straight to my inbox. No newsletter, no spam.
      </p>
    </form>
  );

  if (variant === 'bare') return fields;

  return <div className="rounded-2xl bg-card shadow-card p-6 md:p-8">{fields}</div>;
};

export default ContactForm;
