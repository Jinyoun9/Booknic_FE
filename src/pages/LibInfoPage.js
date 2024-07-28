import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import fetchData from "../api/fetchData";
import '../css/LibInfoPage.css';
import noImage from '../asset/image/noimage.jpg';
import postData from "../api/postData";
import {FaStar} from "react-icons/fa";
import QRCode from 'react-qr-code';

const LibInfoPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const url = new URLSearchParams(location.search);
    const lName = url.get('libName');
    const { libCode } = location.state || {};
    const [lCode, setLCode] = useState(null);
    const [libInfo, setLibInfo] = useState([]);
    const [popularBooks, setPopularBooks] = useState([]);
    const [bookModalIsOpen, setBookModalIsOpen] = useState(false);
    const [loanModalIsOpen, setLoanModalIsOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null); // 선택된 책 정보 상태 추가
    const [authToken, setAuthToken] = useState(localStorage.getItem('accessToken') || '');
    const [toggleValue, setToggleValue] = useState(false);
    const [qrValue, setQrValue] = useState('');

    useEffect(() => {
        if (libCode !== null && libCode !== undefined) {
            setLCode(libCode); // libCode가 유효하면 lCode 상태를 업데이트합니다.
        }
    }, [libCode]);

    useEffect(() => {
        fetchData('api/lib', (response) => {
            if (response.length > 0) {
                const jsonData = response[0];
                if (jsonData) {
                    const libs = jsonData.libs.map(item => item.lib);
                    setLibInfo(libs);
                }
            }
        }, { libCode });

        fetchData('api/loanitemlib', (response) => {
            if (response.length > 0) {
                const jsonData = response[0];
                if (jsonData) {
                    const docs = jsonData.docs.map(item => item.doc);
                    setPopularBooks(docs);
                }
            }
        }, { libCode });
    }, [libCode]);

    const bookModalOpen = (book) => {
        setSelectedBook(book); // 선택된 책 정보 설정
        setBookModalIsOpen(true);
    }

    const bookModalClose = () => {
        setBookModalIsOpen(false);
        setSelectedBook(null); // 선택된 책 정보 초기화
    }

    const loanModalClose = () => {
        setLoanModalIsOpen(false);
        setQrValue(null); // 선택된 책 정보 초기화
    }

    const handleFavoriteClick = (bookname, library) => {
        setToggleValue(toggleValue ? 0 : 1);
        const params = {bookname, library, toggleValue};
        if(authToken){
            postData('fav/register', setLoading, setError, params);
        }
        else{
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
        }
    }
    const handleLoanClick = (bookname, library) => {
        const accessToken = localStorage.getItem('accessToken');
        const qrURL = `https://192.168.10.104:8443/book/loan?bookname=${encodeURIComponent(bookname)}&library=${encodeURIComponent(library)}&token=${encodeURIComponent(accessToken)}}`
        setQrValue(qrURL);
        setLoanModalIsOpen(true);
        setBookModalIsOpen(false);
    }
    return (
        <div>
            <Header />
            <SearchBar />
            <div className="library-info-container">
                <h2>{lName}</h2>
                <div>
                    {libInfo.map((lib, index) => (
                        <div key={index} className="lib-info-card">
                            <h3 className="lib-info-title">주소: <span className="lib-info-content">{lib.address}</span></h3>
                            <h3 className="lib-info-title">휴관일: <span className="lib-info-content">{lib.closed}</span></h3>
                            {lib.homepage && (
                                <button
                                    className="homepage-button"
                                    onClick={() => window.open(lib.homepage, "_blank")}
                                >
                                    홈페이지 방문
                                </button>
                            )}
                            <h3 className="lib-info-title">전화번호: <span className="lib-info-content">{lib.tel}</span></h3>
                        </div>
                    ))}
                    <div className="popular-books-section">
                        <h2>인기 도서</h2>
                        <div className="popular-books-list">
                            {popularBooks.length > 0 ? (
                                popularBooks.map((book, index) => (
                                    <div key={index} className="popular-book-item">
                                        <img src={book.bookImageURL || noImage} />
                                        <button onClick={() => bookModalOpen(book)}>{book.bookname}</button>
                                        <p>{book.author}</p>
                                        <p>{book.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                    <Modal
                        isOpen={bookModalIsOpen}
                        onRequestClose={bookModalClose}
                        contentLabel="Book Modal"
                        className="book-modal"
                        overlayClassName="book-modal-overlay"
                    >
                        {selectedBook && (
                            <div className="book-modal-content">
                                <span className="close-button" onClick={bookModalClose}>&times;</span>
                                <button onClick={() => handleFavoriteClick(selectedBook.bookname, lName)}>
                                    <FaStar size={30} color={toggleValue ? "yellow" : "gray"} />
                                </button>
                                <button onClick={() => handleLoanClick(selectedBook.bookname, lName)}>
                                    대출하기
                                </button>
                                <img src={selectedBook.bookImageURL || noImage} alt={selectedBook.bookname} />
                                <h2>{selectedBook.bookname}</h2>
                                <p>저자: {selectedBook.author}</p>
                                <p>{selectedBook.description}</p>
                            </div>
                        )}
                    </Modal>
                    <Modal
                        isOpen = {loanModalIsOpen}
                        isClose = {loanModalClose}
                        className = "book-modal"
                    >
                        <div style={{ marginTop: '20px' }}>
                            <span className="close-button" onClick={loanModalClose}>&times;</span>
                            {qrValue && <QRCode value={qrValue} />}
                        </div>
                    </Modal>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LibInfoPage;
