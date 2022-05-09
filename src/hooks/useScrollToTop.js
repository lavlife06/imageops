import React, { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../context/images/imagesContext';

const useScrollToTop = () => {
  const { imagesList } = useGlobalContext();

  const [scrollToTopBtnVisible, setScrollToTopBtnVisible] = useState(false);

  const contentRef = useRef(null);

  const toggleVisible = () => {
    if (contentRef.current) {
      const scrolled = contentRef.current.scrollTop;
      if (scrolled > 300) {
        setScrollToTopBtnVisible(true);
      } else if (scrolled <= 300) {
        setScrollToTopBtnVisible(false);
      }
    }
  };

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const contentRefValue = contentRef.current;

    if (!contentRef.current) {
      const contentNode = document.querySelector('.imagecontainer');
      contentRef.current = contentNode;
      if (contentNode) {
        contentNode.addEventListener('scroll', toggleVisible);
      }
    }

    return () => {
      if (contentRefValue) {
        contentRefValue.removeEventListener('scroll', () => {});
      }
    };
  }, [imagesList]);

  return { scrollToTopBtnVisible, scrollToTop };
};

export default useScrollToTop;
