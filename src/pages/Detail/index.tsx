import React from 'react';
import styled from 'styled-components';

import BookInfo from './components/BookInfo';
import SortingComment from './components/SortingComment';
import Comment from './components/Comment';
import ToggleInputComment from './components/ToggleInputComment';
import Header from '../../components/Header';

const Detail = () => {
  return (
    <MainWrapper>
      <Header />
      <ContentContainer>
        <BookInfo />
        <SortingComment />
        <Comment />
        <ToggleInputComment />
      </ContentContainer>
    </MainWrapper>
  );
};

export default Detail;

const MainWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow-x: hidden;
  &::before {
    content: '';
    position: absolute;
    height: 445px;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(http://image.yes24.com/goods/113737324/XL);
    background-position: center;
    background-size: 100% 300%;
    -webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -o-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);
    z-index: -1;
    content: '';
    height: 435px;
  }
  &::after {
    content: '';
    position: absolute;
    top: 420px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.colors.white};
    z-index: -1;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  width: 1024px;
  margin: 0 auto;
  padding: 24px;
`;
