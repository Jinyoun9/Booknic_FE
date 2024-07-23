import React, {useEffect, useState} from 'react';
import postData from "../api/postData";
import { checkIdAvailability, checkEmailAvailability } from '../api/validation';
const SignUpPage = () => {
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [idValid, setIdValid] = useState('');
    const [emailValid, setEmailValid] = useState('');
    const [idPass, setIdPass] = useState(false);
    const [emailPass, setEmailPass] = useState(false);

    useEffect(() => {
        const validateId = async () => {
            if (id) {
                const idAvailable = await checkIdAvailability(id);
                setIdValid(!idAvailable ? '사용 가능한 아이디입니다.' : '아이디가 이미 사용 중입니다.');
                setIdPass(!idAvailable);
            }
        };

        validateId();
    }, [id]);

    useEffect(() => {
        const validateEmail = async () => {
            if (email) {
                const emailAvailable = await checkEmailAvailability(email);
                setEmailValid(!emailAvailable ? '' : '이메일이 이미 사용 중입니다.');
                setEmailPass(!emailAvailable);
            }
        };

        validateEmail();
    }, [email]);

    const handleSignUp = async (event) => {
        event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.
        postData('register/signup', setLoading, setError, { id, password, username, gender, email });
    };
    const validForm = idPass && emailPass && username && password && gender;
    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
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
                        <option value="">선택하세요</option>
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                    </select>
                </div>
                <button type="submit" disabled={!validForm}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpPage;
