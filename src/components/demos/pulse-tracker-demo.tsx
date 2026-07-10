import { useEffect, useState } from 'react';
import {
  Activity,
  ExternalLink,
  BarChart3,
  Map,
  KanbanSquare,
  CheckCircle2,
  CalendarCheck,
  Check,
  ChevronLeft,
} from 'lucide-react';

/* Interactive miniature of Pulse Tracker: the client portal for GTM
   service businesses. Faithful to the real product modules. */

type Tab = 'campaigns' | 'delivery' | 'placements' | 'approvals' | 'bookings';

/* Campaigns */
const CAMPAIGN_STATS = [
  { label: 'Emails sent', value: '4,100', sub: '+380 this week' },
  { label: 'LinkedIn connects', value: '1,148', sub: '+92 this week' },
  { label: 'Replies', value: '108', sub: '2.1% reply rate', accent: true },
];

const CAMPAIGN_ROWS = [
  { name: 'CFO search · PE-backed', status: 'active', replies: 58, rate: '2.4%' },
  { name: 'Series B talent leads', status: 'active', replies: 39, rate: '1.9%' },
  { name: 'Dormant CRM revival', status: 'paused', replies: 11, rate: '3.1%' },
];

/* Delivery roadmap */
const MILESTONES = [
  { day: 0, label: 'Kickoff', tasks: 6, done: 6 },
  { day: 14, label: 'Systems built', tasks: 9, done: 9 },
  { day: 30, label: 'Campaigns live', tasks: 8, done: 6 },
  { day: 60, label: 'Optimize', tasks: 7, done: 2 },
  { day: 90, label: 'Scale', tasks: 5, done: 0 },
];

/* Placements */
const STAGES = ['Sourced', 'Screen', 'Interview', 'Placed'];
const STATIC_CANDIDATES = [
  { name: 'A. Novak', stage: 0 },
  { name: 'M. Chen', stage: 1 },
  { name: 'S. Okafor', stage: 2 },
];
const HOT_CANDIDATE = 'J. Rivera';

/* Bookings */
const SLOT_TIMES = ['09:30', '11:00', '14:30'];

