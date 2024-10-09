import { MovieData } from '@/types';
import style from '@/components/MovieItem.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function MovieItem({ id, title, posterImgUrl }: MovieData) {
  return (
    <Link href={`/movie/${id}`} className={style.container}>
      <Image
        src={posterImgUrl}
        width={300}
        height={450}
        priority
        alt={`${title}의 영화 포스터`}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </Link>
  );
}
