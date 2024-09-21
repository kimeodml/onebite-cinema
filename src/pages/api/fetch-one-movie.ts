import { MovieData } from '@/types';

export default async function fetchOneMovie(
  id: number,
): Promise<MovieData | null> {
  const url = `https://onebite-cinema-api-red.vercel.app/movie/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
