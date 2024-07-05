import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import fetchData from "../fetchData";
import '../css/LibInfoPage.css';
import noImage from '../asset/image/noimage.jpg';
const LibInfoPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const url = new URLSearchParams(location.search);
    const lName = url.get('libName');
    const {libCode} = location.state || {};
    const [lCode, setLCode] = useState(null);
    const [libInfo, setLibInfo] = useState([]);
    const [popularBooks, setPopularBooks] = useState([]);
    useEffect(() => {
        if (libCode !== null && libCode !== undefined) {
            setLCode(libCode); // libCode가 유효하면 lCode 상태를 업데이트합니다.
        }
    }, [libCode]);
    useEffect(() => {
        fetchData('api/lib', (response)=>{
                if(response.length > 0){
                    const jsonData = response[0];
                    if(jsonData){
                        const libs = jsonData.libs.map(item => item.lib);
                        setLibInfo(libs);
                    }
                }
            },
            {libCode});
        fetchData('api/loamitemlib', (response)=>{
                if(response.length > 0){
                    const jsonData = response[0];
                    if(jsonData){
                        const docs = jsonData.docs.map(item => item.doc);
                        setPopularBooks(docs);
                    }
                }
            },
            {libCode});
    }, [libCode]);
    console.log(libInfo);
    console.log(popularBooks);
    return (
        <div>
            <Header />
            <SearchBar />
            <div className="library-info-container">
                <h2>{lName}</h2>
                <div>
                    {libInfo.map((lib, index) =>(
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
                                        <h3>{book.bookname}</h3>
                                        <p>{book.author}</p>
                                        <p>{book.description}</p>
                                        {/* 추가적인 정보나 버튼 등을 추가할 수 있습니다. */}
                                    </div>
                                ))
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LibInfoPage;
