import movies from '@/mock/movies.json';
import style from '@/app/(with-searchbar)/search/Search.module.css';
import MovieItem from '@/components/MovieItem';

export default function Page({
  searchParams,
}: {
  searchParams: {
    q: string;
  };
}) {
  return (
    <div className={style.searchList}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
