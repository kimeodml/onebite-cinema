import SearchableLayout from '@/components/searchable-layout'
import { ReactNode } from 'react'
import movies from '@/mock/movies.json'
import MovieItem from '@/components/movie-item'
import style from './search.module.css'

export default function Page() {
  return (
    <div className={style.recommendList}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  )
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
