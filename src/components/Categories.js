import React from 'react';
import '../css/Categories.css';
import {useLocation, useNavigate} from 'react-router-dom';

const Categories = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleLibraryFind = () => {
        navigate('/lib');
    }
    return (
        <div className="categories">
            {location.pathname === '/' && (
                <button onClick={()=> handleLibraryFind()}>도서관 찾기</button>
            )}
            {location.pathname === '/lib' && (
                <button>경기</button>   
            )
            }
        </div>
    );
};


export default Categories;
