import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/images/imagesContext';
import ImageDisplay from './imageDisplay';
import './image.css';
import 'antd/dist/antd.css';
import { Modal, Button, Layout, Spin, Alert } from 'antd';
import { BugOutlined } from '@ant-design/icons';
import SelectedImageView from './selectedImageView';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import useScrollToTop from '../../hooks/useScrollToTop';
import { recursionTillGetToParentNode } from '../../utils/UtilsForImages';
import { isMobileView } from '../../utils/UtilsForImages';
import { GET_SINGLE_IMAGE_DETAILS } from '../../context/types';
const { Content } = Layout;

const ImageContainer = () => {
  const {
    loading,
    imagesList,
    getImageDetails,
    singleImageDetailsLoading,
    singleImageDetails,
    currentImageIndex,
    imagesListError,
    singleImageDetailsError,
    dispatch,
    filteredImagesList,
    searchString,
  } = useGlobalContext();

  const list = searchString ? filteredImagesList : imagesList;

  const [modalVisibility, setModalVisibility] = useState(false);

  //  Custom Hooks
  const { paginationLoading, lastImageElementRef } = useInfiniteScroll();
  const { scrollToTopBtnVisible, scrollToTop } = useScrollToTop();

  const getSelectedImageId = (e) => {
    if (!singleImageDetailsError) {
      if (e.target.className && e.target.className.includes('flexcontainer')) {
        // do nothing
      } else {
        const nodeid = recursionTillGetToParentNode(e.target);
        const imagedata = nodeid.split('-');
        const imageid = imagedata[1];
        const imageindex = imagedata[2];
        getImageDetails(imageid, parseInt(imageindex, 10));
        setModalVisibility(true);
      }
    }
  };

  const nextOrPrev = (next = true) => {
    const valueToBeAdded = next ? 1 : -1;
    const imageindex = parseInt(currentImageIndex, 10) + valueToBeAdded;

    // loop again from the beginning if the index is out of range
    const newImageIndex = imageindex > list.length - 1 ? 0 : imageindex;
    if (imageindex >= 0) {
      dispatch({
        type: GET_SINGLE_IMAGE_DETAILS,
        payload: null,
      });
      const imagedata = list[newImageIndex];
      getImageDetails(imagedata.id, newImageIndex);
    }
  };

  useEffect(() => {
    if (singleImageDetailsError && modalVisibility) {
      setModalVisibility(false);
    }
  }, [singleImageDetailsError]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '92vh',
        }}>
        <Spin size='larger' />
      </div>
    );
  } else if (imagesListError) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '92vh',
          flexDirection: 'column',
          marginRight: '15px',
          marginLeft: '15px',
        }}>
        <BugOutlined style={{ fontSize: '52px', marginBottom: '10px' }} />
        <h1>Something went wrong, please try again in sometime</h1>
      </div>
    );
  } else if (list.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '92vh',
          marginRight: '15px',
          marginLeft: '15px',
        }}>
        <h1>No Data Found</h1>
      </div>
    );
  }

  return (
    <Layout className='layout'>
      {singleImageDetailsError && (
        <Alert
          message='Error'
          description='Something went wrong try again later'
          type='error'
          showIcon
          closable
        />
      )}
      <Content
        className='imagecontainer'
        style={{
          padding: `12px ${isMobileView ? '7px' : '50px'}`,
          height: '92vh',
          overflowY: 'auto',
        }}>
        <div className='site-layout-content'>
          <div className='flexcontainer' onClick={getSelectedImageId}>
            {list.map((imageinfo, index) =>
              list.length === index + 1 && !searchString ? (
                <ImageDisplay
                  ref={lastImageElementRef}
                  imageinfo={imageinfo}
                  key={imageinfo.id}
                  imageIndex={index}
                />
              ) : (
                <ImageDisplay imageinfo={imageinfo} key={imageinfo.id} imageIndex={index} />
              ),
            )}
          </div>
          {paginationLoading && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
              }}>
              <Spin size='large' />
            </div>
          )}
          <button
            className='scrolltotopbtn'
            onClick={scrollToTop}
            style={{ display: !scrollToTopBtnVisible ? 'none' : 'flex' }}>
            &#8593;
          </button>
          <Modal
            visible={modalVisibility}
            title='Image Details'
            onCancel={() => setModalVisibility(false)}
            footer={[
              <Button
                key='prev'
                loading={singleImageDetailsLoading}
                onClick={() => nextOrPrev(false)}>
                Prev
              </Button>,
              <Button
                key='next'
                type='primary'
                loading={singleImageDetailsLoading}
                onClick={nextOrPrev}>
                Next
              </Button>,
            ]}>
            <SelectedImageView
              singleImageDetailsLoading={singleImageDetailsLoading}
              selectedImageInfo={singleImageDetails}
            />
          </Modal>
        </div>
      </Content>
    </Layout>
  );
};

export default ImageContainer;
