import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import sortCommentAtom from '../../../recoil/sortComment';
import ToggleButton from './ToggleButton';
import BubbleBox from './BubbleBox';

type CommentItemProps = {
  text: string;
  writer: string;
  publishDate: string;
  replyNum: string;
};
const CommentItem = ({ text, writer, publishDate, replyNum }: CommentItemProps) => {
  const curSortState = useRecoilValue(sortCommentAtom);

  const [commentIsOpened, setCommentIsOpened] = useState(false);
  const commentOpenHandler = () => {
    setCommentIsOpened((prev) => !prev);
  };
  return (
    <CommnetItemWrapper>
      {curSortState && (
        <BubbleWrapper>
          <BubbleIcon className="commentPageBubble" text="122" />
        </BubbleWrapper>
      )}

      <CommentTextWrapper>
        <div>
          <UserImage />
        </div>
        <CommentInfo>
          <span>{writer}</span>
          <span>{publishDate}</span>
        </CommentInfo>
        <CommentText>{text}</CommentText>
        <ToggleButton
          className="toggleButton"
          onClick={commentOpenHandler}
          isOpened={commentIsOpened}
          replyNumber={replyNum}
        />
      </CommentTextWrapper>
    </CommnetItemWrapper>
  );
};

export default CommentItem;

const CommnetItemWrapper = styled.li`
  display: flex;
  list-style: none;
  align-items: center;
`;

const CommentTextWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  padding: 20px 0;
  li {
    list-style: none;
  }
`;

const BubbleWrapper = styled.div`
  min-width: 50px;
  margin-right: 15px;
`;
const BubbleIcon = styled(BubbleBox)`
  &::before {
    content: '';
    position: absolute;
    border-top: 8px solid transparent;
    border-left: 12px solid ${(props) => props.theme.colors.secondary2};
    border-right: 0px solid transparent;
    border-bottom: 5px solid transparent;
    top: 8px;
    left: 95%;
  }
`;

const UserImage = styled.img`
  /* data 받아오기 전 img 대용 styling*/
  width: 52px;
  height: 52px;
  background-color: grey;
  border-radius: 50%;
`;
const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  font-size: ${(props) => props.theme.fontSize.body02};
  line-height: ${(props) => props.theme.lineHeight.lh20};
  > span:first-child {
    font-weight: ${(props) => props.theme.fontWeight.bold};
  }
`;

const CommentText = styled.div`
  /* width: 70%; */
  flex: 1;
  word-wrap: break-word;
  margin: 0 40px 0 50px;
  font-size: ${(props) => props.theme.fontSize.body02};
`;
