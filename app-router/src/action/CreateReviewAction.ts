'use server';

export default async function CreateReviewAction(formData: FormData) {
  const author = formData.get('author')?.toString();
  const content = formData.get('content')?.toString();
  const movieId = formData.get('movieId')?.toString();

  if (!author || !content || !movieId) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({ movieId, content, author }),
      },
    );
  } catch (error) {
    console.log(error);
    return;
  }
}
