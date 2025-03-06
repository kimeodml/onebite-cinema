'use client';

import CreateReviewAction from '@/action/CreateReviewAction';
import style from '@/components/ReviewEditor.module.css';
import { useActionState, useEffect } from 'react';

export default function ReviewEditor({ movieId }: { movieId: string }) {
  const [state, formAction, isPending] = useActionState(
    CreateReviewAction,
    null,
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={style.form} action={formAction}>
        <input type="number" name="movieId" value={movieId} hidden />
        <textarea
          className={style.content}
          required
          name="content"
          placeholder="리뷰 내용"
          disabled={isPending}
        />
        <div className={style.form_bottom}>
          <input
            className={style.author}
            required
            type="text"
            name="author"
            placeholder="작성자"
            disabled={isPending}
          />
          <button disabled={isPending} className={style.button} type="submit">
            {isPending ? '...' : '작성하기'}
          </button>
        </div>
      </form>
    </section>
  );
}
