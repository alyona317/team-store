import { normalizeName } from './normalize-name';

export const makeItemKey = (name: string, unit: string | null): string => {
  return `${normalizeName(name)}::${unit ?? ''}`;
};
