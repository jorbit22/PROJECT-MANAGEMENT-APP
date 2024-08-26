import React, { ReactNode } from "react";
import { Layout } from "antd";
import AppFooter from "./AppFooter";

const { Content } = Layout;

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px", background: "#fff" }}>
        {children}
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default MainLayout;
