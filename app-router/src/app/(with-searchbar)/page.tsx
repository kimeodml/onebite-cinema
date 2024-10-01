import MovieItem from '@/components/MovieItem';
import style from './page.module.css';
import { MovieData } from '@/types';
import MovieItemSkeleton from '@/components/skeleton/MovieItemSkeleton';
import { Suspense } from 'react';
import { delay } from '@/util/delay';
import MovieListSkeleton from '@/components/skeleton/MovieListSkeleton';

async function AllMovies() {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    {
      cache: 'force-cache',
    },
  );

  if (!response.ok) return <div>오류가 발생했습니다...</div>;

  const movies: MovieData[] = await response.json();

  return (
    <div className={style.movieList}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

async function RandomMovies() {
  await delay(2000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    {
      next: { revalidate: 3 },
    },
  );

  if (!response.ok) return <div>오류가 발생했습니다...</div>;

  const movies: MovieData[] = await response.json();

  return (
    <div className={style.recommendList}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h2>지금 가장 추천하는 영화</h2>
        <Suspense fallback={<MovieItemSkeleton type="random" />}>
          <RandomMovies />
        </Suspense>
      </section>
      <section>
        <h2>등록된 모든 영화</h2>
        <Suspense fallback={<MovieListSkeleton count={4} type="all" />}>
          <AllMovies />
        </Suspense>
      </section>
    </div>
  );
}
