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

export function usePropset({ count = 5 }: { count?: number }) {
  const { data, isLoading, mutate } = useSWR(['/api/generateProps', count], async ([url, c]) => {
    const res = await fetch(`${url}?count=${c}`);
    if (!res.ok) throw new Error('failed');
    return res.json();
  });
  return { data, isLoading, refresh: ()=> mutate() };
}
