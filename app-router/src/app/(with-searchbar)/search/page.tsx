import style from '@/app/(with-searchbar)/search/Search.module.css';
import MovieItem from '@/components/MovieItem';
import { MovieData } from '@/types';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    q: string;
  };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${searchParams.q}`,
  );

  if (!response.ok) return <div>오류가 발생했습니다...</div>;

  const movies: MovieData[] = await response.json();

  return (
    <div className={style.searchList}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
