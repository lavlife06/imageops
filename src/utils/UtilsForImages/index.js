export const initialState = {
  imagesList: [],
  filteredImagesList: [],
  paginationState: {
    page: 1,
    limit: 30,
  },
  loading: true,
  paginationLoading: true,
  singleImageDetailsLoading: true,
  imagesListError: false,
  singleImageDetailsError: false,
  singleImageDetails: null,
  currentImageIndex: -1,
  searchString: '',
};

export const recursionTillGetToParentNode = (node) => {
  if (node.id && node.id.includes('parentcard')) {
    return node.id;
  }
  return recursionTillGetToParentNode(node.parentNode);
};

export const isMobileView = window.innerWidth <= 450 ? true : false;

export const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};
