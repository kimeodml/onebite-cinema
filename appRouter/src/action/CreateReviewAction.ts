'use server';

import { delay } from '@/util/delay';
import { revalidateTag } from 'next/cache';

export default async function CreateReviewAction(_: any, formData: FormData) {
  const author = formData.get('author')?.toString();
  const content = formData.get('content')?.toString();
  const movieId = formData.get('movieId')?.toString();

  if (!author || !content || !movieId) {
    return {
      status: false,
      error: '리뷰 내용, 작성자를 입력해야 합니다.',
    };
  }

  try {
    await delay(1500);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({ movieId, content, author }),
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag(`review-${movieId}`);

    return {
      status: true,
      error: '',
    };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다. : ${error}`,
    };
  }
}
