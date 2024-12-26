import { instance } from "../../../core/api/api";

export const createComment = async (productId: string, newReview: { userId?: string; comment: string }) => {
  try {
    const response = await instance.get(`/products/${productId}`);
    const product = response.data;

    const updatedReviews = [
      ...product.reviews,
      {
        id: Date.now().toString(),
        userId: newReview.userId,
        comment: newReview.comment,
      },
    ];

    await instance.put(`/products/${productId}`, { ...product, reviews: updatedReviews });

    return { ...product, reviews: updatedReviews };  
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('Error adding comment');
  }
};