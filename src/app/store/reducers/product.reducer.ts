import { createReducer, on } from '@ngrx/store';
import { NxtProductActions } from '../actions';
import { Product } from '../../web/shared/interface/product.interface';
import { Review } from '../../web/shared/interface/review.interface';
import { QuestionAnswers } from '../../web/shared/interface/questions-answers.interface';

export interface NxtProductState {
  product: {
    data: Product[];
    total: number;
  };
  selectedProduct: Product | null;
  categoryProducts: Product[];
  relatedProducts: Product[];
  storeProducts: Product[];
  dealProducts: Product[];
  reviews: Review[];
  questionAnswers: QuestionAnswers[]; // Adjust type as necessary
}

export const initialState: NxtProductState = {
  product: {
    data: [],
    total: 0,
  },
  selectedProduct: null,
  categoryProducts: [],
  relatedProducts: [],
  storeProducts: [],
  dealProducts: [],
  reviews: [],
  questionAnswers: [],
};

export const productReducer = createReducer(
  initialState,
  on(NxtProductActions.GetProducts, (state) => ({
    ...state,
  })),
  on(NxtProductActions.GetProductsSuccess, (state, { result }) => ({
    ...state,
    product: {
      data: result.data,
      total: result?.total
        ? result?.total
        : result.data
        ? result.data.length
        : 0,
    },
  })),
  // Cleanup the selected product and related products on failure
  // Alson on, Leaving this product page!
  on(NxtProductActions.GetProductBySlugSuccess, (state, { product }) => ({
    ...state,
    selectedProduct: product,
  })),
  on(NxtProductActions.GetRelatedProductsSuccess, (state, { products }) => ({
    ...state,
    relatedProducts: products,
  })),
  on(NxtProductActions.GetReviews, (state) => ({
    ...state,
  })),
  // Clearout the reviews as we navigate away from the product details page
  on(NxtProductActions.GetReviewsSuccess, (state, { reviews }) => ({
    ...state,
    reviews,
  })),
  on(NxtProductActions.GetReviewsFailure, (state, { error }) => ({
    ...state,
    reviews: [],
  })),
  on(NxtProductActions.GetQuestionAnswers, (state) => ({
    ...state,
  })),
  // Clearout the questionAnswers as we navigate away from the product details page
  on(
    NxtProductActions.GetQuestionAnswersSuccess,
    (state, { questionAnswers }) => ({
      ...state,
      questionAnswers,
    })
  ),
  on(NxtProductActions.GetQuestionAnswersFailure, (state, { error }) => ({
    ...state,
    questionAnswers: [],
  })),
  // Throught API:
  on(NxtProductActions.Feedback, (state, { question_id, reaction }) => {
    const answer = state.questionAnswers.find((qna) => qna.id === question_id);
    if (!answer) {
      return state; // If no answer found, return current state
    }

    const questionAnswers = state.questionAnswers.map((qna) => {
      if (qna.id === question_id) {
        const currentReaction = qna.reaction;
        if (currentReaction === reaction) {
          // If the same reaction is clicked, remove it
          return {
            ...qna,
            reaction: null,
            total_likes:
              qna.total_likes - (currentReaction === 'liked' ? 1 : 0),
            total_dislikes:
              qna.total_dislikes - (currentReaction === 'disliked' ? 1 : 0),
          };
        } else {
          // Update the reaction and counts
          return {
            ...qna,
            reaction,
            total_likes:
              qna.total_likes +
              (reaction === 'liked' ? 1 : 0) -
              (currentReaction === 'liked' ? 1 : 0),
            total_dislikes:
              qna.total_dislikes +
              (reaction === 'disliked' ? 1 : 0) -
              (currentReaction === 'disliked' ? 1 : 0),
          };
        }
      }
      return qna; // Return other answers unchanged
    });

    return {
      ...state,
      questionAnswers,
    };
  })
);
