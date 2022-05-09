import React from 'react';
import { Card, Spin } from 'antd';
import 'antd/dist/antd.css';
import { isMobileView } from '../../utils/UtilsForImages';

const SelectedImageView = ({ selectedImageInfo, singleImageDetailsLoading }) => {
  const newWidthAccordingToScreenWidth = isMobileView ? isMobileView - 10 : '400px';

  if (singleImageDetailsLoading || !selectedImageInfo) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '431px',
        }}>
        <Spin />
      </div>
    );
  }
  return (
    <Card
      hoverable
      style={{
        width: newWidthAccordingToScreenWidth,
        cursor: 'unset',
      }}
      cover={
        <img
          alt='imagefromapi'
          src={selectedImageInfo?.download_url}
          style={{
            width: newWidthAccordingToScreenWidth,
            height: '300px',
          }}
        />
      }>
      <div className='footerofcard'>
        <div className='code-box-title authortitle'>Author</div>
        <p className='cardpelement'>{selectedImageInfo?.author}</p>
      </div>
    </Card>
  );
};

export default SelectedImageView;
