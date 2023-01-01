import React, { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

import Login from '../pages/Login/index';
import showModal from '../recoil/showModal';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const showMoadal = useRecoilValue(showModal);
  return (
    <div>
      {showMoadal && <Login />}
      {children}
    </div>
  );
};

export default Layout;