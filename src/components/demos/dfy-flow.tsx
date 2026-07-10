import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, RotateCcw, User } from 'lucide-react';
import ToolLogo from '../tool-logo';

/* Shows what a client's Claude ops manager actually does: pick a
   scenario, watch the steps happen in plain English. No code. */

interface Step {
  logo?: string;
  fallbackName: string;
  text: string;
}

interface Scenario {
  id: string;
  tab: string;
  request: string;
  steps: Step[];
  result: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'sourcing',
    tab: 'Sourcing',
    request: 'Shortlist senior backend engineers for the fintech role.',
    steps: [
      { logo: 'recruiterflow.png', fallbackName: 'ATS', text: 'Searches the ATS talent pool: 214 profiles found' },
      { logo: 'clay.png', fallbackName: 'Clay', text: 'Enriches the top 37 with verified emails' },
      { logo: 'claude.png', fallbackName: 'Claude', text: 'Scores every candidate against the role spec' },
      { logo: 'instantly.png', fallbackName: 'Outreach', text: 'Drafts 4 personalised messages, ready to send' },
    ],
    result: 'A ranked shortlist with outreach drafted, delivered in minutes instead of an afternoon.',
  },
  {
    id: 'bd',
    tab: 'Winning clients',
    request: 'A company in our niche just raised funding. Get us the meeting.',
    steps: [
      { logo: 'exa.png', fallbackName: 'Signals', text: 'Catches the funding announcement the moment it lands' },
      { logo: 'clay.png', fallbackName: 'Clay', text: 'Builds the decision-maker list with verified contacts' },
      { logo: 'claude.png', fallbackName: 'Claude', text: 'Picks the angle from the outbound playbook and writes the sequence' },
      { logo: 'heyreach.png', fallbackName: 'LinkedIn', text: 'Stages email + LinkedIn touches across both channels' },
    ],
    result: 'A signal-based campaign staged for a human yes. Nothing ever sends itself.',
  },
  {
    id: 'report',
    tab: 'Friday report',
    request: "It's Friday. What moved this week?",
    steps: [
      { logo: 'recruiterflow.png', fallbackName: 'ATS', text: 'Counts interviews, offers, and placements from the ATS' },
      { logo: 'claude.png', fallbackName: 'Claude', text: 'Writes the pipeline story, not just the numbers' },
      { logo: 'slack.png', fallbackName: 'Slack', text: 'Posts the recap to the team channel' },
      { logo: 'notion.png', fallbackName: 'Notion', text: 'Updates the client tracker so nothing goes stale' },
    ],
    result: 'The whole team knows what moved without a single status meeting.',
  },
];

const STEP_MS = 750;

const DfyFlow = () => {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [shown, setShown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scenario = SCENARIOS[scenarioIndex];
  const totalTicks = scenario.steps.length + 2; /* request + steps + result */

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const play = useCallback((index: number) => {
    stop();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const total = SCENARIOS[index].steps.length + 2;
    if (reduced) {
      setShown(total);
      return;
    }
    setShown(1);
    timerRef.current = setInterval(() => {
      setShown((prev) => {
        if (prev >= total) {
          stop();
          return prev;
        }
        return prev + 1;
      });
    }, STEP_MS);
  }, []);

  useEffect(() => {
    play(scenarioIndex);
    return stop;
  }, [scenarioIndex, play]);

  const done = shown >= totalTicks;

  return (
    <div className="rounded-xl bg-card border border-border shadow-card overflow-hidden">
      {/* Scenario tabs */}
      <div className="flex items-center gap-1.5 px-4 pt-4 pb-3 border-b border-border flex-wrap">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setScenarioIndex(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              i === scenarioIndex
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
            }`}
          >
            {s.tab}
          </button>
        ))}
        <button
          type="button"
          onClick={() => play(scenarioIndex)}
          aria-label="Replay scenario"
          className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Replay
        </button>
      </div>

      {/* Conversation */}
      <div className="p-5 space-y-3 min-h-[330px]">
        {shown >= 1 && (
          <div className="flex items-start gap-3 animate-fade-up">
            <span className="w-7 h-7 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0">
              <User className="w-3.5 h-3.5" />
            </span>
            <div className="rounded-xl rounded-tl-sm bg-muted px-4 py-2.5 text-sm text-foreground">
              {scenario.request}
              <span className="block text-[10px] text-muted-foreground mt-1">The recruiter, typing one sentence</span>
            </div>
          </div>
        )}

        {scenario.steps.map(
          (step, i) =>
            shown >= i + 2 && (
              <div key={i} className="flex items-center gap-3 pl-10 animate-fade-up">
                <ToolLogo src={step.logo} name={step.fallbackName} size={22} className="border border-border rounded-md bg-card p-0.5" />
                <p className="text-sm text-foreground/85 flex-1">{step.text}</p>
                <span className="w-5 h-5 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
              </div>
            ),
        )}

        {done && (
          <div className="ml-10 rounded-lg border border-success/30 bg-success/5 px-4 py-3 animate-fade-up">
            <p className="text-sm text-foreground font-medium">{scenario.result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DfyFlow;
