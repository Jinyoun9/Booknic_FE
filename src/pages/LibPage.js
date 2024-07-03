import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import Promotions from "../components/Promotions";
import Recommendations from "../components/Recommendations";
import Footer from "../components/Footer";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import fetchData from "../fetchData";

function LibPage() {
    const location = useLocation();
    const {Name, Code, DtlName, DtlCode} = location.state || {};
    const [code, setCode] = useState(null);
    const [name, setName] = useState(null);
    const [dtlcode, setDtlCode] = useState(null);
    const [dtlname, setDtlName] = useState(null);
    const [libData, setLibData] = useState([]);

    useEffect(() => {
        console.log("location.state:", location.state); // 상태가 제대로 전달되는지 확인
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
            fetchData('api/lib', setLibData, { region: code, dtl_region: dtlcode });
        }
    }, [code, dtlcode]);
    console.log(libData);
    return (
        <div>
            <Header />
            <SearchBar />
            <h2>
                {name} {dtlname}
            </h2>
            <Categories />
            <Footer />
        </div>
    )
}

export default LibPage;