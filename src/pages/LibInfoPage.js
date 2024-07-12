import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from 'react-modal'; // react-modal import 추가
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import fetchData from "../fetchData";
import '../css/LibInfoPage.css';
import noImage from '../asset/image/noimage.jpg';

Modal.setAppElement('#root'); // 애플리케이션 루트 요소 설정

const LibInfoPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const url = new URLSearchParams(location.search);
    const lName = url.get('libName');
    const { libCode } = location.state || {};
    const [lCode, setLCode] = useState(null);
    const [libInfo, setLibInfo] = useState([]);
    const [popularBooks, setPopularBooks] = useState([]);
    const [bookModalIsOpen, setBookModalIsOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null); // 선택된 책 정보 상태 추가

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
                                <img src={selectedBook.bookImageURL || noImage} alt={selectedBook.bookname} />
                                <h2>{selectedBook.bookname}</h2>
                                <p>저자: {selectedBook.author}</p>
                                <p>{selectedBook.description}</p>
                            </div>
                        )}
                    </Modal>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LibInfoPage;
