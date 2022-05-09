import React, { useReducer } from 'react';
import ImagesReducer from './imagesReducer';
import { ImagesContext } from './imagesContext';
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

const ImagesState = ({ children }) => {
  const [state, dispatch] = useReducer(ImagesReducer, initialState);

  // get images
  const getImages = async (page = 1, limit = 30) => {
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${30}`);
      if (!response.ok) {
        throw Error('something went wrong');
      }
      if (state.imagesListError) {
        dispatch({
          type: SET_IMAGES_ERROR,
          payload: false,
        });
      }
      const data = await response.json();
      let newImagesList;
      if (state.imagesList.length > 0) {
        newImagesList = [...state.imagesList, ...data];
      } else {
        newImagesList = data;
      }
      dispatch({
        type: GET_IMAGES,
        payload: { data: newImagesList, page: page },
      });
    } catch (err) {
      dispatch({
        type: SET_IMAGES_ERROR,
        payload: true,
      });
    }
  };

  // get image details
  const getImageDetails = async (imageid, imageindex) => {
    dispatch({
      type: SET_SINGLE_IMAGE_DETAILS_LOADING,
      payload: true,
    });

    try {
      const response = await fetch(`https://picsum.photos/id/${imageid}/info`);
      if (!response.ok) {
        throw Error('something went wrong');
      }
      if (state.singleImageDetailsError) {
        dispatch({
          type: SET_SINGLE_IMAGE_DETAILS_ERROR,
          payload: false,
        });
      }
      const data = await response.json();
      dispatch({
        type: GET_SINGLE_IMAGE_DETAILS,
        payload: { imagedetails: data, imageindex },
      });
    } catch (err) {
      dispatch({
        type: SET_SINGLE_IMAGE_DETAILS_ERROR,
        payload: true,
      });
      const timer = setTimeout(() => {
        dispatch({
          type: SET_SINGLE_IMAGE_DETAILS_ERROR,
          payload: false,
        });
        clearTimeout(timer);
      }, 2000);
    }

    dispatch({
      type: SET_SINGLE_IMAGE_DETAILS_LOADING,
      payload: false,
    });
  };

  // set filtered list
  const searchAuthors = async (author_name) => {
    dispatch({
      type: SET_LOADING,
      payload: true,
    });

    if (!author_name) {
      dispatch({
        type: SET_FILTERED_IMAGES_LIST,
        payload: { list: [], author_name: '' },
      });
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
      return;
    }
    let filteredimageslist;
    if (state.imagesList.length > 0) {
      filteredimageslist = state.imagesList.filter((imageinfo) =>
        imageinfo.author.toLowerCase().includes(author_name.toLowerCase()),
      );
    } else {
      filteredimageslist = [];
    }
    dispatch({
      type: SET_FILTERED_IMAGES_LIST,
      payload: { list: filteredimageslist, author_name: author_name },
    });

    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  };

  return (
    <ImagesContext.Provider
      value={{
        imagesList: state.imagesList,
        paginationState: state.paginationState,
        loading: state.loading,
        singleImageDetailsLoading: state.singleImageDetailsLoading,
        singleImageDetails: state.singleImageDetails,
        currentImageIndex: state.currentImageIndex,
        singleImageDetailsError: state.singleImageDetailsError,
        imagesListError: state.imagesListError,
        searchString: state.searchString,
        filteredImagesList: state.filteredImagesList,
        getImages,
        getImageDetails,
        dispatch,
        searchAuthors,
      }}>
      {children}
    </ImagesContext.Provider>
  );
};

export default ImagesState;
