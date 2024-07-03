import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import Promotions from "../components/Promotions";
import Recommendations from "../components/Recommendations";
import Footer from "../components/Footer";
import React from "react";

function LibPage() {
    return (
        <div>
            <Header />
            <SearchBar />
            <Categories />
            <Footer />
        </div>
    )
}

export default LibPage;