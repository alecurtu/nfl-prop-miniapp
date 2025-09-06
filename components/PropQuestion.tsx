'use client';
import React from 'react';
import { clsx } from 'clsx';

export type Q = {
  id: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  default?: number;
  units?: string;
};

export function PropQuestion({ q, value, onChange }: { q: Q, value?: number, onChange: (v:number)=>void }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="font-medium">{q.label}</label>
        <span className="text-sm text-neutral-500">{value ?? q.default}{q.units ? ` ${q.units}` : ''}</span>
      </div>
      <input
        type="range"
        min={q.min}
        max={q.max}
        step={q.step ?? 1}
        value={value ?? q.default ?? q.min}
        onChange={(e)=> onChange(Number(e.target.value))}
        className={clsx("w-full accent-black")}
      />
      <div className="flex justify-between text-xs text-neutral-500">
        <span>{q.min}{q.units ? ` ${q.units}` : ''}</span>
        <span>{q.max}{q.units ? ` ${q.units}` : ''}</span>
      </div>
    </div>
  );
}
