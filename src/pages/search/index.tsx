import SearchableLayout from '@/components/searchable-layout';
import { ReactNode } from 'react';
import MovieItem from '@/components/movie-item';
import style from './search.module.css';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchMovies from '@/lib/fetch-movies';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const q = context.query.q as string;
  const movies = await fetchMovies(q);

  return {
    props: { movies },
  };
};
export default function Page({
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
