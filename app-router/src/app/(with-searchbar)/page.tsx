import MovieItem from '@/components/MovieItem';
import movies from '@/mock/movies.json';
import style from './page.module.css';

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h2>지금 가장 추천하는 영화</h2>
        <div className={style.recommendList}>
          {movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
      <section>
        <h2>등록된 모든 영화</h2>
        <div className={style.movieList}>
          {movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
