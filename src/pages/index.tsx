import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import MovieItem from '@/components/movie-item';
import style from './index.module.css';
import fetchMovies from '@/lib/fetch-movies';
import { InferGetServerSidePropsType } from 'next';
import fetchRandomMovies from '@/lib/fetch-random-movies';

export const getServerSideProps = async () => {
  const [allMovies, randomMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);
  return {
    props: { allMovies, randomMovies },
  };
};
export default function Home({
  allMovies,
  randomMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      <section>
        <h2>지금 가장 추천하는 영화</h2>
        <div className={style.recommendList}>
          {randomMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
      <section>
        <h2>등록된 모든 영화</h2>
        <div className={style.movieList}>
          {allMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
