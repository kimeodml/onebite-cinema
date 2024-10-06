import { ReviewData } from '@/types';
import TrashIcon from '@/assets/svg/trash.svg';
import style from '@/components/ReviewItem.module.css';

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
      <button type="button" className={style.button}>
        <TrashIcon />
        리뷰 삭제하기
      </button>
    </div>
  );
}
