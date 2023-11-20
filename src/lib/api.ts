const API_KEY = import.meta.env.VITE_MARVEL_API_KEY;

export default async function nameSearch(name: string = '') {
  let url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${API_KEY}`;

  if(name.length) url += `&nameStartsWith=${encodeURIComponent(name)}`;

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching Marvel data:", error);
    return null;
  }
}
