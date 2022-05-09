import React, { forwardRef } from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css';
import { isMobileView } from '../../utils/UtilsForImages';

const ImageDisplay = forwardRef(({ imageinfo: { download_url, author, id }, imageIndex }, ref) => {
  const containerProps = ref
    ? {
        ref,
      }
    : {};

  const newWidthAccordingToScreenWidth = isMobileView ? isMobileView - 10 : '400px';

  return (
    <Card
      hoverable
      id={`parentcard-${id}-${imageIndex}`}
      {...containerProps}
      style={{
        width: newWidthAccordingToScreenWidth,
        margin: '30px auto',
        borderRadius: '25px',
      }}
      cover={
        <img
          alt='imagefromapi'
          src={download_url}
          style={{
            width: newWidthAccordingToScreenWidth,
            height: '300px',
          }}
        />
      }>
      <div className='footerofcard'>
        <div className='code-box-title authortitle'>Author</div>
        <p className='cardpelement'>{author}</p>
      </div>
    </Card>
  );
});

export default ImageDisplay;
