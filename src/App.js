    import React, { useState, useEffect } from 'react';
    import './App.css';
    import Header from './components/Header';
    import SearchBar from './components/SearchBar';
    import Recommendations from './components/Recommendations';
    import Footer from './components/Footer';
    import { NotificationProvider } from './components/NotificationContext';
    import {useWebSocket} from './hooks/useWebSocket';
    import {jwtDecode} from 'jwt-decode';

    function App() {
      const [userInfo, setUserInfo] = useState({ id: null, role: null, library: null });

      useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          try {
            const decodedToken = jwtDecode(accessToken);
            setUserInfo({
              id: decodedToken.id,
              role: decodedToken.role,
              library: decodedToken.library,
            });
          } catch (error) {
            console.error('Failed to decode token:', error);
          }
        }
      }, []);
      return (
          <div className="App">
            <NotificationProvider>
                <Header initialUserInfo={userInfo} />
                <SearchBar />
                <Recommendations />
                <Footer userInfo={userInfo} />
                <useWebSocket/>
            </NotificationProvider>
          </div>
      );
    }

    export default App;
