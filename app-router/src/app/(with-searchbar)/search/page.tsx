import style from '@/app/(with-searchbar)/search/Search.module.css';
import MovieItem from '@/components/MovieItem';
import MovieItemSkeleton from '@/components/skeleton/MovieItemSkeleton';
import MovieListSkeleton from '@/components/skeleton/MovieListSkeleton';
import { MovieData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';

export async function SearchResult({ q }: { q: string }) {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    {
      cache: 'force-cache',
    },
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

export default function Page({
  searchParams,
}: {
  searchParams: {
    q: string;
  };
}) {
  return (
    <Suspense fallback={<MovieListSkeleton count={2} type="random" />}>
      <SearchResult q={searchParams.q} />
    </Suspense>
  );
}
