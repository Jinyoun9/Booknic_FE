import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LibPage from './pages/LibPage';
import AreaPage from './pages/AreaPage';
import LibInfoPage from './pages/LibInfoPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import FavoritePage from './pages/FavoritePage';
import Dashboard from './pages/Dashboard';
import BookInfoPage from './pages/BookInfoPage';
import UserPage from './pages/UserPage';
import StaffPage from './pages/StaffPage';
import LoanPage from './pages/LoanPage';
import { NotificationProvider } from './components/NotificationContext'; // 컨텍스트 임포트

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <NotificationProvider>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/lib" element={<LibPage />} />
                <Route path="/area" element={<AreaPage />} />
                <Route path="/libInfo" element={<LibInfoPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/favorite" element={<FavoritePage />} />
                <Route path="/dash" element={<Dashboard />} />
                <Route path="/book" element={<BookInfoPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/staff" element={<StaffPage />} />
                <Route path="/loan" element={<LoanPage />} />
            </Routes>
        </NotificationProvider>
    </BrowserRouter>
);

reportWebVitals();
