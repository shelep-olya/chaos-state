import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import styles from './App.module.css';
import { UserProvider } from "./context/UserProvider";
import CreateTestPage from "./pages/CreateTestPage";
import HomePage from './pages/HomePage';
import MoreTestsPage from './pages/MoreTestsPage';
import MyAccountPage from "./pages/MyAccountPage";
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import ResultPage from './pages/ResultPage';
import TestPage from './pages/TestPage';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  return (
    <UserProvider>
      <div className={styles.appContainer}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/tests/:testId" element={<TestPage />} />
            <Route path="/results/:testId" element={<ResultPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/create-test" element={<CreateTestPage />} />
              <Route path="/more-tests" element={<MoreTestsPage />} />
              <Route path="/me" element={<MyAccountPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
};

export default App;
