'use client';

import { useState } from 'react';
import { languageSwitchUrl } from '@/lib/language-switch';

type Props = {
  locale: string;
  label: string;
  options: { value: string; label: string }[];
};

export function LanguageSwitcher({ locale, label, options }: Props) {
  const [isPending, setPending] = useState(false);

  function onChange(next: string) {
    if (next === locale || !options.some(option => option.value === next)) return;
    setPending(true);
    // Load the destination document and its matching client modules together.
    // Preserve the current task, query parameters, and section anchor.
    window.location.assign(languageSwitchUrl(window.location.href, next, options.map(option => option.value)));
  }

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        className="bg-white text-black border border-black rounded-none px-2 py-1 focus:outline-none focus:ring-1 focus:ring-black"
        value={locale}
        onChange={(e) => onChange(e.target.value)}
        disabled={isPending}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}
