import { Params } from '@angular/router';
import { createAction, props } from '@ngrx/store';
import {
  Product,
  ProductModel,
} from '../../web/shared/interface/product.interface';
import { Review } from '../../web/shared/interface/review.interface';
import { QuestionAnswers } from '../../web/shared/interface/questions-answers.interface';

export const GetProducts = createAction(
  '[NXT] Get Products',
  props<{ status: number; ids: string }>()
);
export const GetProductsSuccess = createAction(
  '[NXT] Get Products Success',
  props<{ result: ProductModel }>()
);
export const GetProductsFailure = createAction(
  '[NXT] Get Products Failure',
  props<{ error: { message: string } }>()
);

export const GetProductBySlug = createAction(
  '[NXT] Get Product By Slug',
  props<{ slug: string }>()
);
export const GetProductBySlugSuccess = createAction(
  '[NXT] Get Product By Slug Success',
  props<{ product: Product }>()
);
export const GetProductBySlugFailure = createAction(
  '[NXT] Get Product By Slug Failure',
  props<{ error: { message: string } }>()
);

export const GetRelatedProducts = createAction(
  '[NXT] Get Related Products',
  props<{ payload: Params }>()
);
export const GetRelatedProductsSuccess = createAction(
  '[NXT] Get Related Products Success',
  props<{ products: Product[] }>()
);
export const GetRelatedProductsFailure = createAction(
  '[NXT] Get Related Products Failure',
  props<{ error: { message: string } }>()
);

export const GetReviews = createAction(
  '[NXT] Get Reviews',
  props<{ product_id: number }>()
);
export const GetReviewsSuccess = createAction(
  '[NXT] Get Reviews Success',
  props<{ reviews: Review[] }>()
);
export const GetReviewsFailure = createAction(
  '[NXT] Get Reviews Failure',
  props<{ error: { message: string } }>()
);

// TODO
export const SendReview = createAction('[NXT] Send Review');
// TODO
export const UpdateReview = createAction('[NXT] Update Review');

export const GetQuestionAnswers = createAction(
  '[NXT] Get QuestionAnswers',
  props<{ product_id: number }>()
);
export const GetQuestionAnswersSuccess = createAction(
  '[NXT] Get QuestionAnswers Success',
  props<{ questionAnswers: QuestionAnswers[] }>()
);
export const GetQuestionAnswersFailure = createAction(
  '[NXT] Get QuestionAnswers Failure',
  props<{ error: { message: string } }>()
);

// TODO
export const SendQuestion = createAction('[NXT] Send Question');
// TODO
export const UpdateQuestionAndAnswer = createAction(
  '[NXT] Update Question And Answer'
);

export const Feedback = createAction(
  '[NXT] Feedback',
  props<{ question_id: number; reaction: string }>()
);
// TODO
export const FeedbackSuccess = createAction(
  '[NXT] Feedback Success',
  props<{ questionAnswers: QuestionAnswers[] }>()
);
export const FeedbackFailure = createAction(
  '[NXT] Feedback Failure',
  props<{ error: { message: string } }>()
);
