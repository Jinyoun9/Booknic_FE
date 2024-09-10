import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import fetchData from "../api/fetchData.js";
import postData from "../api/postData.js";
import putData from "../api/putData.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import "../css/LoanPage.css"; // 스타일링을 위한 CSS 파일

const LoanPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = location.state?.userInfo;
    const [loans, setLoans] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (userInfo) {
            fetchData('/admin/getloan', (response) => {
                if (Array.isArray(response)) {
                    setLoans(response);
                    console.log(response);
                }
            }, { library: userInfo.library });
        }
    }, [userInfo]);

    // 기한을 지났는지 여부를 판단하는 함수
    const isOverdue = (dueDate) => {
        const currentDate = new Date();
        const due = new Date(dueDate);
        return due < currentDate;
    };
    const handleExtendClick = (loan) => {
        const params = {name: loan.name, library: loan.library, isbn13: loan.isbn  };
        console.log(params);
        putData('/admin/extenddue', params);
    }
    return (
        <div className="loan-page" >
            <Header userInfo={userInfo} />
            <div className="loan-container">
                <h2>대출 정보</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="책 제목 또는 대출자 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <table className="loan-table">
                    <thead>
                        <tr>
                            <th>도서 제목</th>
                            <th>대출자</th>
                            <th>반납 기한</th>
                            <th>상태</th>
                            <th>기간 연장</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans
                            .filter((loan) =>
                                loan.bookname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                loan.name.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((loan, index) => (
                                <tr key={index}>
                                    <td>{loan.bookname}</td>
                                    <td>{loan.name}</td>
                                    <td>{loan.duedate}</td>
                                    <td>
                                        {isOverdue(loan.duedate) ? (
                                            <span style={{ color: 'red' }}>연체 ✔</span>
                                        ) : (
                                            <span style={{ color: 'green' }}>정상 ✔</span>
                                        )}
                                    </td>
                                    <td>
                                        {!isOverdue(loan.duedate) ? (
                                            <button onClick = {() => handleExtendClick(loan)}>연장하기</button>
                                        ):(
                                            <span>연장 불가</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default LoanPage;
