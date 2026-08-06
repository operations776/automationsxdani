import { useEffect, useRef, useState } from 'react';
import { CHANNELS, FUNNEL, TREND, OUTBOUND_UPDATED } from '@/data/outbound';
import ToolLogo from '../tool-logo';

/* The outbound tracker. Every number here came out of the HeyReach and
   Instantly APIs across the client accounts I run, aggregated. Three
   views: the two channels, the combined funnel, and the real month by
   month ramp. */

type View = 'channels' | 'funnel' | 'trend';

const OutboundTracker = () => {
  const [view, setView] = useState<View>('channels');
  const [live, setLive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* Animate bars in once the card is actually on screen. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLive(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const maxTouches = Math.max(...TREND.map((t) => t.touches));
  const maxFunnel = FUNNEL[0].value;

  const views: { id: View; label: string }[] = [
    { id: 'channels', label: 'By channel' },
    { id: 'funnel', label: 'Funnel' },
    { id: 'trend', label: 'Monthly' },
  ];

  return (
    <div ref={ref} className="rounded-2xl bg-card shadow-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 sm:px-5 py-3 border-b border-border">
        <div className="min-w-0">
          <p className="text-sm font-bold text-foreground leading-tight">Outbound I run</p>
          <p className="text-[10px] text-muted-foreground">
            Live from the campaign tools · {OUTBOUND_UPDATED}
          </p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-bold text-success shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-status-pulse" />
          real data
        </span>
      </div>

      {/* View switch */}
      <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 border-b border-border">
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setView(v.id)}
            className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors ${
              view === v.id
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="p-3.5 sm:p-4 min-h-[268px]">
        {/* Channel split */}
        {view === 'channels' && (
          <div className="grid sm:grid-cols-2 gap-3 animate-clay-pop">
            {CHANNELS.map((c) => (
              <div key={c.id} className="rounded-xl border border-border p-3.5">
                <div className="flex items-center gap-2 mb-3">
                  <ToolLogo src={c.logo} name={c.label} size={18} />
                  <p className="text-xs font-bold text-foreground">{c.label}</p>
                </div>
                <p className="text-2xl font-extrabold font-heading text-primary leading-none">
                  {c.primary.value}
                </p>
                <p className="text-[10px] text-muted-foreground mb-3">{c.primary.label}</p>
                <div className="space-y-1.5">
                  {c.rows.map((r) => (
                    <div key={r.label} className="flex items-baseline justify-between gap-2 text-[11px]">
                      <span className="text-muted-foreground truncate">{r.label}</span>
                      <span className="font-bold text-foreground tabular-nums shrink-0">{r.value}</span>
                    </div>
                  ))}
                </div>
                {c.rows.find((r) => r.note) && (
                  <p className="mt-2.5 text-[10px] text-success font-semibold">
                    {c.rows.find((r) => r.note)?.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Funnel */}
        {view === 'funnel' && (
          <div className="space-y-2.5 animate-clay-pop">
            {FUNNEL.map((step, i) => {
              const pct = (step.value / maxFunnel) * 100;
              return (
                <div key={step.label}>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="text-[11px] font-semibold text-foreground">{step.label}</span>
                    <span className="text-[11px] font-extrabold tabular-nums text-primary">
                      {step.display}
                    </span>
                  </div>
                  <div className="h-5 rounded-lg bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-lg bg-primary transition-all duration-[900ms] ease-out"
                      style={{
                        width: live ? `${Math.max(pct, 4)}%` : '0%',
                        transitionDelay: `${i * 110}ms`,
                        opacity: 1 - i * 0.13,
                      }}
                    />
                  </div>
                </div>
              );
            })}
            <p className="text-[10px] text-muted-foreground pt-1">
              Both channels combined, across every campaign I run.
            </p>
          </div>
        )}

        {/* Monthly trend */}
        {view === 'trend' && (
          <div className="animate-clay-pop">
            <div className="flex items-end gap-[3px] sm:gap-1.5 h-[168px]">
              {TREND.map((t, i) => {
                const h = t.touches === 0 ? 2 : (t.touches / maxTouches) * 100;
                const peak = t.touches === maxTouches;
                return (
                  <div key={t.month} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                    <div className="w-full flex-1 flex items-end">
                      <div
                        title={`${t.short}: ${t.touches.toLocaleString()} touches, ${t.replies} replies`}
                        className={`w-full rounded-t transition-all duration-700 ease-out ${
                          peak ? 'bg-primary' : t.touches === 0 ? 'bg-border' : 'bg-primary/45'
                        }`}
                        style={{
                          height: live ? `${h}%` : '0%',
                          transitionDelay: `${i * 45}ms`,
                        }}
                      />
                    </div>
                    <span className="text-[8px] sm:text-[9px] text-muted-foreground font-semibold">
                      {t.short}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-baseline justify-between gap-2 mt-3 pt-3 border-t border-border">
              <p className="text-[10px] text-muted-foreground">
                LinkedIn touches per month. Gaps are paused campaigns, not missing data.
              </p>
              <p className="text-[10px] font-bold text-primary shrink-0">
                peak {maxTouches.toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutboundTracker;
