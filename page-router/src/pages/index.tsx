import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import MovieItem from '@/components/movie-item';
import style from './index.module.css';
import fetchMovies from '@/pages/api/fetch-movies';
import { InferGetStaticPropsType } from 'next';
import fetchRandomMovies from '@/pages/api/fetch-random-movies';
import Head from 'next/head';

export const getStaticProps = async () => {
  const [allMovies, randomMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);
  return {
    props: { allMovies, randomMovies },
    revalidate: 3,
  };
};
export default function Home({
  allMovies,
  randomMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입 씨네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 씨네마" />
        <meta
          property="og:description"
          content="한입 씨네마에 등록된 다양한 영화들을 만나보세요."
        />
      </Head>
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
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
