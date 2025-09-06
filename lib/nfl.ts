'use client';
import useSWR from 'swr';

export type PropQ = {
  id: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  default?: number;
  units?: string;
};

export type Propset = {
  game: string;
  questions: PropQ[];
};

export function usePropset({ count = 5 }: { count?: number }) {
  const key = ['/api/generateProps', count] as const;
  const { data, isLoading, mutate } = useSWR<Propset>(key, async () => {
    const res = await fetch(`${key[0]}?count=${key[1]}`);
    if (!res.ok) throw new Error('failed');
    return (await res.json()) as Propset;
  });
  return { data, isLoading, refresh: () => mutate() };
}
