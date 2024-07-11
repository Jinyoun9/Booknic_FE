import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import fetchData from "../fetchData";
import '../css/LibPage.css';

const LibPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { Name, Code, DtlName, DtlCode } = location.state || {};
    const [code, setCode] = useState(null);
    const [name, setName] = useState(null);
    const [dtlcode, setDtlCode] = useState(null);
    const [dtlname, setDtlName] = useState(null);
    const [libData, setLibData] = useState([]);
    const [numFound, setNumFound] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(null);
    useEffect(() => {
        if (DtlCode !== null && DtlCode !== undefined) {
            setDtlCode(DtlCode);
        }
        if (DtlName !== null && DtlName !== undefined) {
            setDtlName(DtlName);
        }
        if (Code !== null && Code !== undefined) {
            setCode(Code);
        }
        if (Name !== null && Name !== undefined) {
            setName(Name);
        }
    }, [DtlCode, DtlName, Code, Name]);

    useEffect(() => {
        if (code !== null || dtlcode !== null) {
            fetchData('api/lib', (data) => {
                if (data.length > 0) {
                    const jsonData = data[0];
                    if (jsonData) {
                        const numFound = jsonData.numFound;
                        const pageSize = jsonData.pageSize;
                        const libs = jsonData.libs.map(item => item.lib);

                        setNumFound(numFound);
                        setPageSize(pageSize);
                        setLibData(libs);
                        setTotalPages(Math.ceil(numFound / pageSize));
                    }
                }
            }, { region: code, dtl_region: dtlcode, pageNo: currentPage });
        }
    }, [code, dtlcode, currentPage]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchData('api/lib', (data) => {
            if (data.length > 0) {
                const { numFound, pageSize } = data[0];
                setNumFound(numFound);
                setPageSize(pageSize);
                setLibData(data.slice(1));
                setTotalPages(Math.ceil(numFound / pageSize));
            }
        }, { region: code, dtl_region: dtlcode, pageNo: page });
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button key={i} onClick={() => handlePageChange(i)} className={i === currentPage ? 'active' : ''}>
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };
    const handleLibClick = (libCode, libName) => {
        navigate(`/libinfo?libName=${encodeURIComponent(libName)}`, { state: { libCode } });
    }
    return (
        <div>
            <Header />
            <SearchBar />
            <div className="title-container">
                <h2>
                    {name} {dtlname}
                </h2>
            </div>
            <div className="container-wrapper">
                <div className="lib-container">
                    {libData.length > 0 ? (
                        libData.map((item, index) => (
                            <div key={index}>
                                <button onClick={() => handleLibClick(item.libCode, item.libName)}>
                                    {item.libName}
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="loader">
                            <p>...loading</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="pagination-container">
                {renderPageNumbers()}
            </div>
            <Footer />
        </div>
    );
};

export default LibPage;
