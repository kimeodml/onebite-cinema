import SearchableLayout from '@/components/searchable-layout';
import { ReactNode, useEffect, useState } from 'react';
import MovieItem from '@/components/movie-item';
import style from './search.module.css';
import fetchMovies from '@/lib/fetch-movies';
import { useRouter } from 'next/router';
import { MovieData } from '@/types';

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
    <div className={style.recommendList}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
