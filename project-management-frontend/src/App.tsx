import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Layout } from "antd";
import "antd/dist/reset.css";
import "./styles/global.scss";

import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import MainLayout from "./components/Layouts/MainLayout";
import ProtectedRoute from "./context/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import CustomHeader from "./context/CustomHeader";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Layout>
        <CustomHeader />
        <Content className="content">
          <MainLayout>
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated ? <HomePage /> : <Navigate to="/signin" />
                }
              />
              <Route
                path="/project/:projectId"
                element={
                  <ProtectedRoute>
                    <ProjectPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-project"
                element={
                  <ProtectedRoute>
                    <CreateProjectPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </MainLayout>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
