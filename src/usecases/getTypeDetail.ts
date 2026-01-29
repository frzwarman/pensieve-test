export async function getTypeDetail(type: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  if (!res.ok) throw new Error('Failed to fetch type detail');
  return res.json();
}
