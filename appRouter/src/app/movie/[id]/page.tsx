import style from '@/app/movie/[id]/id.module.css';
import ReviewEditor from '@/components/ReviewEditor';
import ReviewItem from '@/components/ReviewItem';
import { MovieData, ReviewData } from '@/types';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}): Promise<Metadata | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${params.id}`,
    {
      cache: 'force-cache',
    },
  );

  if (!response.ok) throw new Error(response.statusText);

  const movie: MovieData = await response.json();

  return {
    title: `${movie.title}`,
    description: `${movie.description}`,
    openGraph: {
      title: `${movie.title}`,
      description: `${movie.description}`,
      images: [movie.posterImgUrl],
    },
  };
}

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const movies: MovieData[] = await response.json();

  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
}

async function MovieDetail({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`,
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
    <section>
      <div
        className={style.posterImgUrl}
        style={{ backgroundImage: `url('${posterImgUrl}') ` }}
      >
        <Image
          priority
          width={250}
          height={350}
          src={posterImgUrl}
          alt={`${title}의 영화 포스터`}
        />
      </div>
      <div className={style.title}>{title}</div>
      <div>
        {releaseDate} / {genres.join(', ')} / {runtime}분
      </div>
      <div>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`,
    {
      next: { tags: [`review-${movieId}`] },
    },
  );

  if (!response.ok)
    throw new Error(`Review fetch failed: ${response.statusText}`);

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div className={style.container}>
      <MovieDetail movieId={params.id} />
      <ReviewEditor movieId={params.id} />
      <ReviewList movieId={params.id} />
    </div>
  );
}
