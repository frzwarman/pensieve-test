export const getEvolutionChain = async (url: string) => {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch evolution chain');
  return res.json();
};
