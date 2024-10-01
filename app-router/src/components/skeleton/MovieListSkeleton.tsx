import MovieItemSkeleton from './MovieItemSkeleton';

type coverImageType = 'random' | 'all';
interface MovieListSkeletonProps {
  count: number;
  type: coverImageType;
}

export default function MovieListSkeleton({
  count,
  type,
}: MovieListSkeletonProps) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => (
      <MovieItemSkeleton key={`movie-list=${idx}`} type={type} />
    ));
}
