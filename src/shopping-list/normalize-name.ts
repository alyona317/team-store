export const normalizeName = (name: string): string => {
  return name.trim().toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ');
};
