import type { ComponentProps } from 'react';
import { localizedPath } from '@/lib/paths';

// A full document navigation also switches between the root and locale layouts.
export function HomeLink({ locale, ...props }: Omit<ComponentProps<'a'>, 'href'> & { locale: string }) {
  return <a {...props} href={localizedPath(locale)} />;
}
