import { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Check } from 'lucide-react';

/* Multi-entity invoice processing: an invoice lands, AI reads it,
   assigns the GL code, tax treatment, and the right entity, then files
   it into Xero. Four entities across four regions, roughly 20 a day. */

const ENTITIES = [
  { code: 'NA', label: 'North America', tax: 'Sales tax' },
  { code: 'SA', label: 'South America', tax: 'IVA' },
  { code: 'EU', label: 'Europe', tax: 'VAT' },
  { code: 'AS', label: 'Asia', tax: 'GST' },
];

interface Step {
  text: string;
  tone: 'dim' | 'text' | 'ok';
}

const STEPS: Step[] = [
  { text: 'Invoice arrives in the inbox as a PDF', tone: 'text' },
  { text: 'AI reads it: supplier, line items, currency, totals', tone: 'dim' },
  { text: 'Matched to the right legal entity', tone: 'text' },
  { text: 'GL code and tax treatment assigned for that entity', tone: 'text' },
  { text: 'Filed into Xero, no human touched it', tone: 'ok' },
];

const STEP_MS = 1100;
/* which entity this run routes to, so the demo shows a real decision */
const TARGET = 2; // Europe

const toneClass: Record<Step['tone'], string> = {
  dim: 'text-muted-foreground',
  text: 'text-foreground/85',
  ok: 'text-success',
};

const InvoiceFlow = () => {
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
      setStep(STEPS.length - 1);
      setPlaying(false);
      return;
    }
    timer.current = setInterval(() => {
      setStep((prev) => {
        if (prev >= STEPS.length - 1) {
          stop();
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, STEP_MS);
  };

  useEffect(() => stop, []);

  const routed = step >= 2;
  const done = step >= STEPS.length - 1;

  return (
    <div className="rounded-2xl bg-card shadow-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-border">
        <p className="text-sm font-bold text-foreground">Invoice routing, four entities</p>
        <button
          type="button"
          onClick={run}
          disabled={playing}
          className="ml-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary text-primary-foreground hover:bg-primary-hover transition-colors disabled:opacity-50"
        >
          {step === -1 ? <Play className="w-3 h-3" /> : <RotateCcw className="w-3 h-3" />}
          {step === -1 ? 'Process one' : playing ? 'Running...' : 'Again'}
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* The four entities, one lights up */}
        <div className="grid grid-cols-4 gap-2">
          {ENTITIES.map((e, i) => {
            const hit = routed && i === TARGET;
            return (
              <div
                key={e.code}
                className={`rounded-xl border-2 p-2.5 text-center transition-all duration-500 ${
                  hit
                    ? 'border-success bg-success/10 scale-105'
                    : 'border-border bg-muted/40 opacity-60'
                }`}
              >
                <p className={`text-sm font-extrabold font-heading ${hit ? 'text-success' : 'text-muted-foreground'}`}>
                  {e.code}
                </p>
                <p className="text-[9px] text-muted-foreground leading-tight mt-0.5">{e.label}</p>
                {hit && (
                  <p className="text-[9px] font-bold text-success mt-1">{e.tax}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* The run log */}
        <div className="space-y-2 min-h-[132px]">
          {step === -1 ? (
            <p className="text-sm text-muted-foreground leading-relaxed">
              Roughly 20 invoices a day arrived across four legal entities in four regions,
              each with its own tax rules. An outsourced bookkeeping firm handled it by hand.
              This replaced them.
            </p>
          ) : (
            STEPS.slice(0, step + 1).map((s, i) => (
              <div key={i} className={`flex items-start gap-2.5 text-sm animate-clay-pop ${toneClass[s.tone]}`}>
                <span
                  className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                    i === step ? 'bg-primary' : 'bg-border'
                  }`}
                />
                {s.text}
              </div>
            ))
          )}
        </div>

        {done && (
          <div className="flex items-center gap-2 rounded-xl bg-success/10 px-4 py-2.5 animate-clay-pop">
            <Check className="w-4 h-4 text-success shrink-0" strokeWidth={3} />
            <p className="text-xs font-bold text-success">
              Hours of manual entry, down to minutes. Misroutes near zero.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceFlow;
