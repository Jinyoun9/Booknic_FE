import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import postData from "../api/postData";
import { checkIdAvailability, checkEmailAvailability } from '../api/validation';

import "../css/SignUpPage.css";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [role, setRole] = useState('user'); // 'user' or 'staff'
    const [position, setPosition] = useState(''); // 직위
    const [code, setCode] = useState(''); // 부서
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [idValid, setIdValid] = useState('');
    const [emailValid, setEmailValid] = useState('');
    const [idPass, setIdPass] = useState(false);
    const [emailPass, setEmailPass] = useState(false);

    useEffect(() => {
        const validateId = async () => {
            if (id) {
                const idAvailable = await checkIdAvailability(id, role);
                if(idAvailable === 'CONSIST_INVALID'){
                    setIdValid('아이디: 5~20자의 영문 소문자, 숫자만 사용 가능합니다.');
                }
                else{
                    setIdValid(!idAvailable ? '사용 가능한 아이디입니다.' : '아이디가 이미 사용 중입니다.');
                }
                setIdPass(!idAvailable);
            }
        };

        validateId();
    }, [id]);

    useEffect(() => {
        const validateEmail = async () => {
            if (email) {
                const emailAvailable = await checkEmailAvailability(email, role);
                setEmailValid(!emailAvailable ? '' : '이메일이 이미 사용 중입니다.');
                setEmailPass(!emailAvailable);
            }
        };

        validateEmail();
    }, [email]);

    const handleSignUp = async (event) => {
        event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.
        const params = { id, password, username, gender, email, role };


        const responseStatus = await postData('register/signup', setLoading, setError, params);
        if(responseStatus === 200){
            navigate('/');
        }
        else{
            alert('잘못된 요청입니다.');
        }
    };
    const toggleUser = () => {
        setRole("user");
        setId('');
        setPassword('');
        setUsername('');
        setEmail('');
        setGender('');
        setIdPass(false);
        setEmailPass(false);
        setIdValid(false);
        setEmailValid(false);
    }
    const toggleStaff = () => {
        setRole("staff");
        setId('');
        setPassword('');
        setUsername('');
        setEmail('');
        setGender('');
        setIdPass(false);
        setEmailPass(false);
        setIdValid(false);
        setEmailValid(false);
    }
    const validForm = idPass && emailPass && username && password && gender &&
        (role === 'user' || role === 'staff'); // 직원 양식 추가 필드

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <div className="signup-type-buttons">
                <button
                    className={`signup-user-button ${role === 'user' ? 'active' : ''}`}
                    onClick={toggleUser}
                >
                    개인회원
                </button>
                <button
                    className={`signup-staff-button ${role === 'staff' ? 'active' : ''}`}
                    onClick={toggleStaff}
                >
                    도서관직원
                </button>
            </div>
            <form onSubmit={handleSignUp}>
                <div>
                    <input
                        placeholder="아이디"
                        type="text"
                        id="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                    {idValid && <p className="error">{idValid}</p>}
                </div>
                <div>
                    <input
                        placeholder="비밀번호"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        placeholder="이름"
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        placeholder="이메일"
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {emailValid && <p className="error">{emailValid}</p>}
                </div>
                <div>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="">성별</option>
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={!validForm}
                    className={`signup-submit-button ${role === 'user' ? 'user-submit' : 'staff-submit'}`}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUpPage;
