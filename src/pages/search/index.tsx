import SearchableLayout from '@/components/searchable-layout';
import { ReactNode, useEffect, useState } from 'react';
import MovieItem from '@/components/movie-item';
import style from './search.module.css';
import fetchMovies from '@/pages/api/fetch-movies';
import { useRouter } from 'next/router';
import { MovieData } from '@/types';
import Head from 'next/head';

export default function Page() {
  const [movies, setMoives] = useState<MovieData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchMovies(q as string);
    setMoives(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <>
      <Head>
        <title>한입 씨네마 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 씨네마" />
        <meta
          property="og:description"
          content="한입 씨네마에 등록된 다양한 영화들을 만나보세요."
        />
      </Head>
      <div className={style.recommendList}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
