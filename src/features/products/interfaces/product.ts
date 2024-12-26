import { Review } from "./reviews";

export interface Product {
    id: string;
    title: string;
    slogan: string;
    description: string;
    image: string;
    authorId: number;
    categories: string[];
    createdAt: string;
    reviews: Review[];
  }