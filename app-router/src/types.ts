export interface MovieData {
  id: number;
  title: string;
  releaseDate: string;
  company: string;
  genres: string[];
  subTitle: string;
  description: string;
  runtime: number;
  posterImgUrl: string;
}

export interface ReviewData {
  id: number;
  content: string;
  author: string;
  createdAt: string;
  movieId: number;
}
