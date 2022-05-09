import { useCallback, useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../context/images/imagesContext';

const useInfiniteScroll = () => {
  const { getImages, loading: imageLoading, paginationState } = useGlobalContext();

  const [paginationLoading, setPaginationLoading] = useState(false);

  const observer = useRef();

  const lastImageElementRef = useCallback(
    (imagenode) => {
      if (imageLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPaginationLoading(() => true);
          getImages(paginationState.page + 1);
        }
      });
      if (imagenode) observer.current.observe(imagenode);
    },
    [imageLoading],
  );

  useEffect(() => {
    getImages(paginationState.page);
  }, []);

  useEffect(() => {
    if (!imageLoading) {
      setPaginationLoading(() => false);
    }
  }, [imageLoading]);

  return { paginationLoading, lastImageElementRef };
};

export default useInfiniteScroll;
