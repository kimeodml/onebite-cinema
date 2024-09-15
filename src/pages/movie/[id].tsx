import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import style from './[id].module.css';
import fetchOneMovie from '@/lib/fetch-one-movie';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));

  return {
    props: { movie },
  };
};

export default function Page({
  movie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
