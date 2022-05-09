import React from 'react';
import { Layout, Input } from 'antd';
import { debounce, isMobileView } from '../../utils/UtilsForImages';
import { useGlobalContext } from '../../context/images/imagesContext';
const { Header } = Layout;

const NavBar = () => {
  const { searchAuthors } = useGlobalContext();

  const searchWithDebounce = debounce(searchAuthors, 400);

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingRight: isMobileView ? '10px' : '50px',
          paddingLeft: isMobileView ? '10px' : '50px',
        }}>
        <div
          style={{
            color: 'rgb(234, 240, 241)',
            marginRight: '10vw',
            fontSize: isMobileView ? '6vw' : '30px',
          }}>
          ImageOps
        </div>
        <Input
          placeholder='search authors'
          onChange={(e) => {
            searchWithDebounce(e.target.value);
          }}
          style={{ width: 400 }}
        />
      </Header>
    </Layout>
  );
};

export default NavBar;
