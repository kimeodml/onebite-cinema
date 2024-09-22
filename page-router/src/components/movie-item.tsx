import { MovieData } from '@/types'
import style from '@/components/movie-item.module.css'
import Link from 'next/link'

export default function MovieItem({ id, posterImgUrl }: MovieData) {
  return (
    <Link href={`/movie/${id}`} className={style.container}>
      <img src={posterImgUrl} />
    </Link>
  )
}
