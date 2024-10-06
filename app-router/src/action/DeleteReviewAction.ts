'use server';

import { delay } from '@/util/delay';
import { revalidateTag } from 'next/cache';

export default async function DeleteReviewAction(_: any, formData: FormData) {
  const reviewId = formData.get('reviewId')?.toString();
  const movieId = formData.get('movieId')?.toString();

  if (!reviewId) {
    return {
      status: false,
      error: '삭제할 리뷰가 없습니다.',
    };
  }

  try {
    await delay(1500);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      {
        method: 'DELETE',
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
      error: `리뷰 삭제에 실패했습니다. : ${error}`,
    };
  }
}
