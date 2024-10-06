'use client';

import DeleteReviewAction from '@/action/DeleteReviewAction';
import style from '@/components/ReviewItemDeleteButton.module.css';
import { useActionState, useEffect, useRef } from 'react';
import TrashIcon from '@/assets/svg/trash.svg';

export default function ReviewItemDeleteButton({
  reviewId,
  movieId,
}: {
  reviewId: number;
  movieId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    DeleteReviewAction,
    null,
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" value={reviewId} hidden />
      <input name="movieId" value={movieId} hidden />
      {isPending ? (
        <div>...</div>
      ) : (
        <div
          onClick={() => formRef.current?.requestSubmit()}
          className={style.button}
        >
          <TrashIcon />
          리뷰 삭제하기
        </div>
      )}
    </form>
  );
}
