import CreateReviewAction from '@/action/CreateReviewAction';
import style from '@/components/ReviewEditor.module.css';

export default async function ReviewEditor({ movieId }: { movieId: string }) {
  return (
    <section>
      <form className={style.form} action={CreateReviewAction}>
        <input type="number" name="movieId" value={movieId} hidden />
        <textarea
          className={style.content}
          required
          name="content"
          placeholder="리뷰 내용"
        />
        <div className={style.form_bottom}>
          <input
            className={style.author}
            required
            type="text"
            name="author"
            placeholder="작성자"
          />
          <button className={style.button} type="submit">
            작성하기
          </button>
        </div>
      </form>
    </section>
  );
}
