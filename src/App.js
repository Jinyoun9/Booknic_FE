import React from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Categories from './components/Categories';
import Promotions from './components/Promotions';
import Recommendations from './components/Recommendations';
import Footer from './components/Footer';
import WebSocketClient from "./components/WebSocketClient";

function App() {
  return (
      <div className="App">
        <WebSocketClient/>
        <Header />
        <SearchBar />
        <Categories />
        <Promotions />
        <Recommendations />
        <Footer />
      </div>
  );
}

export default App;