const PulseTrackerDemo = () => {
  const [tab, setTab] = useState<Tab>('campaigns');

  /* campaigns: TAM bar fills on open */
  const [tamOn, setTamOn] = useState(false);
  useEffect(() => {
    if (tab !== 'campaigns') return;
    setTamOn(false);
    const t = setTimeout(() => setTamOn(true), 150);
    return () => clearTimeout(t);
  }, [tab]);

  /* delivery: clickable milestones */
  const [milestone, setMilestone] = useState(2);

  /* placements: hot candidate advances */
  const [hotStage, setHotStage] = useState(0);
  useEffect(() => {
    if (tab !== 'placements') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setHotStage(STAGES.length - 1);
      return;
    }
    setHotStage(0);
    const timer = setInterval(() => setHotStage((prev) => (prev + 1) % STAGES.length), 2000);
    return () => clearInterval(timer);
  }, [tab]);

  /* approvals */
  const [approval, setApproval] = useState<'pending' | 'approved' | 'changes'>('pending');

  /* bookings */
  const [slot, setSlot] = useState<{ day: string; time: string } | null>(null);
  const [booked, setBooked] = useState(false);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'campaigns', label: 'Campaigns', icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { id: 'delivery', label: 'Delivery', icon: <Map className="w-3.5 h-3.5" /> },
    { id: 'placements', label: 'Placements', icon: <KanbanSquare className="w-3.5 h-3.5" /> },
    { id: 'approvals', label: 'Approvals', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { id: 'bookings', label: 'Bookings', icon: <CalendarCheck className="w-3.5 h-3.5" /> },
  ];

  const activeMilestone = MILESTONES[milestone];
  const milestonePct = Math.round((activeMilestone.done / activeMilestone.tasks) * 100);

  return (
    <div className="rounded-xl bg-card border border-border shadow-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-border">
        <span className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
          <Activity className="w-4 h-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground leading-tight">Pulse Tracker</p>
          <p className="text-[10.5px] text-muted-foreground">The client portal for GTM service businesses</p>
        </div>
        <a
          href="https://pulse-tracker-site.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-hover transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Full product site
        </a>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition-colors shrink-0 ${
              tab === t.id
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-4 min-h-[320px]">
        {/* Campaigns */}
        {tab === 'campaigns' && (
          <div className="space-y-3 animate-fade-up">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-foreground">Acme Search · Outbound</p>
              <p className="text-[10px] text-muted-foreground">Synced 2h ago · auto-syncs daily</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {CAMPAIGN_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-lg border p-2.5 ${
                    stat.accent ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border'
                  }`}
                >
                  <p className={`text-[9.5px] font-semibold uppercase tracking-wide ${stat.accent ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {stat.label}
                  </p>
                  <p className="text-lg font-bold tabular-nums leading-tight">{stat.value}</p>
                  <p className={`text-[10px] ${stat.accent ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{stat.sub}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-border p-3 space-y-1.5">
              <div className="flex items-center justify-between text-[10.5px]">
                <span className="font-semibold text-muted-foreground uppercase tracking-wide">TAM penetration</span>
                <span className="font-semibold text-foreground">71% of 6,200</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                  style={{ width: tamOn ? '71%' : '0%' }}
                />
              </div>
            </div>
            <div className="rounded-lg border border-border divide-y divide-border">
              {CAMPAIGN_ROWS.map((row) => (
                <div key={row.name} className="flex items-center gap-2 px-3 py-2 text-xs">
                  <span className="font-medium text-foreground flex-1 truncate">{row.name}</span>
                  <span
                    className={`text-[9.5px] font-semibold uppercase px-1.5 py-0.5 rounded-full ${
                      row.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {row.status}
                  </span>
                  <span className="tabular-nums text-muted-foreground w-16 text-right">{row.replies} replies</span>
                  <span className="tabular-nums text-foreground w-10 text-right font-medium">{row.rate}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delivery roadmap */}
        {tab === 'delivery' && (
          <div className="space-y-5 animate-fade-up">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-foreground">90-day roadmap · Day 34</p>
              <span className="text-[10px] font-semibold uppercase tracking-wide bg-success/10 text-success px-2 py-0.5 rounded-full">
                on pace
              </span>
            </div>
            <div className="relative mt-2 mx-2">
              <div className="h-1.5 rounded-full bg-muted" />
              <div className="absolute inset-y-0 left-0 h-1.5 rounded-full bg-primary" style={{ width: '38%' }} />
              {MILESTONES.map((ms, i) => (
                <button
                  key={ms.day}
                  type="button"
                  onClick={() => setMilestone(i)}
                  aria-label={ms.label}
                  className={`absolute -top-2.5 -translate-x-1/2 w-7 h-7 rounded-full border-2 text-[9px] font-bold transition-all ${
                    ms.day <= 34 ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border'
                  } ${milestone === i ? 'scale-125 shadow-md' : 'hover:scale-110'}`}
                  style={{ left: `${(ms.day / 90) * 100}%` }}
                >
                  {ms.day}
                </button>
              ))}
            </div>
            <div key={milestone} className="rounded-lg border border-border p-3.5 space-y-2 animate-fade-up mt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">
                  Day {activeMilestone.day} · {activeMilestone.label}
                </p>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {activeMilestone.done}/{activeMilestone.tasks} tasks
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${milestonePct}%` }} />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {milestone === 2
                  ? 'Instantly + HeyReach connected, first two campaigns sending. Copy testing this week.'
                  : milestone < 2
                    ? 'Completed. Every task, owner, and blocker logged for the client to see.'
                    : 'Auto-created from the delivery playbook the moment a client is added.'}
              </p>
            </div>
            <p className="text-[11px] text-muted-foreground">Click the milestones. Clients see this exact view.</p>
          </div>
        )}

        {/* Placements */}
        {tab === 'placements' && (
          <div className="space-y-3 animate-fade-up">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-foreground">VP Engineering · FinTech client</p>
              <span className="text-[10px] text-muted-foreground">4 candidates</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {STAGES.map((stage, stageIndex) => (
                <div key={stage} className="rounded-lg bg-muted/60 border border-border p-2 space-y-1.5 min-h-[120px]">
                  <p className={`text-[9px] font-semibold uppercase tracking-wider ${stageIndex === 3 ? 'text-success' : 'text-muted-foreground'}`}>
                    {stage}
                  </p>
                  {hotStage === stageIndex && (
                    <div key={hotStage} className={`rounded-md border shadow-sm p-1.5 animate-fade-up ${hotStage === 3 ? 'bg-success/10 border-success' : 'bg-card border-primary'}`}>
                      <p className="text-[10.5px] font-semibold text-foreground flex items-center gap-1">
                        {HOT_CANDIDATE}
                        {hotStage === 3 && <Check className="w-3 h-3 text-success" strokeWidth={3.5} />}
                      </p>
                    </div>
                  )}
                  {STATIC_CANDIDATES.filter((c) => c.stage === stageIndex).map((c) => (
                    <div key={c.name} className="rounded-md bg-card border border-border p-1.5">
                      <p className="text-[10.5px] font-medium text-foreground">{c.name}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p key={hotStage} className="text-xs text-muted-foreground animate-fade-up">
              {hotStage === 3 ? (
                <span>
                  <span className="font-medium text-success">{HOT_CANDIDATE} placed.</span> Client notified, shortlist archived.
                </span>
              ) : (
                <span>
                  <span className="font-medium text-primary">{HOT_CANDIDATE}</span> moved to{' '}
                  <span className="font-medium text-foreground">{STAGES[hotStage]}</span>.
                </span>
              )}{' '}
              Public application links feed this board; shortlists export as client-ready PDFs.
            </p>
          </div>
        )}

        {/* Approvals */}
        {tab === 'approvals' && (
          <div className="space-y-3 animate-fade-up">
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-muted/60 border-b border-border">
                <p className="text-xs font-semibold text-foreground">LinkedIn post · placement story</p>
                <span
                  className={`text-[9.5px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                    approval === 'approved'
                      ? 'bg-success/10 text-success'
                      : approval === 'changes'
                        ? 'bg-term-amber/15 text-term-amber'
                        : 'bg-primary/10 text-primary'
                  }`}
                >
                  {approval === 'approved' ? 'Approved' : approval === 'changes' ? 'Changes requested' : 'Awaiting client'}
                </span>
              </div>
              <div className="px-3.5 py-3 text-sm text-foreground/85 leading-relaxed space-y-1.5">
                <p>We placed a VP of Engineering in 19 days.</p>
                <p className="text-muted-foreground">
                  Not because we got lucky. Because our client stopped writing job specs like legal
                  documents and started selling the mission... <span className="text-muted-foreground/60">[+214 more words]</span>
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 px-3.5 py-3 border-t border-border">
                {approval === 'pending' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setApproval('approved')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-success text-white hover:bg-success/85 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" strokeWidth={3} /> Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => setApproval('changes')}
                      className="px-3 py-1.5 rounded-md text-xs font-medium border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      Request changes
                    </button>
                    <span className="ml-auto text-[10px] text-muted-foreground uppercase tracking-wide">Client-side view</span>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-muted-foreground">
                      {approval === 'approved'
                        ? 'Approved. The team gets notified and it moves to the publish queue.'
                        : 'Sent back with a note. The writer sees exactly what to change.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setApproval('pending')}
                      className="ml-auto px-3 py-1.5 rounded-md text-xs font-medium border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      Reset demo
                    </button>
                  </>
                )}
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Clients approve with one click. No more chasing sign-off through email threads.
            </p>
          </div>
        )}

        {/* Bookings */}
        {tab === 'bookings' && (
          <div className="space-y-3 animate-fade-up">
            {!booked ? (
              <>
                <p className="text-xs font-semibold text-foreground">Book a call with your delivery team</p>
                <div className="grid grid-cols-3 gap-2">
                  {['Mon 13', 'Tue 14', 'Wed 15'].map((day, dayIndex) => (
                    <div key={day} className="space-y-1.5">
                      <p className="text-[10px] font-semibold text-center text-muted-foreground">{day}</p>
                      {SLOT_TIMES.map((time, slotIndex) => {
                        const free = (dayIndex + slotIndex) % 3 !== 1;
                        const selected = slot?.day === day && slot?.time === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            disabled={!free}
                            onClick={() => setSlot({ day, time })}
                            className={`w-full text-[11px] font-medium rounded-md border px-1 py-1.5 transition-colors ${
                              selected
                                ? 'bg-primary text-primary-foreground border-primary'
                                : free
                                  ? 'border-border text-foreground hover:border-primary hover:text-primary'
                                  : 'border-transparent bg-muted text-muted-foreground/50 cursor-not-allowed line-through'
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={!slot}
                  onClick={() => setBooked(true)}
                  className="w-full py-2 rounded-md text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary-hover transition-colors disabled:opacity-40"
                >
                  {slot ? `Confirm ${slot.day} at ${slot.time} (demo)` : 'Pick a slot'}
                </button>
                <p className="text-[11px] text-muted-foreground">
                  The in-house booking engine that replaced Calendly: live Google Calendar
                  availability, reschedule and cancel links, timezone handling.
                </p>
              </>
            ) : (
              <div className="text-center space-y-3 py-6">
                <div className="mx-auto w-10 h-10 rounded-full bg-success/10 text-success flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  Booked: {slot?.day} at {slot?.time}
                </p>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                  In production: calendar invite sent, reminders scheduled, reschedule link
                  in the client's inbox.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setBooked(false);
                    setSlot(null);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-hover transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Book another (demo)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PulseTrackerDemo;
