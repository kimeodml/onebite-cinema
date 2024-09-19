import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import style from './[id].module.css';
import fetchOneMovie from '@/lib/fetch-one-movie';
import fetchMovies from '@/lib/fetch-movies';
import { useRouter } from 'next/router';

export const getStaticPaths = async () => {
  const movies = await fetchMovies();
  return {
    paths: movies.map((movie) => ({ params: { id: String(movie.id) } })),
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }
  return {
    props: { movie },
  };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return '로딩중';
  if (!movie) return '문제가 발생했습니다. 다시 시도하세요.';

  const {
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <div className={style.container}>
      <div
        className={style.posterImgUrl}
        style={{ backgroundImage: `url('${posterImgUrl}') ` }}
      >
        <img src={posterImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div>
        {releaseDate} / {genres.join(', ')} / {runtime}분
      </div>
      <div>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
