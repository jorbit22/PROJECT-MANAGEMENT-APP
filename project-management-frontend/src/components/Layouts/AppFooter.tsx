import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer style={{ textAlign: 'center', backgroundColor: '#f0f2f5' }}>
      2024 Project Management App
    </Footer>
  );
};

export default AppFooter;
