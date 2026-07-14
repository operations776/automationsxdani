import { useEffect, useRef, useState } from 'react';
import { Instagram, MessageCircle, Play, RotateCcw, Check } from 'lucide-react';

/* Legal intake automation: DMs land from Instagram, TikTok, and
   Messenger, ManyChat captures them, AI qualifies and drafts the reply,
   evidence gets collected, follow-ups run, and the case lands in the
   CRM. Around the clock. */

const CHANNELS = [
  { id: 'ig', label: 'Instagram', icon: <Instagram className="w-3.5 h-3.5" /> },
  { id: 'tt', label: 'TikTok', icon: <MessageCircle className="w-3.5 h-3.5" /> },
  { id: 'ms', label: 'Messenger', icon: <MessageCircle className="w-3.5 h-3.5" /> },
];

interface Beat {
  who: 'them' | 'system';
  text: string;
  note?: string;
}

const BEATS: Beat[] = [
  { who: 'them', text: 'Hi, I was in an accident last week. Do I have a case?', note: 'Instagram DM, 2:14am' },
  { who: 'system', text: 'Captured and qualified. Drafting a reply in the firm\'s voice.' },
  { who: 'system', text: 'Intake questions sent, answers collected in the thread.' },
  { who: 'system', text: 'Photos and documents requested and stored as case evidence.' },
  { who: 'system', text: 'Follow-up sequence armed if they go quiet.' },
  { who: 'system', text: 'Case filed into the CRM, ready for a lawyer in the morning.' },
];

const STEP_MS = 1200;

const LegalIntakeFlow = () => {
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  const run = () => {
    stop();
    setStep(0);
    setPlaying(true);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setStep(BEATS.length - 1);
      setPlaying(false);
      return;
    }
    timer.current = setInterval(() => {
      setStep((prev) => {
        if (prev >= BEATS.length - 1) {
          stop();
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, STEP_MS);
  };

  useEffect(() => stop, []);

  const done = step >= BEATS.length - 1;

  return (
    <div className="rounded-2xl bg-card shadow-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-border">
        <p className="text-sm font-bold text-foreground">Intake that never sleeps</p>
        <button
          type="button"
          onClick={run}
          disabled={playing}
          className="ml-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary text-primary-foreground hover:bg-primary-hover transition-colors disabled:opacity-50"
        >
          {step === -1 ? <Play className="w-3 h-3" /> : <RotateCcw className="w-3 h-3" />}
          {step === -1 ? 'A lead comes in' : playing ? 'Running...' : 'Again'}
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* Channels feeding in */}
        <div className="flex items-center gap-2">
          {CHANNELS.map((c) => (
            <span
              key={c.id}
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold border transition-colors ${
                step >= 0
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground'
              }`}
            >
              {c.icon}
              {c.label}
            </span>
          ))}
        </div>

        {/* The conversation */}
        <div className="space-y-2.5 min-h-[190px]">
          {step === -1 ? (
            <p className="text-sm text-muted-foreground leading-relaxed">
              Law firms lose cases to slow replies. Someone messages at 2am, nobody answers
              until morning, and by then they have called someone else. This closes that gap.
            </p>
          ) : (
            BEATS.slice(0, step + 1).map((b, i) =>
              b.who === 'them' ? (
                <div key={i} className="animate-clay-pop">
                  <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5 text-sm text-foreground max-w-[85%]">
                    {b.text}
                  </div>
                  {b.note && <p className="text-[10px] text-muted-foreground mt-1 ml-1">{b.note}</p>}
                </div>
              ) : (
                <div key={i} className="flex items-center gap-2.5 pl-3 animate-clay-pop">
                  <span className="w-5 h-5 rounded-full bg-success/15 text-success flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </span>
                  <p className="text-sm text-foreground/85">{b.text}</p>
                </div>
              ),
            )
          )}
        </div>

        {done && (
          <div className="rounded-xl bg-success/10 px-4 py-2.5 animate-clay-pop">
            <p className="text-xs font-bold text-success">
              Captured, qualified, evidenced, and filed. At 2am, with nobody awake.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalIntakeFlow;
