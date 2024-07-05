import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LibPage from "./pages/LibPage";
import AreaPage from "./pages/AreaPage";
import LibInfoPage from "./pages/LibInfoPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path = "/lib" element = {<LibPage/>}></Route>
            <Route path = "/area" element = {<AreaPage/>}></Route>
            <Route path = "/libInfo" element = {<LibInfoPage/>}></Route>
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
