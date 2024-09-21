import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import style from './[id].module.css';
import fetchOneMovie from '@/pages/api/fetch-one-movie';
import fetchMovies from '@/pages/api/fetch-movies';
import { useRouter } from 'next/router';
import Head from 'next/head';

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

  if (router.isFallback) {
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
        <div>로딩중</div>
      </>
    );
  }
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
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={posterImgUrl} />
        <meta property="og:title" content={subTitle} />
        <meta property="og:description" content={description} />
      </Head>
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
    </>
  );
}
