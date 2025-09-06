'use client';
import React, { useState } from 'react';
import { Users, X } from 'lucide-react';

export function InviteFriends() {
  const [open, setOpen] = useState(false);
  const sample = Array.from({ length: 12 }).map((_,i)=> ({
    fid: 1000 + i,
    username: `friend_${i+1}`,
    pfp: `https://api.dicebear.com/8.x/identicon/svg?seed=${i+1}`
  }));

  return (
    <>
      <button className="btn-ghost" onClick={()=> setOpen(true)}>
        <Users className="w-4 h-4 mr-2" /> Invite Friends
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="card max-w-lg w-full relative">
            <button className="absolute right-3 top-3" onClick={()=> setOpen(false)}><X className="w-5 h-5" /></button>
            <h3 className="text-lg font-semibold mb-3">Invite friends</h3>
            <input className="input mb-3" placeholder="Search Farcaster…" />
            <div className="grid grid-cols-4 gap-3">
              {sample.map(f => (
                <button key={f.fid} className="flex flex-col items-center gap-2">
                  <img src={f.pfp} className="w-12 h-12 rounded-full" />
                  <span className="text-xs">{f.username}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button className="btn-primary" onClick={()=> alert('Invites sent via Neynar!')}>Send Invites</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
