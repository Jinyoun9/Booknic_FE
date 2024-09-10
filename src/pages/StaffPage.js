import React, {useEffect, useState} from 'react';
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import fetchData from "../api/fetchData.js";
import postData from "../api/postData.js";
import "../css/StaffPage.css";
import {useNavigate, useLocation} from "react-router-dom";

const StaffPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loanData, setLoanData] = useState([]);
    const totalBooks = 1500;
    const borrowedBooks = 300;
    const overdueBooks = 25;
    const newBooks = 10;
    const totalMembers = 500;
    const userInfo = location.state?.userInfo;
    const handleLoanClick = () => {
        navigate('/loan', {state: {userInfo}});
    }
    useEffect(() => {
        const response = fetchData('/admin/getloan', (response) => {
        if (Array.isArray(response)) {
                            setLoanData(response);
                            console.log(response);
                        }
        }, { library : userInfo.library });
    }, [userInfo]);

    return (
        <div className="staff-page">
            <Header userInfo = {userInfo}/>
            <div className="dashboard">
                <h2>도서관 현황 대시보드</h2>
                <div className="dashboard-cards">
                    <div className="card">
                        <h3>총 도서 수</h3>
                        <p>{totalBooks} 권</p>
                    </div>
                    <div className="card">
                        <h3>대출 중인 도서</h3>
                        <p>{borrowedBooks} 권</p>
                    </div>
                    <div className="card">
                        <h3>연체된 도서</h3>
                        <p>{overdueBooks} 권</p>
                    </div>
                    <div className="card">
                        <h3>신규 등록 도서</h3>
                        <p>{newBooks} 권</p>
                    </div>
                    <div className="card">
                        <h3>총 회원 수</h3>
                        <p>{totalMembers} 명</p>
                    </div>
                </div>
                <div className="actions">
                    <button onClick = {handleLoanClick}>대출 관리</button>
                    <button>회원 관리</button>
                    <button>도서 관리</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default StaffPage;
