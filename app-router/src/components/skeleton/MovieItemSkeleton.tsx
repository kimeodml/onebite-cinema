import style from './MovieItemSkeleton.module.css';

type coverImageType = 'random' | 'all';

interface MovieItemSkeletonProps {
  type: coverImageType;
}

export default function MovieItemSkeleton({ type }: MovieItemSkeletonProps) {
  if (type === 'all') {
    return (
      <div className={style.all_container}>
        <div className={style.all_img}></div>
        <div className={style.all_img}></div>
        <div className={style.all_img}></div>
        <div className={style.all_img}></div>
        <div className={style.all_img}></div>
      </div>
    );
  } else {
    return (
      <div className={style.random_container}>
        <div className={style.random_img}></div>
        <div className={style.random_img}></div>
        <div className={style.random_img}></div>
      </div>
    );
  }
}
