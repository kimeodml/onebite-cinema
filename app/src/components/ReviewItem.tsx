import { ReviewData } from '@/types';
import style from '@/components/ReviewItem.module.css';
import ReviewItemDeleteButton from './ReviewItemDeleteButton';

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  movieId,
}: ReviewData) {
  return (
    <div className={style.container}>
      <div className={style.container_top}>
        <span>{author}</span>
        <span>{`${new Date(createdAt).toLocaleDateString()}일 작성됨`}</span>
      </div>
      <div>{content}</div>
      <ReviewItemDeleteButton reviewId={id} movieId={movieId} />
    </div>
  );
}
