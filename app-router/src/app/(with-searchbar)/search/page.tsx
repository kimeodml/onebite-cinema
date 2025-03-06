import style from '@/app/(with-searchbar)/search/Search.module.css';
import MovieItem from '@/components/MovieItem';
import MovieListSkeleton from '@/components/skeleton/MovieListSkeleton';
import { MovieData } from '@/types';
import { Metadata } from 'next';
import { Suspense } from 'react';

export function generateMetadata({
  searchParams,
}: {
  searchParams: {
    q: string;
  };
}): Metadata {
  return {
    title: `한입 시네마 검색 : ${searchParams.q}`,
    description: `${searchParams.q}의 검색 결과입니다.`,
    openGraph: {
      title: `한입 시네마 검색 : ${searchParams.q}`,
      description: `${searchParams.q}의 검색 결과입니다.`,
      images: ['/thumbnail.png'],
    },
  };
}

async function SearchResult({ q }: { q: string }) {
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
