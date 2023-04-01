import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import bookPageAtom from '../../../../recoil/bookPage';
import InputComment from './InputComment';
import InputPageButton from './InputPageButton';
import { useFirestore } from '../../../../hooks/useFireStore';
import { useAuthContext } from '../../../../context/useAuthContext';
import { useQuery } from '@tanstack/react-query';
import { getBoard } from '../../../../apis/board';

type Props = {
  className: string;
  placeholder: string;
};

const InputCommentWithPage: React.FC<Props> = ({ className, placeholder }) => {
  const [targetPage, setTargetPage] = useState('0');
  const params = useParams();
  const isbn = params.id!;
  const { user }: any = useAuthContext();
  const [commentContent, setCommentContent] = useState('');
  const { data } = useQuery({
    queryKey: ['bookInfo', isbn],
    queryFn: async () => await getBoard(isbn),
    onSuccess: (data) => data,
  });
  const bookTotalPage = data?.item[0].subInfo.itemPage;
  const getRandomString = (length: number): string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const uid = user?.uid;
  const commentId = getRandomString(8);
  const { addOrUpdateDocument } = useFirestore('comments', isbn);

  const onChangeTargetPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const enteredValue = event.target.value.replace(/[^0-9.]/g, '');
    setTargetPage(enteredValue);
  };

  const onClickSubmit = (): void => {
    if (user) {
      addOrUpdateDocument({ uid, commentContent, commentId, targetPage });
      setCommentContent('');
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  return (
    <Wrapper
      className={className}
      placeholder={placeholder}
      onClick={onClickSubmit}
      commentContent={commentContent}
      changeCommentContent={setCommentContent}
    >
      <PageWrapper>
        <span>책 페이지</span>
        <InputPageButton
          value={targetPage}
          className="pageInput"
          onChange={onChangeTargetPage}
          maxPage={bookTotalPage}
        />
      </PageWrapper>
    </Wrapper>
  );
};

export default InputCommentWithPage;

const Wrapper = styled(InputComment)``;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid ${(props) => props.theme.colors.grey4};
  > span {
    font-size: ${(props) => props.theme.fontSize.body02};
    font-weight: ${(props) => props.theme.fontWeight.bold};
  }
`;
