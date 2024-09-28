import style from '@/app/movie/[id]/id.module.css';
import { MovieData } from '@/types';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    {
      cache: 'force-cache',
    },
  );

  if (!response.ok) {
    // 빌드 중단을 위한 에러 던지기
    // JSX는 정적 데이터가 아님 따라서 div 태그를 사용 불가
    throw new Error('에러 발생');
  }

  const movies: MovieData[] = await response.json();

  return movies.map((movie) => ({
    id: String(movie.id),
  }));
}

export default async function Page({
  params,
}: {
  params: {
    id: string | string[];
  };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${params.id}`,
    {
      cache: 'force-cache',
    },
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const movie = await response.json();

  const {
    id,
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
