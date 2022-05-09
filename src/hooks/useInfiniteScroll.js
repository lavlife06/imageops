import { useCallback, useEffect, useRef } from 'react';
import { useGlobalContext } from '../context/images/imagesContext';

const useInfiniteScroll = (paginationState) => {
  const { getImages, loading: imageLoading } = useGlobalContext();

  const observer = useRef();

  const lastImageElementRef = useCallback(
    (imagenode) => {
      if (imageLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          getImages(paginationState.page + 1);
        }
      });
      if (imagenode) observer.current.observe(imagenode);
    },
    [imageLoading, paginationState],
  );

  useEffect(() => {
    getImages(paginationState.page);
  }, []);

  return { lastImageElementRef };
};

export default useInfiniteScroll;
