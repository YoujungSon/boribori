import { boardAxiosInstance } from './axiosInstance';
const ttbkey = 'ttbandn36091701005';

export const getBoard = async (boardId: string) => {
  const response = await boardAxiosInstance.get(
    `/ItemLookUp.aspx?ttbkey=${ttbkey}&itemIdType=ISBN13&ItemId=${boardId}&Cover=Big&output=JS&Version=20131101&OptResult=previewImgList`,
  );
  return response.data;
};
