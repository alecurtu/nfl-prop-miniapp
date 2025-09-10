'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Share2, Users } from 'lucide-react';
import { usePropset, type PropQ } from '@/lib/nfl';
import { PropQuestion } from '@/components/PropQuestion';
import { PaymentPanel } from '@/components/PaymentPanel';
import { InviteFriends } from '@/components/InviteFriends';
import { submitEntry } from '@/lib/social';
import { v4 as uuid } from 'uuid';
import { useMiniApp } from '@neynar/react';

export default function Home() {
  const { isSDKLoaded, actions } = useMiniApp();
  useEffect(() => {
    if (isSDKLoaded) {
      actions.ready?.();
    }
  }, [isSDKLoaded, actions]);

  const [contestId] = useState(() => uuid());
  const { data: propset, isLoading, refresh } = usePropset({ count: 5 });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const allAnswered = useMemo(
    () => propset?.questions?.every((q: PropQ) => typeof answers[q.id] === 'number'),
    [propset, answers]
  );

  useEffect(() => {
    if (propset?.questions) {
      const init: Record<string, number> = {};
      propset.questions.forEach((q: PropQ) => (init[q.id] = q.default ?? 0));
      setAnswers(init);
    }
  }, [propset?.questions]);

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">NFL Prop Mini App</h1>
        <div className="flex gap-2">
          <button className="btn-ghost" onClick={refresh}>New Props</button>
          <InviteFriends />
        </div>
      </header>

      <section className="card">
        <div className="flex items-start gap-3">
          <Coins className="w-6 h-6" />
          <div>
            <h2 className="text-lg font-semibold">This Week's Contest</h2>
            <p className="text-sm text-neutral-600">Answer 5 quick props. $1 USDC entry. Winners split the pot.</p>
          </div>
        </div>
      </section>

      <section className="card space-y-6">
        {isLoading && <p>Loading props…</p>}
        {!isLoading && propset?.questions?.map((q: PropQ) => (
          <PropQuestion
            key={q.id}
            q={q}
            value={answers[q.id]}
            onChange={(v)=> setAnswers(a => ({...a, [q.id]: v}))}
          />
        ))}
      </section>

      <PaymentPanel
        contestId={contestId}
        disabled={!allAnswered || submitting}
        onPaid={async (txHash:string) => {
          try {
            setSubmitting(true);
            await submitEntry({ contestId, txHash, answers });
            alert('Entry submitted! Share it with friends.');
          } finally {
            setSubmitting(false);
          }
        }}
      />

      <section className="card flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          <p className="text-sm text-neutral-700">Make it a challenge: invite your friends.</p>
        </div>
        <button className="btn-primary" onClick={()=>{
          const url = typeof window !== 'undefined' ? window.location.href : '';
          navigator.clipboard.writeText(url);
          alert('Link copied!');
        }}>
          <Share2 className="w-4 h-4 mr-2" /> Challenge More Friends
        </button>
      </section>
    </main>
  );
}
