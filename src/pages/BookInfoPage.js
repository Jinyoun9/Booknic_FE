import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import Modal from 'react-modal';
import QRCode from 'react-qr-code';

import fetchData from "../api/fetchData";
import postData from "../api/postData";
import deleteData from "../api/deleteData";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

import noImage from '../asset/image/noimage.jpg';
import "../css/BookInfoPage.css";

const BookInfoPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { book, library } = location.state || {};
    const [favoriteValue, setFavoriteValue] = useState(false);
    const [authToken, setAuthToken] = useState(localStorage.getItem('accessToken') || '');
    const [recommendBooks, setRecommendBooks] = useState([]);
    const isbn13 = book?.isbn13 || '';
    const [currentSlide, setCurrentSlide] = useState(0);
    const [qrValue, setQrValue] = useState('');
    const [loanModalIsOpen, setLoanModalIsOpen] = useState(false);
    useEffect(() => {
        if (isbn13) {
            fetchData('api/recommend', (response) => {
                if (response.length > 0) {
                    const jsonData = response[0];
                    if (jsonData) {
                        const books = jsonData.docs.map(item => item.book);
                        setRecommendBooks(books);
                    }
                }
            },{isbn13});
            fetchData('fav/check', (response) => {
                          if(response){
                            setFavoriteValue(true);
                          }
                          else{
                            setFavoriteValue(false);
                          }
            },{isbn13, library});
        }
    }, [isbn13, library]);

    const handleFavoriteClick = (bookname, library) => {
        const params = {bookname, library, isbn13};
        if (authToken) {
            if(favoriteValue){
                deleteData('fav/delete', params);
            }
            else{
                postData('fav/register', () => {}, () => {}, params);
            }

        } else {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
        }
        setFavoriteValue(favoriteValue ? 0 : 1);
    };
    const loanModalClose = () => {
                setLoanModalIsOpen(false);
                setQrValue(null); // 선택된 책 정보 초기화
    }
    const handleLoanClick = (bookname, library) => {
            setLoanModalIsOpen(true);
            if(authToken){
                const qrURL = `https://192.168.10.104:8443/book/loan?bookname=${encodeURIComponent(bookname)}&library=${encodeURIComponent(library)}&token=${encodeURIComponent(authToken)}}`
                setQrValue(qrURL);
            }
            else{
                alert('로그인이 필요한 서비스입니다.');
                navigate('/login');
            }
    }
    const handleBookClick = (book) => {
        navigate('/book', { state: { book, library} });
    }
    const nextSlide = () => {
        if (currentSlide < recommendBooks.length - 5) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };
    if (!book) {
        return <div>책 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <div>
            <Header />
            <SearchBar/>
            <div className="book-info-container">
                <button className="back-button" onClick={() => navigate(-1)}>뒤로가기</button>
                <img src={book.bookImageURL || noImage} alt={book.bookname} className="book-image" />
                <div className="book-details">
                    <h2>{book.bookname}</h2>
                    <p>저자: {book.authors}</p>
                    <p>{book.description}</p>
                    <button onClick={() => handleFavoriteClick(book.bookname, library)}>
                        <FaStar size={30} color={favoriteValue ? "yellow" : "gray"} />
                    </button>
                    <button onClick={() => handleLoanClick(book.bookname, library)}>
                        대출하기
                    </button>
                </div>
            </div>
            {recommendBooks.length > 0 && (
                <div className="recommend-books-section">
                    <h2>이 책에 흥미를 느끼셨다면, 이 책들도 마음에 드실 거예요!</h2>
                    <div className="recommend-books-list-container">
                        <button className="slide-button" onClick={prevSlide} disabled={currentSlide === 0}>{"<"}</button>
                        <div className="recommend-books-list">
                            {recommendBooks.slice(currentSlide, currentSlide + 5).map((recBook, index) => (
                                <div key={index} className="recommend-book-item">
                                    <img src={recBook.bookImageURL || noImage} onClick = {() => handleBookClick(recBook)} className="recommend-book-image" />
                                    <div className="recommend-book-details">
                                        <button onClick={() => handleBookClick(recBook)}>{recBook.bookname}</button>
                                        <p>저자: {recBook.authors}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="slide-button" onClick={nextSlide} disabled={currentSlide >= recommendBooks.length - 5}>{">"}</button>
                    </div>
                </div>
            )}
            <Modal
                 isOpen = {loanModalIsOpen}
                 isClose = {loanModalClose}
                 className = "book-modal">
                    <div style={{ marginTop: '20px' }}>
                        <span className="close-button" onClick={loanModalClose}>&times;</span>
                        {qrValue && <QRCode value={qrValue} />}
                        <h2>대출을 원하시면 스캔해주세요!</h2>
                    </div>
            </Modal>
            <Footer />
        </div>
    );
};

export default BookInfoPage;
