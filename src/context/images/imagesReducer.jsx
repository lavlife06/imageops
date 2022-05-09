import { initialState } from '../../utils/UtilsForImages';
import {
  GET_IMAGES,
  GET_SINGLE_IMAGE_DETAILS,
  SET_FILTERED_IMAGES_LIST,
  SET_IMAGES_ERROR,
  SET_LOADING,
  SET_SINGLE_IMAGE_DETAILS_ERROR,
  SET_SINGLE_IMAGE_DETAILS_LOADING,
} from '../types';

const ImagesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === GET_IMAGES) {
    return {
      ...state,
      imagesList: payload.data,
      paginationState: { ...state.paginationState, page: payload.page },
    };
  } else if (type === SET_LOADING) {
    return {
      ...state,
      loading: payload,
    };
  } else if (type === SET_IMAGES_ERROR) {
    return {
      ...state,
      imagesListError: payload,
    };
  } else if (type === GET_SINGLE_IMAGE_DETAILS) {
    return {
      ...state,
      singleImageDetails: payload ? payload.imagedetails : payload,
      currentImageIndex: payload ? payload.imageindex : state.currentImageIndex,
    };
  } else if (type === SET_SINGLE_IMAGE_DETAILS_LOADING) {
    return {
      ...state,
      singleImageDetailsLoading: payload,
    };
  } else if (type === SET_SINGLE_IMAGE_DETAILS_ERROR) {
    return {
      ...state,
      singleImageDetailsError: payload,
    };
  } else if (type === SET_FILTERED_IMAGES_LIST) {
    return {
      ...state,
      filteredImagesList: payload.list,
      searchString: payload.author_name,
    };
  } else {
    return state;
  }
};

export default ImagesReducer;
